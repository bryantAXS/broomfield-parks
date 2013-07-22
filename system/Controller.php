<?php

namespace system;

Class Controller extends \Slim\Slim
{
  protected $data;

  public function __construct()
  {
    $settings = require("../settings.php");
    if(isset($settings['model'])){
      $this->data = $settings["model"];
    }
    parent::__construct($settings);
  }
}