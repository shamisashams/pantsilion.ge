<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OrderCollection extends Model
{
    use HasFactory;

    protected $table = 'order_collections';


    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function items():HasMany{
        return $this->hasMany(OrderItem::class);
    }


}
