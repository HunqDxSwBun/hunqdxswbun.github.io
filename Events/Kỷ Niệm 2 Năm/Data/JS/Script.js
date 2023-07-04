$('#Next1').click(function () {
    setTimeout(function () {
      PUBG();
      $('html,body').animate({
        scrollTop: $(".GroupTwo").offset().top
      },
        'slow');
  
    }, 1500);
  });
  
  
  $('#Next2').click(function () {
    Three(); setTimeout(function () {
      $('html,body').animate({
        scrollTop: $(".GroupThree").offset().top
      },
        'slow');
      AirDrop();
  
    }, 100);
  });
  
  $('#Next3').click(function () {
    Four(); setTimeout(function () {
      $('html,body').animate({
        scrollTop: $(".GroupFour").offset().top
      },
        'slow');
    }, 100);
  });
  
  $('#Next4').click(function () {
    Five(); setTimeout(function () {
      $('html,body').animate({
        scrollTop: $(".GroupFive").offset().top
      },
        'slow');
    }, 100);
  });
  
  $('#Next5').click(function () {
    Six(); setTimeout(function () {
      $('html,body').animate({
        scrollTop: $(".GroupSix").offset().top
      },
        'slow');
    }, 100);
  });
  
  $('#Next6').click(function () {
    Seven(); setTimeout(function () {
      $('html,body').animate({
        scrollTop: $(".GroupSeven").offset().top
      },
        'slow');
    }, 100);
  });
  
  $('#imgHunqD').click(function () {
    BlockHunqD(); setTimeout(function () {
      $('html,body').animate({
        scrollTop: $(".GroupHunqD").offset().top
      },
        'slow');
    }, 100);
  });
  
  
  
  function Three() {
    document.getElementById("Three").style.display = 'block';
  
    MusicON(); PUBGoff();
  }
  
  function Four() {
    document.getElementById("Four").style.display = 'block';
  
    document.getElementById("meme1").style.animationPlayState = 'running';
  }
  function Five() {
    document.getElementById("Five").style.display = 'block';
  
    document.getElementById("imgWinner").style.animationPlayState = 'running';
  
  }
  function Six() {
    document.getElementById("Six").style.display = 'block';
  
    document.getElementById("CauNoi").style.animationPlayState = 'running';
  
  }
  
  function Seven() {
    document.getElementById("Seven").style.display = 'block';
  
    DaysLove();
    setTimeout(ContentLove, 1800);
  }
  function BlockHunqD() {
    document.getElementById("BlockHunqD").style.display = 'block';
  }
  window.onscroll = function () { scrollFunction() };
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("navbar").style.top = "10px";
      document.getElementById("iMenu").style.top = "5px";
    } else {
      document.getElementById("navbar").style.top = "-60px";
      document.getElementById("iMenu").style.top = "-60px";
    }
  }
  
  function Menu() {
    var x = document.getElementById("iMenu");
    var music = document.getElementById("MenuMuic");
  
    if (x.style.display === "block") {
      x.style.animation = "Menu2 0.5s";
      music.style.display = "none";
      setTimeout(hide, 400);
      function hide() {
        x.style.display = "none";
  
      }
    } else {
      x.style.display = "block";
      x.style.animation = "Menu 0.5s";
      setTimeout(Show, 500);
      function Show() {
        music.style.display = "block";
      }
    }
  }
  
  
  var string = "Ta đã hoàn thành thành tích 1 năm cùng nhau cố gắng. Và bây giờ hãy cùng nhau xem lại hành trình ta đã vượt qua.";
  var str = string.split("");
  var el = document.getElementById('str');
  (function animate() {
    str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running);
    var running = setTimeout(animate, 80);
  })();
  
  
  function DaysLove() {
    document.getElementById('DayLove').innerText = ' ';
    document.getElementById('ContentLove').innerText = ' ';
    document.getElementById('HunqD').innerText = ' ';
    var string2 = "365 Ngày";
    var str2 = string2.split("");
    var el2 = document.getElementById('DayLove');
    (function animate() {
      str2.length > 0 ? el2.innerHTML += str2.shift() : clearTimeout(running);
      var running = setTimeout(animate, 200);
    })();
  }
  
  function ContentLove() {
  
    var string3 = "Nghĩ lại chuyện tình của 2 đứa trong 1 năm qua cũng đã trải qua nhiều cảm xúc,nhiều kỉ niệm và cũng gặp không ít khó khăn đúng không em, Những lúc ta vui vẻ ta luôn có nhau và cả lúc ta khó khăn ta vẫn cùng nhau vượt qua được đó thôi, Hãy cùng nhau gìn giữ tình yêu này em nhé. Chúc Mừng 1 Năm Bên Nhau.";
    var str3 = string3.split("");
    var el3 = document.getElementById('ContentLove');
    (function animate() {
      str3.length > 0 ? el3.innerHTML += str3.shift() : clearTimeout(running);
      var running = setTimeout(animate, 50);
    })();
    setTimeout(HunqD, 16500);
  
  }
  function HunqD() {
    var stringa = "Đinh Mạnh Hùng";
    var stra = stringa.split("");
    var ela = document.getElementById('HunqD');
    (function animate() {
      stra.length > 0 ? ela.innerHTML += stra.shift() : clearTimeout(running);
      var running = setTimeout(animate, 50);
    })();
    setTimeout(HR, 1000)
  
  }
  
  function HR() {
    document.getElementById('hrVjp').style.display = 'block';
    document.getElementById('hrVjp').style.animationPlayState = 'running';
    setTimeout(iSwBun, 1000);
  }
  function iSwBun() {
    document.getElementById('imgSwBun').style.animationPlayState = 'running';
  
    setTimeout(iHunqD, 1000);
    setTimeout(iVideo, 3000);
  }
  function iHunqD() {
    document.getElementById('imgHunqD').style.animationPlayState = 'running';
  }
  function iVideo() {
    
    document.getElementById('noteVJP').style.display = 'block';
  
    document.getElementById('iVideoVjp').style.animationPlayState = 'running';
  }
  
  
  
  
  
  var vAudio = document.getElementById("myAudio");
  var btnMusic = document.getElementById("btnMusic");
  
  
  function MusicON() {
    var ClassMusic = btnMusic.className;
    if (ClassMusic == 'fa-solid fa-circle-play') {
      btnMusic.className = 'fa-solid fa-circle-pause';
      playAudio();
    } else {
      pauseAudio();
      btnMusic.className = 'fa-solid fa-circle-play';
    }
  }
  
  
  function playAudio() {
    vAudio.play();
  
  }
  
  function pauseAudio() {
    vAudio.pause();
  
  }
  
  
  
  var vPubg = document.getElementById("mySound2");
  
  function PUBG() {
    document.getElementById("Two").style.display = 'block';
  
    vPubg.play();
    vAudio.pause();
  }
  function PUBGoff() {
    vPubg.pause();
  
  }
  
  
  function AirDrop() {
    document.getElementById("mySound2").pause()
    document.getElementById("AirDrop").style.animationPlayState = 'running';
  }
  
  