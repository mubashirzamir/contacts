<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("first_name")->comment("First name of the contact");
            $table->string("surname")->comment("Surname of the contact");
            $table->string("email")->index()->unique()->nullable()->comment("Email address of the contact");
            $table->jsonb("phone")->comment("Phone number of the contact");
            $table->string("address_line_01")->nullable()->comment("Address line 01 of the contact");
            $table->string("address_line_02")->nullable()->comment("Address line 02 of the contact");
            $table->string("address_line_03")->nullable()->comment("Address line 03 of the contact");
            $table->string("city")->nullable()->comment("City of the contact");
            $table->string("postcode")->nullable()->comment("County of the contact");
            $table->string("avatar")->nullable()->comment("Avatar of the contact");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
