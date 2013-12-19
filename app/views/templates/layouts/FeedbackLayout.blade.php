<script id="feedback-layout-template" type="text/template">

  <form id="feedback-form">

    <a href="javascript:;" class="close ss-icon ss-pika ss-delete ss-location"></a>

    <span class="title">Send Us Your Feedback</span>

    <input type="text" autocomplete="off" name="name" id="feedback-name" placeholder="name" />
    <input type="text" autocomplete="off" name="email" id="feedback-email" placeholder="email" />
    <div class="select-wrapper" data-default-text="choose a purpose">
      <span class="select-text"></span>
      <span class="ss-dropdown"></span>
      <select name="purpose" id="feedback-purpose">
        <option data-text="Problem" value="problem">Problem</option>
        <option data-text="Suggestion" value="suggestion">Suggestion</option>
        <option data-text="Compliment" value="compliment">Compliment</option>
        <option data-text="Other" value="other">Other</option>
      </select>
    </div>
    <textarea name="comments" id='feedback-comments'></textarea>

    <p class="feedback-errors">
    </p>

    <button class="button lighter-green">
        <span>SUBMIT</span>
        <img src="/images/email-loader.gif" />
    </button>

  </form>

</script>