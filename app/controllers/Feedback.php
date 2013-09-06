<?php

namespace controllers;

use jyggen\Curl;
use phpmailer\PHPMailer;

Class Feedback extends \system\Controller
{

  public function __construct()
  {
    parent::__construct();
  }

  public function index()
  {

    $return_data = array(
      "success" => 1
    );

    echo json_encode($return_data);

  }

}