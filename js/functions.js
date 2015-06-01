
$( document ).ready(function() {

  if (matchMedia) {
    var mq = window.matchMedia("(min-width: 650px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

  var menuVisible = false;

  function WidthChange(mq) {
  if (mq.matches) {
    if (menuVisible) {
      $('#links').css({'display':'none'});
      menuVisible = false;
    }
    $('#links').removeClass("mobile-menu").addClass("inline-menu");
    $('#links').removeAttr('style')
    $('#menu-icon').css({'display':'none'});
  }
  else {
    $('#menu-icon').css({'display':'inline'});
    $('#links').css({'display':'none'})
    $('#links').removeClass("inline-menu").addClass("mobile-menu");
  }
  }

  $(function() {
    $('#menu-icon').click(function() {
      if (menuVisible) {
        $('#links').css({'display':'none'});
        menuVisible = false;
        return;
      }
      $('#links').css({'display':'block'});
      menuVisible = true;
    });
    $('#links').click(function() {
      $(this).css({'display':'none'});
      menuVisible = false;
    });
  });


});