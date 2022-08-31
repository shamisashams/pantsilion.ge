<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Certificate;
use App\Models\Page;
use App\Models\ProductSet;
use App\Repositories\Eloquent\CollectionRepository;
use Inertia\Inertia;
use App\Repositories\Eloquent\GalleryRepository;

class CollectionController extends Controller
{
    protected $collectionRepository;

    public function __construct(CollectionRepository $collectionRepository){
        $this->collectionRepository = $collectionRepository;
    }

    public function index()
    {
        $page = Page::where('key', 'about')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections){
            if($sections->file){
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }

        }

        $files = [];
        if($page->images) $files = $page->files;

        //dd($files);

        return Inertia::render('Blogs', [
            "page" => $page,
            "seo" => [
                "title"=>$page->meta_title,
                "description"=>$page->meta_description,
                "keywords"=>$page->meta_keyword,
                "og_title"=>$page->meta_og_title,
                "og_description"=>$page->meta_og_description,
    //            "image" => "imgg",
    //            "locale" => App::getLocale()
            ],
            'gallery_img' => $files,
            'images' => $images,

        ])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }

    public function show(string $locale, string $slug)
    {
        //\Illuminate\Support\Facades\DB::enableQueryLog();


        $collection = ProductSet::query()->where('slug',$slug)->with(['video','translation','files','products','products.translation','products.latestImage','products.stocks','colors'])->firstOrFail();


        //dd($blog);
        return Inertia::render('FurnitureSet',[
            'product' => null,
            'category_path' => null,
            'similar_products' => null,
            'product_images' => null,
            'product_attributes' => null,
            'collection' => $collection,
            "seo" => [
                "title"=>$collection->meta_title,
                "description"=>$collection->meta_description,
                "keywords"=>$collection->meta_keyword,
                "og_title"=>$collection->meta_title,
                "og_description"=>$collection->meta_description,
//            "image" => "imgg",
//            "locale" => App::getLocale()
            ]
        ])->withViewData([
            'meta_title' => $collection->meta_title,
            'meta_description' => $collection->meta_description,
            'meta_keyword' => $collection->meta_keyword,
            "image" => null,
            'og_title' => $collection->meta_title,
            'og_description' => $collection->meta_description,
        ]);
    }
}
