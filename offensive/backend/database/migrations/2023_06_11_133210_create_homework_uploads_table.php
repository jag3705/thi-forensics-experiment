<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('homework_uploads', function (Blueprint $table) {
            $table->id();
            $table->string('grade')->nullable(true)->default(0);
            $table->string('notes');
            $table->string('upload_path');

            $table->unsignedBigInteger('homework_id');
            $table->unsignedBigInteger('student_id');
            $table->timestamps();

            $table->foreign('homework_id')->references('id')->on('homeworks')
                ->onDelete('cascade');
            $table->foreign('student_id')->references('id')->on('students')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('homework_uploads');
    }
};
