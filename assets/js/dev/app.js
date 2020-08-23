$(document).ready(function() {
    $('.gvr-navbar>ul>li').click(function(e){
        e.preventDefault();
      $(this).find('.submenu').toggle();
    });
});
