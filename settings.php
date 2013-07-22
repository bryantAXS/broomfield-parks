<?php

$settings = array(
 'mode' => "development",
 'view' => new \Slim\Extras\Views\Twig(),
 'templates.path' => '../app/views',
 'log.level' => 4,
 'log.writer' => new \Slim\Extras\Log\DateTimeFileWriter(array(
   'path' => '../tmp/logs',
   'name_format' => 'y-m-d'
 ))
);

return $settings;