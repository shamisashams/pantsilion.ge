<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SliderRequest;
use App\Models\Slider;
use App\Models\User;
use App\Repositories\Eloquent\UserRepository;
use App\Repositories\SliderRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;

class PartnerController extends Controller
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

        return view('admin.nowa.views.partner.index', [
            'partners' => $this->userRepository->getPartners($request)
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

        $url = locale_route('slider.store', [], false);
        $method = 'POST';

        /*return view('admin.pages.slider.form', [
            'slider' => $slider,
            'url' => $url,
            'method' => $method,
        ]);*/

        return view('admin.nowa.views.slider.form', [
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
    public function store(SliderRequest $request)
    {
        $saveData = Arr::except($request->except('_token'), []);
        $saveData['status'] = isset($saveData['status']) && (bool)$saveData['status'];
        $slider = $this->userRepository->create($saveData);

        // Save Files
        if ($request->hasFile('images')) {
            $slider = $this->userRepository->saveFiles($slider->id, $request);
        }

        return redirect(locale_route('slider.index', $slider->id))->with('success', __('admin.create_successfully'));

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
        return view('admin.pages.slider.show', [
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
        $url = locale_route('partner.update', $user->id, false);
        $method = 'PUT';

        /*return view('admin.pages.slider.form', [
            'slider' => $slider,
            'url' => $url,
            'method' => $method,
        ]);*/

        return view('admin.nowa.views.partner.form', [
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
            'username' => 'required|unique:partners,username,'.$user_id . ',user_id',
            'password' => 'required'
        ]);
        //dd($request->all());
        $saveData = Arr::except($request->except('_token','_method'), []);

        $saveData['password'] = Hash::make($saveData['password']);

        //dd($saveData);
        $this->userRepository->update($user_id, $saveData);

        $this->userRepository->saveFiles($user_id, $request);

        $this->userRepository->model->partner()->updateOrCreate(['user_id' => $user_id],['username' => $request->post('username')]);


        return redirect(locale_route('partner.index', $user_id))->with('success', __('admin.update_successfully'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $locale
     * @param \App\Models\Category $category
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function destroy(string $locale, Slider $slider)
    {
        if (!$this->userRepository->delete($slider->id)) {
            return redirect(locale_route('slider.show', $slider->id))->with('danger', __('admin.not_delete_message'));
        }
        return redirect(locale_route('slider.index'))->with('success', __('admin.delete_message'));
    }
}
