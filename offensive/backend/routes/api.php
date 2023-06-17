<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::prefix('v1')
    ->group(static function () {

        Route::prefix('system')->name('system')
            ->group(static function () {
                Route::get('is-alive', [
                    'uses' => 'HealthCheck@isAlive',
                    'as' => 'isAlive',
                ]);
            });

        Route::group(['middleware' => ['auth:sanctum']], static function () {
            Route::prefix('homeworks')
                ->group(static function () {
                    Route::get('/', 'HomeworkController@index');
                    Route::get('/{id}', 'HomeworkController@getById');
                });

            Route::prefix('students')
                ->group(static function () {
                    Route::get('/', 'StudentProfileController@index');
                });

            Route::prefix('uploads')
                ->group(static function () {
                    Route::get('/', 'HomeworkUploadsController@index');
                    Route::get('/not-graded', 'HomeworkUploadsController@getNotGraded');
                    Route::get('/graded', 'HomeworkUploadsController@getGraded');
                    Route::post('/{homework_id}/', 'HomeworkUploadsController@uploadHomework');
                });
        });


        Route::prefix('students')
            ->group(static function () {

                Route::prefix('auth')
                    ->group(static function () {
                        Route::post('register', 'AuthController@register');
                        Route::post('login', 'AuthController@login');
                    });

                Route::group(['middleware' => ['auth:sanctum']], static function () {
                    Route::get('me', 'AuthController@getMe');
                    Route::post('avatar', 'StudentProfileController@setAvatar');
                    Route::put('meta', 'StudentProfileController@setStudentMetaData');
                });


            });


    });
