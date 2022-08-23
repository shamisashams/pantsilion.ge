<?php

namespace App\Cart;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Session;
use App\Models\Product;


class Cart
{

    public function __construct()
    {
        //\session()->forget('cart');
    }

    public function mergeCart(){

    }

    public function add($request){


        $products = session('cart') ?? array();



        $bool = true;


        foreach ($products as $item) {
            if ($item->product_id == $request['id']) {

                    $item->quantity += $request['qty'];
                    $bool = false;
                    break;

            }
        }


            $product = Product::findOrFail($request['id']);
            if ($bool) {
                $products[] = (object)[
                    'product_id' => $product->id,
                    'quantity' => $request['qty'],
                    'price' => $product->price,
                ];
                $request->session()->put('cart', $products);

            }




    }

    public function remove($request){
        $id = $request['id'];



        $cart = session('cart') ?? array();
        if ($cart !== null) {
            foreach ($cart as $key => $item) {
                if ($item->product_id == $id) {
                    unset($cart[$key]);
                    $cart = array_values($cart);
                }
            }
            if(count($cart)){
                session(['cart' => $cart]);
            } else {
                session()->forget('cart');
            }


        }

    }

    public function update($request){
        //dd($request->all());
        $id = $request['id'];
        $cart = session('cart') ?? array();
        if ($cart !== null) {
            foreach ($cart as $key => $item) {
                if ($item->product_id == $id) {
                    $cart[$key]->quantity = $request['qty'];
                }
            }

            //dd($cart);
            session(['cart' => $cart]);

        }
    }

    public function getCart(){
        $products = array();
        $cart = session('cart') ?? array();
        $total = 0;

        //dd($cart);
        if ($cart !== null) {
            foreach ($cart as $_item) {
                $product = Product::with(['translation','latestImage'])->where(['id' => $_item->product_id])->first();
                $product_attributes = $product->attribute_values;

                $result = [];

                foreach ($product_attributes as $item){
                    $options = $item->attribute->options;
                    $value = '';
                    foreach ($options as $option){
                        if($item->attribute->type == 'select'){
                            if($item->integer_value == $option->id) {
                                $result[$item->attribute->code] = $option->label;
                            }

                        }
                    }

                }

                $product['attributes'] = $result;
                if ($product) {
                    $products[] = [

                        'product' => $product,
                        'quantity' => $_item->quantity,
                    ];
                }
            }
            foreach ($cart as $item) {

                    $total += intval($item->quantity) * floatval($item->price);

            }
        }
        return array('count' => count($cart), 'products' => $products, 'total' => $total);
    }

    public function count(){
        $cart = session('cart') ?? array();
        return count($cart);
    }

}
