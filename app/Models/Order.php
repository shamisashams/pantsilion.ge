<?php

namespace App\Models;

use App\Traits\ScopeFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory, ScopeFilter;

    protected $table = 'orders';

    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'email',
        'city',
        'address',
        'info',
        'payment_method',
        'courier_service',
        'locale',
        'grand_total',
        'payment_type',
        'user_id',
        'discount',
        'ship_price'
    ];

    public function getFilterScopes(): array
    {
        return [
            'id' => [
                'hasParam' => true,
                'scopeMethod' => 'id'
            ],
            'user_id' => [
                'hasParam' => true,
                'scopeMethod' => 'userId'
            ],
            'status' => [
                'hasParam' => true,
                'scopeMethod' => 'status'
            ],
            'price' => [
                'hasParam' => true,
                'scopeMethod' => 'price'
            ],
            'name' => [
                'hasParam' => true,
                'scopeMethod' => 'firstLastName'
            ],
            'email' => [
                'hasParam' => true,
                'scopeMethod' => 'email'
            ],
            'phone' => [
                'hasParam' => true,
                'scopeMethod' => 'phone'
            ],
        ];
    }


    public function items():HasMany{
        return $this->hasMany(OrderItem::class);
    }

    public function collections(){
        return $this->hasMany(OrderCollection::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
