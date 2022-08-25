<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderCollectionItem extends Model
{
    use HasFactory;

    protected $table = 'order_items';


    public function orderCollection(): BelongsTo
    {
        return $this->belongsTo(OrderCollection::class);
    }


}
