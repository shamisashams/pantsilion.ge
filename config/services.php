<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],
    'facebook' => [
        'client_id' => '544513060814044',
        'client_secret' => '7295d5ba48a10dcf40e55af27a5d9a90',
        'redirect' => 'https://pantsilion.ge/ge/auth/facebook/callback',
    ],
    'google' => [
        'client_id' => '498949893097-oc31kggtup2u0g8cuojf6bh5l77f4ffs.apps.googleusercontent.com',
        'client_secret' => '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',
        'redirect' => 'https://pantsilion.ge/ge/auth/google/callback',
    ],

];
