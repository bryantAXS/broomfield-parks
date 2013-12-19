<script id="search-bar-layout-template" type="text/template">

  <!-- Inside SearchBarLayout.js <div id="search-bar-layout-container"> -->

    <div class="row">
      <form id="search-form">
        <div class="search-bar-container clearfix">
          <div class="search-bar-left-container clearfix">
            <input class="search-text" type="text" name="search-text" placeholer="Welcome to Broomfield, Colorado Parks Search" autocomplete="off"/>
            <div class="search-button-container">
              <button id="search-button" class="ss-icon ss-standard ss-search">
              </button>
              <button id="clear-search-button" class="ss-icon ss-pika ss-delete" type="button"></button>
            </div><!-- search-button-container -->
          </div><!-- search-bar-left-container -->

          <div class="search-bar-right-container">
            <button id="goto-map-button" class="ss-icon ss-pika ss-location" type="button"></button>
          </div><!-- search-bar-right-container -->
        </div><!-- search-bar-container -->
      </form>
    </div><!-- row -->

  <!-- </div> search-bar-layout-container -->

</script>