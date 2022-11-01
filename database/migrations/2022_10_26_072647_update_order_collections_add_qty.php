<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateOrderCollectionsAddQty extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('order_collections', function (Blueprint $table) {

            $table->integer('qty')->nullable();
            $table->decimal('price')->nullable();

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
        Schema::table('order_collections', function (Blueprint $table) {

            $table->dropColumn('qty');
            $table->dropColumn('decimal');
        });
    }
}
