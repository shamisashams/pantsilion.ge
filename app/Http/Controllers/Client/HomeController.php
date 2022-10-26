<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Page;
use App\Models\Product;
use App\Models\ProductSet;
use App\Models\Slider;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use App\Repositories\Eloquent\ProductRepository;


class HomeController extends Controller
{
    public function index()
    {

        //dd(ProductSet::with(['translation','latestImage','products','products.stocks','video'])->where('status',1)->inRandomOrder()->first()->video_converted,);

        $page = Page::where('key', 'home')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections){
            if($sections->file){
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }

        }

        $sliders = Slider::query()->where("status", 1)->with(['file', 'translations']);
//        dd($page->file);
//        dd(App::getLocale());
        $_products = app(ProductRepository::class)->getHomePageProducts();

        $special_products = Product::with(['latestImage','translation','variants.translation'])->where('special_price_tag',1)->where('parent_id',null)->limit(25)->inRandomOrder()->get();

        foreach ($special_products as $s_product){
            $v_c = 0;
            foreach ($s_product->variants as $variant){

                $s_product['last_variant'] = $variant;
                $s_product['variant_count'] = ++$v_c;
            }
        }

        $products = [];
        $products['new'] = [];
        $products['bunker'] = [];
        $products['day_product'] = [];
        $products['day_price'] = [];
        $products['special_price_tag'] = [];
        $products['popular'] = [];
        foreach ($_products as $product){
            /*$product_attributes = $product->attribute_values;

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
            $product['attributes'] = $_result;*/

            $v_c = 0;
            foreach ($product->variants as $variant){

                $product['last_variant'] = $variant;
                $product['variant_count'] = ++$v_c;
            }

            if($product->new) $products['new'][] = $product;
            if($product->bunker) $products['bunker'][] = $product;
            if($product->day_product) $products['day_product'][] = $product;
            if($product->day_price) $products['day_price'][] = $product;
            if($product->special_price_tag) $products['special_price_tag'][] = $product;
            if($product->popular) $products['popular'][] = $product;
        }

        $products['special_price_tag'] = $special_products;
        //dd($products);

        return Inertia::render('Home', ["sliders" => $sliders->get(), "page" => $page, "seo" => [
            "title"=>$page->meta_title,
            "description"=>$page->meta_description,
            "keywords"=>$page->meta_keyword,
            "og_title"=>$page->meta_og_title,
            "og_description"=>$page->meta_og_description,

//            "image" => "imgg",
//            "locale" => App::getLocale()
        ],
            'products' => $products,
            'images' => $images,
            'collections' => ProductSet::with(['translation','latestImage'])->where('status',1)->limit(6)->inRandomOrder()->get(),
            'collection' => ProductSet::with(['translation','latestImage','products','products.stocks','video'])->where('status',1)->inRandomOrder()->first(),
            'blogs' => Blog::with(['translation','latestImage'])->limit(4)->inRandomOrder()->get()
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
