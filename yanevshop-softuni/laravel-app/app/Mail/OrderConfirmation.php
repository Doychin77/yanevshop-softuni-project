<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $deliveryInfo;
    public $products;

    public function __construct($deliveryInfo, $products)
    {
        $this->deliveryInfo = $deliveryInfo;
        $this->products = $products;
    }

    public function build()
    {

        return $this->view('emails.order_confirmation')
            ->with([
                'deliveryInfo' => $this->deliveryInfo,
                'products' => $this->products,
            ]);
    }
}
