<?php

namespace system;

class Router
{
  protected $routes;
  protected $request;

  public function __construct()
  {

    if(strrpos($_SERVER["HTTP_HOST"], "parks.broomfield.org") > -1){
      $_ENV["SLIM_MODE"] = "production";
    }else{
      $_ENV["SLIM_MODE"] = "development";
    }

    // $app = new \Slim\Slim;
    // $app->error(function (\Exception $e) use ($app) {
    //   var_dump("test");
    //   $bugsnag = new Bugsnag_Client("5d2ff64c4da0e9b86bc0d2c32b32991b");
    //   $bugsnag->setReleaseStage($_ENV["SLIM_MODE"]);
    //   $bugsnag->setNotifyReleaseStages(array("development", "production"));
    //   $bugsnag->notifyException($e);
    // });

    $env = \Slim\Environment::getInstance();

    $this->request = new \Slim\Http\Request($env);
    $this->routes = array();
  }

  public function addRoutes($routes)
  {
    foreach($routes as $route => $path){

      $method = "any";

      if(strpos($path, "@") !== false){
        list($path, $method) = explode("@", $path);
      }

      $func = $this->processCallback($path);

      $r = new \Slim\Route($route, $func);
      $r->setHttpMethods(strtoupper($method));

      array_push($this->routes, $r);

    }
  }

  public function processCallback($path)
  {

    $class = "Main";

    if(strpos($path, ":") !== false){
      list($class, $path) = explode(":", $path);
    }

    $function = ($path !== "") ? $path : "index";

    $func = function() use($class, $function){
      $class = '\controllers\\' . $class;
      $class = new $class();

      $args = func_get_args();

      return call_user_func_array(array($class, $function), $args);
    };

    return $func;

  }

  public function run()
  {

    $display404 = true;
    $uri = $this->request->getResourceUri();
    $method = $this->request->getMethod();

    foreach($this->routes as $i => $route){
      if($route->matches($uri)){
        if($route->supportsHttpMethod($method) || $route->supportsHttpMethod("ANY")){
          call_user_func_array($route->getCallable(), array_values($route->getParams()));
          $display404 = false;
        }
      }
    }

    if($display404){
      $route = $this->routes[0];
      call_user_func_array($route->getCallable(), array());
    }

  }

}