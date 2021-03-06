<script id="result-item-view-template" type="text/template">

  <!-- Added in ResultItemView.js <div class="result-container columns large-4"> -->

    <a class="result-container" href="/park/<%= safe_place_name %>">

      <div class="result-image-container">

        <!--
        If we want to lazy load use this instead
        <img class="lazy" src="/images/image-load-dot.png" data-original="/images/placeholder-result-1.png" />
        -->

        <img src="<%= thumbnail_image %>" />
      </div>

      <div class="result-content-container">
        <div class="row result-title-row">
          <p class="columns large-12 result-title">
            <%= place_name %>
          </p>
        </div><!-- row -->
        <div class="row">
          <p class="result-amenities columns large-12">
            <%= facilities %>
          </p>
        </div>
        <div class="row">
          <p class="result-address columns large-12">
            <%= address %>
          </p>
        </div>
      </div>

    </a>

  <!-- </div> result-container -->

</script>