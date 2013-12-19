<?php

class BaseController extends Controller {

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
	protected function setupLayout()
	{
		if ( ! is_null($this->layout))
		{
			$this->layout = View::make($this->layout);
		}

		$this->layout->templates = $this->get_templates();
    $this->layout->environment = App::environment();

	}

	/**
   * This is used to dynamically load all files inside a specified directory
   * @param  string $root the path we want to load -- in our case its the /app/views/templates directory
   * @return array       an array of files
   */
  private function get_templates($root = false){

    $root = dirname(__DIR__) . "/views/templates";

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

            $file = $pieces[1];
            $file = str_replace(".blade.php", "", $file);
            $file = str_replace("/", ".", $file);

            $files['files'][]  = $file;
          }
        }
        closedir($handle);
      }
    }

    $templates = "";

    foreach($files["files"] as $view){
    	$templates .= View::make($view);
  	}

    return $templates;

  }

}