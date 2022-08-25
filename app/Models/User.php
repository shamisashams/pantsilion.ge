<?php

namespace App\Models;

use App\Traits\ScopeFilter;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, ScopeFilter;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'surname',
        'is_partner',
        'id_number',
        'phone',
        'affiliate_id',
        'referred_by'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];


    /*protected $with = [
      'referrals'
    ];*/

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getFilterScopes(): array
    {
        return [

        ];
    }


    public function files(): MorphMany
    {
        return $this->morphMany(File::class, 'fileable');
    }

    public function cv(): MorphOne{
        return $this->morphOne(File::class,'fileable')->where('type',File::CV);
    }

    public function partner(): HasOne{
        return $this->hasOne(Partner::class);
    }

    public function referrals(): HasMany{
        return $this->hasMany(self::class,'referred_by','affiliate_id');
    }

    public function wishlist()
    {
        return $this->hasMany(Wishlist::class, 'user_id');
    }

    public function promoCode(){
        return $this->hasOne(PromoCode::class);
    }

    public function promoCodes(){
        return $this->hasMany(PromoCode::class);
    }

    public function orders(){
        return $this->hasMany(Order::class);
    }

}
