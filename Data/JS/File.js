document.addEventListener('gesturestart', function(event) {
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


function openTAB(evt, TabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  var body = document.querySelector('body');

  if (TabName == "Home") {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
  
  document.getElementById(TabName).style.display = "block";
  evt.currentTarget.className += " active";
}


var Dowloading = document.getElementById("Dowloading");
var RedeemDIV = document.getElementById("Redeem");

function DownloadStory() {
  var BTNDowload = document.getElementById("BTNDowload");
  if (Dowloading.style.display === "block") {
    Dowloading.style.display = "none";
  } else {
    Dowloading.style.display = "block";
    RedeemDIV.style.display = "none";
  }
  BTNDowload.style.display = "none";
 var progressBar = document.getElementById("progressbar");
  var percent = 0;
  var interval = setInterval(function() {
    percent += 1;
    progressBar.style.width = percent + "%";
    if (percent >= 100) {
      
      clearInterval(interval);
      if (percent === 100) {
        setTimeout(() => {
          BTNDowload.style.display = "block";
        }, 2000);
      }
      
    }
  }, 80);
}


function Redeem() {
  if (RedeemDIV.style.display === "block") {
    RedeemDIV.style.display = "none";
  } else {
    RedeemDIV.style.display = "block";
    Dowloading.style.display = "none";
  }
}


var Folderd = document.getElementById("Folder");
var YTB = document.getElementById("YoutubeMp3");

function Folder() {
    if (Folderd.style.display === "block") {
      Folderd.style.display = "none";
    } else {
      Folderd.style.display = "block";
      YTB.style.display = "none";
    }
}

function YoutubeMP3() {
  if (YTB.style.display === "block") {
    YTB.style.display = "none";
  } else {
    YTB.style.display = "block";
    Folderd.style.display = "none";
  }
}

function Copy(x) {
 navigator.clipboard.writeText(x);
  alert('Sao chép thành công');
}

var vReset = 0 ;
function Reset() {
  vReset++;
  if (vReset === 2) {
    alert('Nếu nhấn thêm 1 lần nữa mọi dữ liệu sẽ bị xoá');
  }
  if (vReset === 3) {
    localStorage.clear();
    alert('Đã xoá dữ liệu thành công, trang sẽ tải lại sau 3 giây.');
    setTimeout(() => {
      location.reload()
    }, 3000);
  }
}

var heartContainer = document.getElementById('heartContainer');
var isAnimating = false;

function toggleSize() {
    var heart = document.querySelector('.Heart');
    heart.classList.toggle('large');
}
