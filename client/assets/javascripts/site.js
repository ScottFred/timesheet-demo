"use strict";

function onWindowResize() {
    var navHeight = $('body > header > nav').height();
    var navMargin = 20;
    var footerHeight = $('body > footer').height();
    var footerMargin = 100;
    var h = $(window).height();
    $('main').css("min-height", h - navHeight - navMargin - footerHeight - footerMargin);
}

$(function() {
    $(window).resize(onWindowResize);
    $('footer').show();
    $('.navbar-collapse a:not(.dropdown-toggle)').click(function(){
        $(this).parents('.navbar-collapse').collapse('hide');
    });
});

onWindowResize();
