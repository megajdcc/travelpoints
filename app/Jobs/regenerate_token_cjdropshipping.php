<?php

namespace App\Jobs;

use App\Models\Sistema;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class regenerate_token_cjdropshipping implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected Sistema $sistema;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->sistema = Sistema::first();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        
        if($this->sistema->cjdropshipping){
                $response = Http::acceptJson()
                    ->post('https://developers.cjdropshipping.com/api2.0/v1/authentication/refreshAccessToken', [
                        'refreshToken' => $this->sistema->cjdropshipping['refreshToken'],
                    ]);

            if ($response->ok()){
                $data = $response->object();

                if($data->result){
                    $this->sistema->cjdropshipping = [
                        'accessToken'            => $data->data->accessToken,
                        'accessTokenExpiryDate'  => $data->data->accessTokenExpiryDate,
                        'refreshToken'           => $data->data->refreshToken,
                        'refreshTokenExpiryDate' => $data->data->refreshTokenExpiryDate,
                        'createDate'             => $data->data->createDate
                    ];
                    $this->sistema->save();
                    regenerate_token_cjdropshipping::dispatch()->delay(Carbon::now()->addDays(15));

                }else{
                    $this->generarToken();
                }
               

               
            }
        }else{
            $this->generarToken();
        }

    }


    private function generarToken(){
        $response = Http::acceptJson()
        ->post('https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken', [
            'email' => 'info@infochannel.si',
            'password' => 'dfc64a407ffb4e9eb805fc1ac45bba78',
        ]);
        if ($response->ok()) {
            $data = $response->object();

            if($data->result){
                $this->sistema->cjdropshipping = [
                    'accessToken'            => $data->data->accessToken,
                    'accessTokenExpiryDate'  => $data->data->accessTokenExpiryDate,
                    'refreshToken'           => $data->data->refreshToken,
                    'refreshTokenExpiryDate' => $data->data->refreshTokenExpiryDate,
                    'createDate'             => $data->data->createDate
                ];
            }

            regenerate_token_cjdropshipping::dispatch()->delay(Carbon::now()->addDays(15));

            $this->sistema->save();
        }
    }
}
