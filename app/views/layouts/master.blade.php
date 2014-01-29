<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7 ie"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8 ie"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9 ie"> <![endif]-->
<!--[if IE 9]>         <html class="no-js lt-ie10 ie"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js"> <!--<![endif]-->
    <head>

      <meta charset="utf-8">
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width">

      <title>City of Broomfield Parks Search</title>

      <script type="text/javascript" src="/scripts/vendor/vendor/custom.modernizr.js"></script>

      <link rel="stylesheet" href="/styles/css/app.css" />
      <link rel="stylesheet" href="/styles/css/ie.css" />

      <!--[if lt IE 9]>
        <link rel="stylesheet" href="/styles/css/ie.css" />
      <![endif]-->

    </head>
    <body>

    <!--[if lt IE 7]>
        <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
    <![endif]-->

    <div class="container">
      <div id="search-region-container">
      </div><!-- search-region-container -->

      <div id="content-region-container">
      </div><!-- content-region-container -->

      <div id="map-region-container">
      </div><!-- map-region-container-->

      <div id="feedback-region-container">
      </div><!-- feedback-region-container -->
    </div>

    {{ $templates }}

    <script>
      var allParksJSON = {{ $parksJSON }}
    </script>

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-23070397-19', 'broomfield.org');
      ga('send', 'pageview');

    </script>

    @if ($environment == "local")
      <script data-main="/scripts/main.js" src="/scripts/vendor/require.js"></script>
    @else
      <script data-main="/scripts/main-built.js" src="/scripts/vendor/require.js"></script>
    @endif

    </body>
</html>
