<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateMailTemplaitTranslationsAddExt extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('mail_template_translations', function (Blueprint $table) {

            $table->text('partner_approved')->nullable();
            $table->text('reset_password')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('mail_template_translations', function (Blueprint $table) {

            $table->dropColumn('partner_approved');
            $table->dropColumn('reset_password');


        });
    }
}
