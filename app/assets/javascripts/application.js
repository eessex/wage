// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets
//= require underscore
//= require react
//= require react_ujs
//= require ./vendor/jquery.ui.widget
//= require ./vendor/jquery.fileupload
//= require components


$(function() {
  $('.notice').delay(3500).fadeOut();
  $('.notices').delay(3500).fadeOut();
  $('.alert').delay(3500).fadeOut();

  //nav main menu icon
  $(document).click(function(e) {
    $('.dropdown .fa-close').toggleClass('fa-close').toggleClass('fa-bars')
  })

  $('.fa-bars, .fa-close').click(function(e){
  	$(e.target).toggleClass('fa-bars').toggleClass('fa-close')
  })

  //dashboard menu has border
  if ($('.dashboard')) {
    $('body:not(#site-guidelines) .navbar-fixed-top').css('border-bottom', '2px solid')
  }

  //scroll down on guidelines page
  $('.intro.one').click(function(e) {
  	var height = $(window).height()
  	 $('html, body').animate({scrollTop: height}, 1000)
  })

  // $('.dashboard .collapse .collapse__title').click(function(e) {
  //   $('.container').removeClass('active')
  //   var active = $(e.target).closest('.collapse').addClass('active')
  //   $('.container:not(.active)').find('.collapse__content').slideUp()
  //   $('.container').find('.collapse__title .fa').addClass('fa-plus').removeClass('fa-minus')
  //   if ($(active).find('.collapse__content').css('display') == 'block') {
  //     $(active).find('.collapse__content').slideUp()
  //     $(active).find('.collapse__title .fa').addClass('fa-plus').removeClass('fa-minus')
  //     $(active).removeClass('active')
  //   } else {
  //     $(active).find('.collapse__content').slideDown()
  //     $(active).find('.collapse__title .fa').removeClass('fa-plus').addClass('fa-minus')
  //   }
  // })

  // fee schedule header bar is sticky
  $(window).scroll(function(){
    if ($(window).scrollTop() > 150) {
      $('.certification-view .fee-category.header').addClass('active')
    } else {
      $('.certification-view  .fee-category.header').removeClass('active')
    }
  })

});
