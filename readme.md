# City of Broomfield's Parks Search Application

This codebase is powered by serval different frameworks and font-end build tools. They are all briefly described.

## Laravel PHP Framework

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable, creative experience to be truly fulfilling. Laravel attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as authentication, routing, sessions, and caching.

Laravel aims to make the development process a pleasing one for the developer without sacrificing application functionality. Happy developers make the best code. To this end, we've attempted to combine the very best of what we have seen in other web frameworks, including frameworks implemented in other languages, such as Ruby on Rails, ASP.NET MVC, and Sinatra.

Laravel is accessible, yet powerful, providing powerful tools needed for large, robust applications. A superb inversion of control container, expressive migration system, and tightly integrated unit testing support give you the tools you need to build any application with which you are tasked.

Documentation for the entire framework can be found on the [Laravel website](http://laravel.com/docs).

## Composer

SlimPHP as wells as a few additional libraries (caching, email, etc.) have been installed using the PHP package manager [composer](http://getcomposer.org/). The ```composer.json``` file holds these dependancies.

## Sass/Compass

[Sass](http://sass-lang.com/) is being utilized to handle the preprocessing of site styles. [Compass](http://compass-style.org/) is a Sass framework which is being used. After installing both Sass and Compass (using RubyGems) you can compile the compass using the command ```$ compass compile```. To have compass watch the files for changes, and compile files after a change is detected, use ```$ compass watch```

## Foundation

[Foundation](http://foundation.zurb.com/) is a Sass framework utlized for building web applications. It is used in this application, most importantly for the grid layout.

## Bower

[Bower](http://bower.io/) is a package manager for javascript. It is being used.


## Grunt

[Grunt](http://gruntjs.com/) is a task running for javascript. It handles the compiling and compression of the javascript files, and should be run before pushing code into a production environment. The ```gruntfile.js``` outlines specific tasks to handle this process.

## NPM (Node Package Manager)

Grunt is powered by [NPM](https://npmjs.org/), which is a javascript package manger. NPM is similar to RubyGems, and runs on your local machine, helping out with taks while you are developing.