<?php

namespace controllers;

Class Main extends \system\Controller
{

  public function __construct()
  {
    parent::__construct();
  }

  public function index($event_id = false)
  {

    $template_data = array();

    $template_data = array(
      "templates" => $this->_find_all_files(ROOT . "/app/views/templates")
    );

    //var_dump($template_data);

    parent::render('index.twig', $template_data);

  }

  private function _find_all_files($root){

    $files  = array('files'=>array(), 'dirs'=>array());
    $directories  = array();
    $last_letter  = $root[strlen($root)-1];
    $root  = ($last_letter == '\\' || $last_letter == '/') ? $root : $root.DIRECTORY_SEPARATOR;

    $directories[]  = $root;

    while (sizeof($directories)) {
      $dir  = array_pop($directories);
      if ($handle = opendir($dir)) {
        while (false !== ($file = readdir($handle))) {

          if ($file == '.' || $file == '..' || strpos($file, ".") === 0) {
            continue;
          }
          $file  = $dir.$file;
          if (is_dir($file)) {
            $directory_path = $file.DIRECTORY_SEPARATOR;
            array_push($directories, $directory_path);
            $files['dirs'][]  = $directory_path;
          } elseif (is_file($file)) {

            $pieces = explode("views/", $file);

            $files['files'][]  = $pieces[1];
          }
        }
        closedir($handle);
      }
    }

    return $files["files"];

  }

}