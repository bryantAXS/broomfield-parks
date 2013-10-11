<?php

namespace controllers;

Class Feedback extends \system\Controller
{

  public function __construct()
  {
    parent::__construct();
  }

  /**
   * Method used to send an email on the Feedback form submission.
   * @return void
   */
  public function index()
  {

    $req = parent::request();
    $allPostVars = $req->post();

    if($allPostVars["honey"] != "918272635437"){
      return;
    }

    $body = "-------------------------------\r\n";
    $body .= "Name:" . $allPostVars["name"] . "\r\n";
    $body .= "Email:" . $allPostVars["email"] . "\r\n";
    $body .= "Purpose:" . $allPostVars["purpose"] . "\r\n";
    $body .= "Comments:" . $allPostVars["comments"] . "\r\n";
    $body .= "-------------------------------\r\n";

    $mail = new \PHPMailer();
    $mail->CharSet = "UTF-8";
    $mail->AddAddress("gis@broomfield.org", "Broomfield GIS");
    $mail->AddAddress("bryant@thegoodlab.com", "Broomfield GIS");
    $mail->SetFrom("bryant@thegoodlab.com","The Good Lab");
    $mail->Subject = "Broomfield Parks Search Feedback Message";
    $mail->Body = $body;

    if(!$mail->Send()) {
      $return_data = array(
        "success" => 0,
        "message" => $mail->ErrorInfo
      );
    }else{
      $return_data = array(
        "success" => 1,
        "message" => ""
      );
    }

    echo json_encode($return_data);

    exit;

  }

  public function test()
  {

    echo "Well hey there guy.";

  }

}