// chế độ màu nền //
 
 function mode1() {
    var element = document.body;
   element.classList.toggle("mode-1");
 }

 function nenxanh() {
  onclick=rMode();
  var element = document.body;
 element.classList.toggle("CL-nenxanh");
}

function nendo() {
  onclick=rMode();
  var element = document.body;
 element.classList.toggle("CL-nendo");
}

function nenvang() {
  onclick=rMode();
  var element = document.body;
 element.classList.toggle("CL-nenvang");
}

function khungden() {
  onclick=rMode2();
  var element = document.body;
 element.classList.toggle("CL-khungden");
}

function khungtrang() {
  onclick=rMode2();
  var element = document.body;
 element.classList.toggle("CL-khungtrang");
}

 
 function rMode() {
   var element = document.body;
   element.classList.remove("CL-nenxanh");element.classList.remove("CL-nendo");element.classList.remove("CL-nenvang");
}

function rMode2() {
  var element = document.body;
  element.classList.remove("CL-khungtrang");element.classList.remove("CL-khungden");
}
// chế độ màu nền //

// Mở Menu chính  - và Menu phụ //
      function onMenuAll() {
        onMenu();
        onMenu2();
      }
      // Mở menu chính //
      function onMenu() {
        var x = document.getElementById("myLinks");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
      }


      // Mở tiềm kiếm //
      function onSearch() {
        onclick=offColor();offFont();
        var x = document.getElementById("IDsearch");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
      }

      // Mở tùy chỉnh font //
      function onFont() {
        onclick=offSearch();offColor();
        var x = document.getElementById("IDfont");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
      }
      // Mở tùy chỉnh màu //
      
      function onColor() {
        onclick=offSearch();offFont();
        var x = document.getElementById("IDcolor");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
      }

      // Block Đếm ngày yêu //
      function onMenu2() {
        var x = document.getElementById("dayslove");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
      }
      
 // Mở Menu chính  - và Menu phụ //


// Tắt Tiềm kiếm và Tùy Chỉnh //
  function offALL() {
    offSearch();
    offFont();
    offColor();
  }

 function offSearch() {
   var x = document.getElementById("IDsearch");
   if (x.style.display === "none") {
     x.style.display = "none";
   } else {
     x.style.display = "none";
   }
 }

 function offFont() {
  var x = document.getElementById("IDfont");
  if (x.style.display === "none") {
    x.style.display = "none";
  } else {
    x.style.display = "none";
  }
}

function offColor() {
  var x = document.getElementById("IDcolor");
  if (x.style.display === "none") {
    x.style.display = "none";
  } else {
    x.style.display = "none";
  }
}

// Tắt Tiềm kiếm và Tùy Chỉnh //



 window.onload = function() {
   // Tháng Ngày, Năm giờ:phút:giây, ID muốn hiển thị 
   countUpFromTime("July 15, 2021 00:00:00", 'countup1'); // ****** Change this line!
 };
 function countUpFromTime(countFrom, id) {
   countFrom = new Date(countFrom).getTime();
   var now = new Date(),
       countFrom = new Date(countFrom),
       timeDifference = (now - countFrom);
     
   var secondsInADay = 60 * 60 * 1000 * 24,
       secondsInAHour = 60 * 60 * 1000;

   days = Math.floor(timeDifference / (secondsInADay) * 1);
   hours = Math.floor((timeDifference % (secondsInADay)) / (secondsInAHour) * 1);
   mins = Math.floor(((timeDifference % (secondsInADay)) % (secondsInAHour)) / (60 * 1000) * 1);
   secs = Math.floor((((timeDifference % (secondsInADay)) % (secondsInAHour)) % (60 * 1000)) / 1000 * 1);
 
   var idEl = document.getElementById(id);
   idEl.getElementsByClassName('days')[0].innerHTML = days;
   idEl.getElementsByClassName('hours')[0].innerHTML = hours;
   idEl.getElementsByClassName('minutes')[0].innerHTML = mins;
   idEl.getElementsByClassName('seconds')[0].innerHTML = secs;
 
   clearTimeout(countUpFromTime.interval);
   countUpFromTime.interval = setTimeout(function(){ countUpFromTime(countFrom, id); }, 1000);
 }


 var p_var=14;

 function FontSizeA() {
  p_var--;
  var s=document.getElementsByTagName('p');
  for(i=0;i<s.length;i++)
  {
      s[i].setAttribute("style","font-size:"+p_var+"px");
  }
}

function FontSizeB() {
  var p_var=14;
  var s=document.getElementsByTagName('p');
  for(i=0;i<s.length;i++)
  {
      s[i].setAttribute("style","font-size:"+p_var+"px");
  }
}

function FontSizeC() {
  p_var++;
  
  var s=document.getElementsByTagName('p');
  for(i=0;i<s.length;i++)
  {
      s[i].setAttribute("style","font-size:"+p_var+"px");
  }
}



 function FontA(){
  var element = document.getElementById("fontchu");
  element.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
}

function FontB(){
  var element = document.getElementById("fontchu");
  element.style.fontFamily = "monospace";
}

function FontC(){
  var element = document.getElementById("fontchu");
  element.style.fontFamily = "fonttinhyeu";
}
 


