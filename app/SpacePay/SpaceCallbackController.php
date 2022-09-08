<?php

namespace App\SpacePay;

use Illuminate\Http\Request;

use App\Models\Order;
use App\Http\Controllers\Controller;

class SpaceCallbackController extends Controller
{
    //

    public function status(Request $request){


        return response()->json(['Status' => 0, 'Description' => 'test']);
    }

    public function refund(Request $request){
        return response('',200);
    }
}
