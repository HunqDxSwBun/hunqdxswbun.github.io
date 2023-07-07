$('#Next1').click(function () {
  setTimeout(function () {
    $('html,body').animate({
      scrollTop: $(".Card.Two").offset().top
    },
      'slow');
    // Play video in .Card Two
  }, 1500);
  setTimeout(() => {
    $('.Card.Two video')[0].play();
  }, 2000);
});
