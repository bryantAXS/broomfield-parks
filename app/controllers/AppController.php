<?php

class ParksRequest extends \Jyggen\Curl\Request
{
	public function execute()
  {

      $this->content = curl_exec($this->handle);

      // If the execution was successful flag it as executed.
      if ($this->isSuccessful()) {
          $this->executed = true;
      } else { // Otherwise throw an exception.
          // throw new CurlErrorException($this->getErrorMessage());
      }

  }
}

class AppController extends BaseController {

	public $layout = "layouts.master";

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index($uri = false)
	{

    $this->layout->parksJSON = $this->getParksJSON();
		//$this->layout->content = View::make('pages.index');

	}

	/**
   * Doing a Curl requset to get all of our parks ahead of the page loading. This means we don't have to do
   * a preliminary ajax request to get the json, and it's already loaded for us.
   * @return string JSON string of our parks data
   */
  private function getParksJSON(){

 		$json = Cache::get('parksJson', false);

 		if($json == false){
 			$json = $this->makeRequest();
 		}

 		return $json;

  }

	private function makeRequest()
	{

		//http://gis1.broomfield.org/arcgis/rest/services/Parks/FindAPark/MapServer/0/query?f=json&outSR=4326&outFields=*&where='1=1'

		$request_url = "http://gis1.broomfield.org/arcgis/rest/services/Parks/FindAPark/MapServer/0/query";

    $data = array(
      "f"           => "json",
      "outSR"       => 4326,
      "outFields"   => "*",
      "where"       => "1=1"
    );

    $request = new ParksRequest($request_url);
		$request->setOption(CURLOPT_FOLLOWLOCATION, true);
		$request->setOption(CURLOPT_POST, true);
		$request->setOption(CURLOPT_POSTFIELDS, $data);
		$request->setOption(CURLOPT_TIMEOUT, 5);
		$request->execute();

		if($request->isSuccessful()){

			$response_data = $request->getResponse();
			$response_json = json_decode($response_data->getContent());
	    $encoded_json = json_encode($this->_parse_park_results($response_json), JSON_HEX_QUOT);

	    Cache::add('parksJson', $encoded_json, 60);
	    Cache::forever('backupParksJson', $encoded_json);

		}else{

		  $encoded_json = Cache::get('backupParksJson', false);

		}

		return $encoded_json;

	}

  /**
   * Parsing the results we get back from the Curl request to the map server
   * @param  string $response_json the raw json
   * @return array                An array of park models
   */
  private function _parse_park_results($response_json){

    $array_of_models = array();

    foreach($response_json->features as $park){

      $model = array();

      $attribute_keys = get_object_vars($park->attributes);

      foreach($attribute_keys as $key => $value){
        $model[strtolower($key)] = $value;
      }

      $model["geometry"] = $park->geometry;

      $array_of_models[] = $model;

    }

    return $array_of_models;

  }

  /**
   * This is used to dynamically load all files inside a specified directory
   * @param  string $root the path we want to load -- in our case its the /app/views/templates directory
   * @return array       an array of files
   */
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
