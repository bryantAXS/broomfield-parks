<?php

class FeedbackController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{

    $allPostVars = Input::all();

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

    $mail->IsSMTP(); // telling the class to use SMTP
    $mail->SMTPDebug  = 0;                     // enables SMTP debug information (for testing)
    $mail->SMTPAuth   = true;                  // enable SMTP authentication
    $mail->SMTPSecure = "tls";                 // sets the prefix to the servier
    $mail->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
    $mail->Port       = 587;                   // set the SMTP port for the GMAIL server
    $mail->Username   = "email@authenticff.com";  // GMAIL username
    $mail->Password   = "Mug77rhnHcmGBi";            // GMAIL password

    $mail->CharSet = "UTF-8";
    $mail->AddAddress("gis@broomfield.org", "Broomfield GIS");
    $mail->AddAddress("bryant@thegoodlab.com", "Broomfield GIS");
    $mail->SetFrom("parks@broomfield.org","Broomfield GIS");
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

}
