# City of Broomfield's Parks Search Application

This codebase is powered by serval different frameworks and font-end build tools. They are all briefly described.

## SlimPHP

The back-end framework is built using [SlimPHP](http://www.slimframework.com/). There is only a small amount of PHP being used, but it is still vital in the running of the application. Most importantly there is PHP to handle:

* Preloading of Parks data during the intial page request.
* The dynammic loading of javascript template views from the /app/views/template directory.
* The sending of Feedback emails

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