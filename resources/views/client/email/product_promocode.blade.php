{!! $text !!}
<br>
@lang('admin.promocode') - {{$code}}
<br/>
@if($product)
<a href="{{route('client.product.show',$product->slug)}}">{{$product->title}}</a>
@endif
