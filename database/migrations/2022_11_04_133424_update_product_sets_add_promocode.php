<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateProductSetsAddPromocode extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('product_sets', function (Blueprint $table) {

            $table->bigInteger('promocode_id')->unsigned()->nullable();
            $table->index('promocode_id');

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
        Schema::table('product_sets', function (Blueprint $table) {
            $table->dropIndex('promocode_id');
            $table->dropColumn('promocode_id');


        });
    }
}
