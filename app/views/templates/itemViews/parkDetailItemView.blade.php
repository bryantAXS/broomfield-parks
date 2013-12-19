<script id="park-detail-item-view-template" type="text/template">

  <!-- Added in ParkDetailItemView.js <div class="park-detail-container columns large-12"> -->

  <div class="row">

    <div id='park-detail-gallery-container' class="columns large-8">
      <% _.each(gallery_images, function(image){ %>
      <img class="placeholder" src="<%= image %>" />
      <% }) %>
      <img class="dummy"  src="/images/placeholder-detail-gallery-1.png" />
      <a id="park-detail-gallery-left" class="ss-icon ss-standard ss-navigateleft" href="javascript:;"></a>
      <a id="park-detail-gallery-right" class="ss-icon ss-standard ss-navigateright" href="javascript:;"></a>
      <img src="/images/loading-slow.gif" alt="loading" class="gallery-loader" />
    </div><!-- #park-detail-gallery-container -->

    <div id='park-detail-info-container' class="columns large-4">
      <a href="javascript:;" class="close ss-icon ss-pika ss-delete ss-location"></a>
      <h1>
        <%= place_name %>
      </h1>
      <address>
        <%= address %> <br />
        <%= city %>, <%= state %>
      </address>
      <p>
        <%= description %>
      </p>
      <h2>Amenities</h2>
      <p>
        <%= facilities %>
      </p>
      <h2>Directions</h2>
      <p>
        <%= general_directions %>
      </p>
      <a class="button orange map-it-button" href="javascript:;" data-park-id="<%= gis_id %>"><span class="ss-icon ss-pika ss-location"></span>Map It </a>
    </div><!-- #park-detail-gallery-container -->

  </div><!-- row -->

  <!-- </div> park-detail-container -->

</script>