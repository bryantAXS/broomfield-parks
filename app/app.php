<?php

require ROOT . '/composer_modules/autoload.php';
require ROOT.'/app/config/config.php';

require 'controllers/Main.php';
require 'controllers/Feedback.php';

if(strrpos($_SERVER["HTTP_HOST"], "parks.broomfield.org") > -1){
  $_ENV["SLIM_MODE"] = "production";
}else{
  $_ENV["SLIM_MODE"] = "development";
}

$app = new \Slim\Slim(array(
  'templates.path' => ROOT . '/app/views'
  ,'debug' => true
  ,'view' => new \Slim\Extras\Views\Twig()
));


// $app->error(function (\Exception $e) use ($app) {
//   $bugsnag = new Bugsnag_Client("5d2ff64c4da0e9b86bc0d2c32b32991b");
//   $bugsnag->setReleaseStage($_ENV["SLIM_MODE"]);
//   $bugsnag->setNotifyReleaseStages(array("development", "production"));
//   $bugsnag->notifyException($e);
//   die();
// });

$app->get("/", function() use($app){
  $main_controller = new Main($app);
  $main_controller->index();
});

$app->post("/feedback", function() use($app){
  $feedback_controller = new Feedback($app);
  $feedback_controller->index();
});

$app->get("/:uri+", function($segments) use($app){
  $main_controller = new Main($app);
  $main_controller->index($segments);
});

$app->run();