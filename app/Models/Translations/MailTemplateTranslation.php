<?php

namespace App\Models\Translations;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MailTemplateTranslation extends BaseTranslationModel
{
    use HasFactory;

    protected $table = 'mail_template_translations';

    protected $fillable = [
        'promocode_cart',
        'promocode_products',
        'client_register',
        'partner_register',
        'partner_approved',
        'reset_password'
    ];
}
