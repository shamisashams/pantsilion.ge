<?php

namespace App\Models\Translations;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactTranslation extends BaseTranslationModel
{
    use HasFactory;
    protected $fillable = [
        'address'
    ];
}