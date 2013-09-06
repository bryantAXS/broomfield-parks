<?php

namespace app;

chdir ('../app/');

//Register lib autoloader
require '../composer_modules/autoload.php';

$router = new \system\Router;

$routes = array(
  "/" => "Main:index@get",
  "/feedback" => "Feedback:index@post"
);

$router->addRoutes($routes);
$router->run();