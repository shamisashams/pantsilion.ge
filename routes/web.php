<?php
/**
 *  routes/web.php
 *
 * Date-Time: 03.06.21
 * Time: 15:41
 * @author Insite LLC <hello@insite.international>
 */

use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\LanguageController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\TranslationController;
use App\Http\Controllers\CKEditorController;
use App\Http\Controllers\Client\HomeController;
use App\Http\Controllers\Client\ContactController;
use App\Http\Controllers\Client\AboutUsController;
use Illuminate\Support\Facades\Route;

Route::post('ckeditor/image_upload', [CKEditorController::class, 'upload'])->withoutMiddleware('web')->name('upload');

Route::any('bog/callback/status', [\App\BogPay\BogCallbackController::class, 'status'])->withoutMiddleware('web')->name('bogCallbackStatus');
Route::any('bog/callback/refund',[\App\BogPay\BogCallbackController::class, 'refund'])->withoutMiddleware('web')->name('bogCallbackRefund');

Route::redirect('', config('translatable.fallback_locale'));
Route::prefix('{locale?}')
    ->group(function () {
        Route::prefix('adminpanel')->group(function () {
            Route::get('login', [LoginController::class, 'loginView'])->name('loginView');
            Route::post('login', [LoginController::class, 'login'])->name('login');


            Route::middleware(['auth','is_admin'])->group(function () {
                Route::get('logout', [LoginController::class, 'logout'])->name('logout');

                Route::redirect('', 'adminpanel/category');

                // Language
                Route::resource('language', LanguageController::class);
                Route::get('language/{language}/destroy', [LanguageController::class, 'destroy'])->name('language.destroy');

                // Translation
                Route::resource('translation', TranslationController::class);

                // Category
                Route::resource('category', \App\Http\Controllers\Admin\CategoryController::class);
                Route::get('category/{category}/destroy', [\App\Http\Controllers\Admin\CategoryController::class, 'destroy'])->name('category.destroy');
                Route::get('category/{category}/add_color',[\App\Http\Controllers\Admin\CategoryController::class,'addColor'])->name('category.add-color');
                Route::post('category/{category}/store_color',[\App\Http\Controllers\Admin\CategoryController::class,'storeColor'])->name('category.store_color');
                Route::get('category/{category}/{category_color}/edit_color',[\App\Http\Controllers\Admin\CategoryController::class,'editColor'])->name('category.edit_color');
                Route::put('category/{category}/{category_color}/update_color',[\App\Http\Controllers\Admin\CategoryController::class,'updateColor'])->name('category.update_color');
                Route::get('category/{category}/{category_color}/delete_color',[\App\Http\Controllers\Admin\CategoryController::class,'deleteColor'])->name('category.delete_color');
//
                // Product
                Route::resource('product', \App\Http\Controllers\Admin\ProductController::class);
                Route::get('product/{product}/destroy', [\App\Http\Controllers\Admin\ProductController::class, 'destroy'])->name('product.destroy');

                Route::get('product/variant/{product}/create',[\App\Http\Controllers\Admin\ProductController::class, 'variantCreate'])->name('product.variant.create');
                Route::post('product/variant/{product}/store',[\App\Http\Controllers\Admin\ProductController::class, 'variantStore'])->name('product.variant.store');

//                // Gallery
                Route::resource('gallery', GalleryController::class);
                Route::get('gallery/{gallery}/destroy', [GalleryController::class, 'destroy'])->name('gallery.destroy');



                // Slider
                Route::resource('slider', SliderController::class);
                Route::get('slider/{slider}/destroy', [SliderController::class, 'destroy'])->name('slider.destroy');

                // Page
                Route::resource('page', PageController::class);
                Route::get('page/{page}/destroy', [PageController::class, 'destroy'])->name('page.destroy');


                Route::get('setting/active',[SettingController::class,'setActive'])->name('setting.active');
                // Setting
                Route::resource('setting', SettingController::class);
                Route::get('setting/{setting}/destroy', [SettingController::class, 'destroy'])->name('setting.destroy');


                Route::resource('order', \App\Http\Controllers\Admin\OrderController::class);
                //Route::get('order/{order}/destroy', [\App\Http\Controllers\Admin\OrderController::class, 'destroy'])->name('order.destroy');

                // Password
                Route::get('password', [\App\Http\Controllers\Admin\PasswordController::class, 'index'])->name('password.index');
                Route::post('password', [\App\Http\Controllers\Admin\PasswordController::class, 'update'])->name('password.update');

                Route::resource('attribute', \App\Http\Controllers\Admin\AttributeController::class);
                Route::get('attribute/{attribute}/destroy', [\App\Http\Controllers\Admin\AttributeController::class, 'destroy'])->name('attribute.destroy');

                Route::resource('blog', \App\Http\Controllers\Admin\BlogController::class);
                Route::get('blog/{blog}/destroy', [\App\Http\Controllers\Admin\BlogController::class, 'destroy'])->name('blog.destroy');

                Route::resource('partner', \App\Http\Controllers\Admin\PartnerController::class)->parameters(['partner' => 'user']);
                Route::get('partner/{partner}/destroy', [\App\Http\Controllers\Admin\PartnerController::class, 'destroy'])->name('partner.destroy');


                Route::resource('city', \App\Http\Controllers\Admin\CityController::class);
                Route::get('city/{city}/destroy', [\App\Http\Controllers\Admin\CityController::class, 'destroy'])->name('city.destroy');

                Route::resource('stock', \App\Http\Controllers\Admin\StockController::class);
                Route::get('stock/{stock}/destroy', [\App\Http\Controllers\Admin\StockController::class, 'destroy'])->name('stock.destroy');

                Route::resource('team', \App\Http\Controllers\Admin\TeamController::class);
                Route::get('team/{team}/destroy', [\App\Http\Controllers\Admin\TeamController::class, 'destroy'])->name('team.destroy');

                Route::resource('color', \App\Http\Controllers\Admin\StockController::class);
                Route::get('color/{color}/destroy', [\App\Http\Controllers\Admin\StockController::class, 'destroy'])->name('color.destroy');


                Route::resource('collection', \App\Http\Controllers\Admin\CollectionController::class)->parameters(['collection' => 'product_set']);
                Route::get('collection/{collection}/destroy', [\App\Http\Controllers\Admin\CollectionController::class, 'destroy'])->name('collection.destroy');
                Route::put('collection/coordinates/update',[\App\Http\Controllers\Admin\CollectionController::class,'coordinatesUpdate'])->name('collection.update.coordinates');
                Route::get('collection/product/{product}/remove',[\App\Http\Controllers\Admin\CollectionController::class,'removeProduct'])->name('collection.destroy.product');

            });
        });


        Route::get('login',[\App\Http\Controllers\Client\AuthController::class,'loginView'])->name('client.login.index')->middleware('guest_client');
        Route::post('login',[\App\Http\Controllers\Client\AuthController::class,'login'])->name('client.login');
        Route::get('registration',[\App\Http\Controllers\Client\AuthController::class,'registrationView'])->name('client.registration.index');
        Route::post('registration',[\App\Http\Controllers\Client\AuthController::class,'createAccount'])->name('client.register');

        Route::get('logout',[\App\Http\Controllers\Client\AuthController::class,'logout'])->name('logout');


        Route::get('partner-signin',[\App\Http\Controllers\Client\AuthController::class,'partnerLoginView'])->name('partner.login.index')->middleware('guest_p');
        Route::post('partner-signin',[\App\Http\Controllers\Client\AuthController::class,'partnerLogin'])->name('partner.login');

        Route::middleware(['auth_partner','is_partner'])->group(function (){
            Route::get('partner/settings',[\App\Http\Controllers\Client\PartnerController::class,'cabinet'])->name('partner.settings');
            Route::get('partner/bank-account',[\App\Http\Controllers\Client\PartnerController::class,'bankAccount'])->name('partner.bank-account');
            Route::get('partner/withdraw-funds',[\App\Http\Controllers\Client\PartnerController::class,'withdraw'])->name('partner.withdraw');
            Route::get('partner/referrals',[\App\Http\Controllers\Client\PartnerController::class,'referrals'])->name('partner.referrals');
            Route::get('partner/orders',[\App\Http\Controllers\Client\PartnerController::class,'orders'])->name('partner.orders');
        });

        Route::middleware(['auth_client'])->group(function (){
            Route::get('client/cabinet',[\App\Http\Controllers\Client\UserController::class,'index'])->name('client.cabinet');
            Route::get('client/orders',[\App\Http\Controllers\Client\UserController::class,'orders'])->name('client.orders');
            Route::get('favorites',[\App\Http\Controllers\Client\FavoriteController::class,'index'])->name('client.favorite.index');
            Route::post('favorites',[\App\Http\Controllers\Client\FavoriteController::class,'addToWishlist'])->name('client.favorite.add');
            Route::get('favorites/remove',[\App\Http\Controllers\Client\FavoriteController::class,'removeFromWishlist'])->name('client.favorite.remove');
        });

        Route::post('add-to-cart',[\App\Http\Controllers\Client\CartController::class,'addToCart'])->name('add-to-cart');
        Route::post('add-to-cart-collection',[\App\Http\Controllers\Client\CartController::class,'addToCartCollection'])->name('add-to-cart-collection');
        Route::get('remove_from_cart',[\App\Http\Controllers\Client\CartController::class,'removeFromCart'])->name('remove-from-cart');
        Route::get('remove_from_cart_collection',[\App\Http\Controllers\Client\CartController::class,'removeFromCartCollection'])->name('remove-from-cart-collection');
        Route::get('get_cart',[\App\Http\Controllers\Client\CartController::class,'getCart'])->name('get_cart');
        Route::get('update_cart',[\App\Http\Controllers\Client\CartController::class,'updateCart'])->name('update_cart');
        Route::get('update_cart_collection',[\App\Http\Controllers\Client\CartController::class,'updateCartCollection'])->name('update_cart_collection');

        Route::get('sipping',[\App\Http\Controllers\Client\ShippingController::class,'index'])->name('client.shipping.index');

        Route::get('payment',[\App\Http\Controllers\Client\PaymentController::class,'index'])->name('client.payment.index');



        Route::middleware(['active'])->group(function () {

            // Home Page
            Route::get('', [HomeController::class, 'index'])->name('client.home.index');



            // Contact Page
            Route::get('/contact', [ContactController::class, 'index'])->name('client.contact.index');
            Route::post('/contact-us', [ContactController::class, 'mail'])->name('client.contact.mail');


            // About Page
            Route::get('about', [AboutUsController::class, 'index'])->name('client.about.index');

            Route::get('partner-join', [\App\Http\Controllers\Client\PartnerController::class, 'index'])->name('partner.join');
            Route::post('partner-join', [\App\Http\Controllers\Client\PartnerController::class, 'store'])->name('partner.store');

            Route::get('blog', [\App\Http\Controllers\Client\BlogController::class, 'index'])->name('client.blog.index');
            Route::get('blog/{blog}', [\App\Http\Controllers\Client\BlogController::class, 'show'])->name('client.blog.show');

            Route::get('furniture-set/{slug}',[\App\Http\Controllers\Client\CollectionController::class,'show'])->name('client.collection.show');

            // Product Page
            Route::get('products', [\App\Http\Controllers\Client\ProductController::class, 'index'])->name('client.product.index');
           Route::get('product/{product}', [\App\Http\Controllers\Client\ProductController::class, 'show'])->name('client.product.show');

           Route::get('category/{category}',[\App\Http\Controllers\Client\CategoryController::class,'show'])->name('client.category.show');
            Route::get('popular',[\App\Http\Controllers\Client\CategoryController::class,'popular'])->name('client.category.popular');
            Route::get('special',[\App\Http\Controllers\Client\CategoryController::class,'special'])->name('client.category.special');
            Route::get('new',[\App\Http\Controllers\Client\CategoryController::class,'new'])->name('client.category.new');
            Route::get('sale',[\App\Http\Controllers\Client\CategoryController::class,'special'])->name('client.category.sale');

            //checkout
            Route::get('cart',[\App\Http\Controllers\Client\CartController::class,'index'])->name('client.cart.index');
            Route::get('checkout',[\App\Http\Controllers\Client\OrderController::class,'index'])->name('client.checkout.index');
            Route::post('checkout',[\App\Http\Controllers\Client\OrderController::class,'order'])->name('client.checkout.order');
            Route::get('order/success',[\App\Http\Controllers\Client\OrderController::class,'statusSuccess'])->name('order.success');
            Route::get('order/failure',[\App\Http\Controllers\Client\OrderController::class,'statusFail'])->name('order.failure');

            Route::get('search', [\App\Http\Controllers\Client\SearchController::class, 'index'])->name('search.index');

            Route::any('payments/bog/status',[\App\Http\Controllers\Client\OrderController::class, 'bogResponse'])->name('bogResponse');

            /*Route::get('test/{method}',function ($locale,$method,\App\Http\Controllers\TestController $testController){

                return $testController->{$method}();
            });

            Route::post('test/filter',[\App\Http\Controllers\TestController::class,'filter']);*/
        });
    });


