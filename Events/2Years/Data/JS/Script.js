document.addEventListener('gesturestart', function (event) {
  event.preventDefault(); // Chặn sự kiện zoom
});

var lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  var now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);



var countDownDate = new Date("Jul 15, 2023 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  document.getElementById("Countdown").innerHTML = days + " Ngày " + hours + ":"
  + minutes + ":" + seconds;
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("Countdown").innerHTML = '';
    document.getElementById("NextSlide1").style.display = "block";
  }
}, 1000);


$('#NextSlide1').click(function () {
  $('.Card.Love').show();
  setTimeout(function () {
    $('html,body').animate({
      scrollTop: $(".Card.Love").offset().top
    },
      'slow');
  }, 1500);
  setTimeout(() => {
    $('.Card.Welcome').hide();
    $('video')[1].play();
  }, 2000);
});


$('#Video').click(function () {
$('video')[1].play();
});
