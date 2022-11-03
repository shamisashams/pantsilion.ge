<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SliderRequest;
use App\Mail\CredentialChanged;
use App\Models\MailTemplate;
use App\Models\Slider;
use App\Models\User;
use App\Repositories\Eloquent\UserRepository;
use App\Repositories\SliderRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserController extends Controller
{

    private $userRepository;


    public function __construct(
        UserRepository $userRepository
    )
    {
        $this->userRepository = $userRepository;

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\Response
     */
    public function index(SliderRequest $request)
    {
        /*return view('admin.pages.slider.index', [
            'sliders' => $this->slideRepository->getData($request, ['translations'])
        ]);*/

        return view('admin.nowa.views.user.index', [
            'partners' => $this->userRepository->getCustomers($request)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\Response
     */
    public function create()
    {
        $slider = $this->userRepository->model;

        $url = locale_route('user.store', [], false);
        $method = 'POST';

        /*return view('admin.pages.slider.form', [
            'slider' => $slider,
            'url' => $url,
            'method' => $method,
        ]);*/

        return view('admin.nowa.views.user.form', [
            'slider' => $slider,
            'url' => $url,
            'method' => $method,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\Admin\ProductRequest $request
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     * @throws \ReflectionException
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
        ]);

        $saveData = Arr::except($request->except('_token'), []);
        $saveData['status'] = isset($saveData['status']) && (bool)$saveData['status'];
        $slider = $this->userRepository->create($saveData);

        // Save Files
        if ($request->hasFile('images')) {
            $slider = $this->userRepository->saveFiles($slider->id, $request);
        }

        return redirect(locale_route('user.index', $slider->id))->with('success', __('admin.create_successfully'));

    }

    /**
     * Display the specified resource.
     *
     * @param string $locale
     * @param \App\Models\Product $product
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function show(string $locale, Slider $slider)
    {
        return view('admin.pages.user.show', [
            'slider' => $slider,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     *
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function edit(string $locale, User $user)
    {

        //dd($user);
        $url = locale_route('user.update', $user->id, false);
        $method = 'PUT';

        /*return view('admin.pages.slider.form', [
            'slider' => $slider,
            'url' => $url,
            'method' => $method,
        ]);*/

        return view('admin.nowa.views.user.form', [
            'partner' => $user,
            'url' => $url,
            'method' => $method,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\Admin\CategoryRequest $request
     * @param string $locale
     * @param \App\Models\Category $category
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function update(Request $request, string $locale, $user_id)
    {



        $request->validate([
            'email' => 'required|email|unique:users,email,'.$user_id,
        ]);


        //dd($request->all());
        $saveData = Arr::except($request->except('_token','_method'), []);

        $saveData['is_partner'] = isset($saveData['is_partner']) && (bool)$saveData['is_partner'];


        //dd($saveData);
        $this->userRepository->update($user_id, $saveData);

        $this->userRepository->saveFiles($user_id, $request);


        if ($saveData['is_partner']){
            $user = User::find($user_id);
            $data['username'] = $user->name . '_' . uniqid();;

            $this->userRepository->model->partner()->updateOrCreate(['user_id' => $user_id],['username' => $data['username']]);

            $template = MailTemplate::first();
            $data['text'] = $template->partner_approved;
            $data['password'] = Str::random(8);
            Mail::to($user)->send(new CredentialChanged($data));
        }

        return redirect(locale_route('user.index', $user_id))->with('success', __('admin.update_successfully'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $locale
     * @param \App\Models\Category $category
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function destroy(string $locale, User $user)
    {
        if (!$this->userRepository->delete($user->id)) {
            return redirect(locale_route('user.show', $user->id))->with('danger', __('admin.not_delete_message'));
        }
        return redirect(locale_route('user.index'))->with('success', __('admin.delete_message'));
    }
}
