<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Page;
use App\Models\Product;
use App\Models\ProductSet;
use App\Repositories\Eloquent\AttributeRepository;
use App\Repositories\Eloquent\ProductRepository;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    private $attributeRepository;
    private $productRepository;

    public function __construct(AttributeRepository $attributeRepository,ProductRepository $productRepository){
        $this->attributeRepository = $attributeRepository;
        $this->productRepository = $productRepository;
    }


    /**
     * @param string $locale
     * @param string $slug
     * @return Application|Factory|View
     */
    public function show(string $locale, string $slug)
    {

        $page = Page::where('key', 'products')->firstOrFail();
//        return 1;
        $category = Category::where(['status' => 1, 'slug' => $slug])->firstOrFail();
        //dd($category->getAncestors());
        /*$products = Product::where(['status' => 1, 'product_categories.category_id' => $category->id])
            ->leftJoin('product_categories', 'product_categories.product_id', '=', 'products.id')->with(['latestImage'])
            ->orderby('updated_at','desc')
            ->paginate(16);*/
        $subCategories =$category->descendants->toTree();

        if(\request()->has('subcategory')){
            $subcats = explode(',',request('subcategory'));
            $query = ProductSet::with(['translation','latestImage'])->join('collection_categories','collection_categories.product_set_id','=','product_sets.id')
                ->whereIn('collection_categories.category_id',$subcats);

            if($priceFilter = request('price')){
                $priceRange = explode(',', $priceFilter);

                //dd($priceRange);
                $query->where(function ($pQ) use ($priceRange){
                    $pQ->where('product_sets.price', '>=', $priceRange[0])
                        ->where('product_sets.price', '<=', end($priceRange));
                });

            }
            $query->where('product_sets.status',1);

            $collections = $query->paginate('12')->withQueryString();
        } else {
            $query = $category->collections()->with(['translation','latestImage']);
            if($priceFilter = request('price')){
                $priceRange = explode(',', $priceFilter);


                //dd($priceRange);
                $query->where(function ($pQ) use ($priceRange){
                    $pQ->where('product_sets.price', '>=', $priceRange[0])
                        ->where('product_sets.price', '<=', end($priceRange));
                });

            }
            $query->where('product_sets.status',1);
            $collections = $query->paginate('12')->withQueryString();
        }




        //dd($subCategories);
        $products = $this->productRepository->getAll($category->id);

        //dd($products);

        foreach ($products as $product){
            //$product_attributes = $product->attribute_values;



            $_result = [];

            //foreach ($product_attributes as $item){
                //dd($item->option);
                /*$options = $item->attribute->options;
                $value = '';
                foreach ($options as $option){
                    if($item->attribute->type == 'select'){
                        if($item->integer_value == $option->id) {
                            $_result[$item->attribute->code] = $option->label;
                        }

                    }
                }*/

            //}
            $sale = false;
            $prices = [];
            $product['attributes'] = $_result;
            $v_c = 0;
            foreach ($product->variants as $variant){
                $prices[] = $variant->special_price ? $variant->special_price : $variant->price;
                if($variant->special_price){
                    $sale = true;
                }
                $product['last_variant'] = $variant;
                $product['variant_count'] = ++$v_c;
            }
            $product['min_price'] = !empty($prices) ? min($prices) : 0;
            $product['sale'] = $sale;


        }


        $images = [];
        foreach ($page->sections as $sections){
            if($sections->file){
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }

        }




        //dd($products);

        //dd($products);
        return Inertia::render('Products',[
            'products' => $products,
            'category' => $category,
            'subcategories' => $subCategories,
            'collections' => $collections,
            'images' => $images,
            'filter' => $this->getAttributes($category),
            "seo" => [
                "title"=>$page->meta_title,
                "description"=>$page->meta_description,
                "keywords"=>$page->meta_keyword,
                "og_title"=>$page->meta_og_title,
                "og_description"=>$page->meta_og_description,
//            "image" => "imgg",
//            "locale" => App::getLocale()
            ]
        ])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }

    private function getAttributes($category = null):array{
        //$attrs = $this->attributeRepository->model->with('options.translation')->orderBy('position')->get();
        $result['attributes'] = [];
        $key = 0;
        /*foreach ($attrs as $item){
            $result['attributes'][$key]['id'] = $item->id;
            $result['attributes'][$key]['name'] = $item->name;
            $result['attributes'][$key]['code'] = $item->code;
            $result['attributes'][$key]['type'] = $item->type;
            $_options = [];
            $_key = 0;
            foreach ($item->options as $option){
                $_options[$_key]['id'] = $option->id;
                $_options[$_key]['label'] = $option->label;
                $_key++;
            }
            $result['attributes'][$key]['options'] = $_options;
            $key++;
        }*/
        if($category !== null){
            $collectionMaxPrice = ProductSet::query()->leftJoin('collection_categories','collection_categories.product_set_id','=','product_sets.id')
                ->where('collection_categories.category_id',$category->id)->max('price');
        } else {
            $collectionMaxPrice = ProductSet::query()
                ->max('price');
        }

        //dd($collectionMaxPrice);
        $result['price']['max'] = $collectionMaxPrice > $this->productRepository->getMaxprice($category) ? $collectionMaxPrice : $this->productRepository->getMaxprice($category);
        $result['price']['min'] = $this->productRepository->getMinprice($category);
        //dd($result);
        return $result;
    }


    public function popular(){
        $page = Page::where('key', 'products')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections){
            if($sections->file){
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }

        }

        $products = $this->productRepository->getAll(null,1);

        foreach ($products as $product){
            $product_attributes = $product->attribute_values;

            $_result = [];

            foreach ($product_attributes as $item){
                $options = $item->attribute->options;
                $value = '';
                foreach ($options as $option){
                    if($item->attribute->type == 'select'){
                        if($item->integer_value == $option->id) {
                            $_result[$item->attribute->code] = $option->label;
                        }

                    }
                }

            }
            $product['attributes'] = $_result;

        }

        return Inertia::render('Products',[
            'products' => $products,
            'category' => null,
            'images' => $images,
            'filter' => $this->getAttributes(),
            "seo" => [
                "title"=>$page->meta_title,
                "description"=>$page->meta_description,
                "keywords"=>$page->meta_keyword,
                "og_title"=>$page->meta_og_title,
                "og_description"=>$page->meta_og_description,
//            "image" => "imgg",
//            "locale" => App::getLocale()
            ]
        ])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }

    public function special(){
        $page = Page::where('key', 'products')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections){
            if($sections->file){
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }

        }

        $products = $this->productRepository->getAll(null,null,1);

        foreach ($products as $product){
            //$product_attributes = $product->attribute_values;

            $_result = [];

            /*foreach ($product_attributes as $item){
                $options = $item->attribute->options;
                $value = '';
                foreach ($options as $option){
                    if($item->attribute->type == 'select'){
                        if($item->integer_value == $option->id) {
                            $_result[$item->attribute->code] = $option->label;
                        }

                    }
                }

            }*/
            $product['attributes'] = $_result;

            $sale = false;

            $v_c = 0;
            foreach ($product->variants as $variant){

                if($variant->special_price){
                    $sale = true;
                }
                $product['last_variant'] = $variant;
                $product['variant_count'] = ++$v_c;
            }

            $product['sale'] = $sale;

        }

        $subCategories = [];
        foreach (Category::where('parent_id','!=',null)->get()->toArray() as $item){
            $subCategories[] = $item;
        }

        return Inertia::render('Products',[
            'products' => $products,
            'category' => null,
            'images' => $images,
            'filter' => $this->getAttributes(),
            'subcategories' => $subCategories,
            'collections' => ['data' => [],'links' => []],
            "seo" => [
                "title"=>$page->meta_title,
                "description"=>$page->meta_description,
                "keywords"=>$page->meta_keyword,
                "og_title"=>$page->meta_og_title,
                "og_description"=>$page->meta_og_description,
//            "image" => "imgg",
//            "locale" => App::getLocale()
            ]
        ])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }

    public function new(){
        $page = Page::where('key', 'products')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections){
            if($sections->file){
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }

        }

        $products = $this->productRepository->getAll(null,null,null,1);

        $subCategories = [];
        foreach ($products as $product){
            //$product_attributes = $product->attribute_values;

            $_result = [];

            /*foreach ($product_attributes as $item){
                $options = $item->attribute->options;
                $value = '';
                foreach ($options as $option){
                    if($item->attribute->type == 'select'){
                        if($item->integer_value == $option->id) {
                            $_result[$item->attribute->code] = $option->label;
                        }

                    }
                }

            }*/
            $product['attributes'] = $_result;

            $sale = false;

            $v_c = 0;
            foreach ($product->variants as $variant){

                if($variant->special_price){
                    $sale = true;
                }
                $product['last_variant'] = $variant;
                $product['variant_count'] = ++$v_c;
            }

            $product['sale'] = $sale;



        }

        foreach (Category::where('parent_id','!=',null)->get()->toArray() as $item){
            $subCategories[] = $item;
        }


        return Inertia::render('Products',[
            'products' => $products,
            'category' => null,
            'images' => $images,
            'filter' => $this->getAttributes(),
            'subcategories' => $subCategories,
            'collections' => ['data' => [], 'links' => []],
            "seo" => [
                "title"=>$page->meta_title,
                "description"=>$page->meta_description,
                "keywords"=>$page->meta_keyword,
                "og_title"=>$page->meta_og_title,
                "og_description"=>$page->meta_og_description,
//            "image" => "imgg",
//            "locale" => App::getLocale()
            ]
        ])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }
}
