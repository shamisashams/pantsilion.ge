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


        $blog = ProductSet::query()->where('slug',$slug)->with(['video','translation','files','products','products.translation','products.latestImage'])->firstOrFail();


        //dd($blog);
        return Inertia::render('FurnitureSet',[
            'product' => null,
            'category_path' => null,
            'similar_products' => null,
            'product_images' => null,
            'product_attributes' => null,
            'collection' => $blog,
            "seo" => [
                "title"=>$blog->meta_title,
                "description"=>$blog->meta_description,
                "keywords"=>$blog->meta_keyword,
                "og_title"=>$blog->meta_title,
                "og_description"=>$blog->meta_description,
//            "image" => "imgg",
//            "locale" => App::getLocale()
            ]
        ])->withViewData([
            'meta_title' => $blog->meta_title,
            'meta_description' => $blog->meta_description,
            'meta_keyword' => $blog->meta_keyword,
            "image" => null,
            'og_title' => $blog->meta_title,
            'og_description' => $blog->meta_description,
        ]);
    }
}
