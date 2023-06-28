// setTimeout(function () {
//   document.getElementById('loading').classList.add('hidden');
//   setTimeout(() => {
//     document.getElementById('loading').style.display = 'none';
//   }, 1000);
// }, 1000);


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


var prevScrollPos = window.pageYOffset || document.documentElement.scrollTop;
window.addEventListener('scroll', function () {
  var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
  var tab = document.querySelector('.Tab');
  var write = document.querySelector('.write');
  if (prevScrollPos   > currentScrollPos ) {
    tab.classList.remove('Hide');
    write.classList.add('Hide');
  } else {
    tab.classList.add('Hide');
    write.classList.remove('Hide');
  }

  prevScrollPos = currentScrollPos  ;

}); 

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

  if (TabName !== "Story") {
    stopAllVideos();
  }

  document.getElementById(TabName).style.display = "block";
  evt.currentTarget.className += " active";
}


var Dowloading = document.getElementById("Dowloading");
var RedeemDIV = document.getElementById("Redeem");

function DownloadStory() {
  var progressBar = document.getElementById("progressbar");
  var BTNDowload = document.getElementById("BTNDowload");

  var percent = 0;
  progressBar.style.width = percent + "%";

  if (Dowloading.style.display === "block") {
    Dowloading.style.display = "none";
  } else {
    Dowloading.style.display = "block";
    RedeemDIV.style.display = "none";
  }
  BTNDowload.style.display = "none";

  var percent = 0;
  var interval = setInterval(function () {
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

var vReset = 0;
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


var MusicBG = document.getElementById("MusicBG");

function playAudio() {
  MusicBG.play();
}

function pauseAudio() {
  MusicBG.pause();
}

var toggle = 0;
function toggleSize() {
  toggle++
  var heart = document.querySelector('.Heart');
  heart.classList.toggle('large');
  if (toggle == 1) {
    playAudio();
  } else {
    toggle = 0;
    pauseAudio();
  }
}
function stopAllVideos() {
  // Tìm tất cả các phần tử video trên trang
  const videos = document.getElementsByTagName('video');

  // Dừng tất cả các video
  for (let i = 0; i < videos.length; i++) {
    videos[i].pause();
  }
}

var vCoupleChat = document.getElementById('CoupleChat');
var vWho = document.getElementById('Who');
var vChat = document.getElementById('Chat');
var Name = '';

function CoupleChat(who, chat) {
  vCoupleChat.style.display = "block";
  // Kiểm tra là ai và biệt danh hay gọi

  function CheckWho() {
    if (who === "Male") {
      Name = 'Anh Yêu ❤';
      vCoupleChat.style.borderColor = 'var(--Male)';
      vWho.style.color = 'var(--Male)';
    }
    if (who === "Female") {
      Name = 'Em Yêu ❤';
      vCoupleChat.style.borderColor = 'var(--Female)';
      vWho.style.color = 'var(--Female)';
    }
  }
  CheckWho();

  if (chat === undefined) {
    // Lấy dữ liệu JSON từ đường dẫn
    fetch('Data/Chat/Chat.json')
      .then(response => response.json())
      .then(jsonData => {
        // Tìm dữ liệu phù hợp trong JSON
        var matchingData = jsonData.filter(function (data) {
          return data.Who === who;
        });

        if (matchingData.length > 0) {
          var randomIndex = Math.floor(Math.random() * matchingData.length);
          var data = matchingData[randomIndex];

          setTimeout(function () {
            CheckWho();
            vWho.innerText = (who === "Male") ? 'Anh Yêu ❤' : 'Em Yêu ❤';
            vChat.innerText = data.Say;
            setTimeout(function () {
              vWho.innerText = (who === "Male") ? 'Em Yêu ❤' : 'Anh Yêu ❤';
              CheckWho2();
              console.log(who);
              vChat.innerText = data.Rep;
              setTimeout(function () {
                vCoupleChat.style.display = "none";
              }, parseInt(data.tRep));
            }, parseInt(data.tSay));
          }, 0);
        } else {
          vCoupleChat.style.display = "none";
        }
      })
      .catch(error => {
        console.error('Error fetching JSON:', error);
        vCoupleChat.style.display = "none";
      });
  } else {
    vWho.innerText = Name;
    vChat.innerText = chat;
  }

}

function CheckWho2() {
  if (vWho.innerText === 'Anh Yêu ❤') {
    vCoupleChat.style.borderColor = 'var(--Male)';
    vWho.style.color = 'var(--Male)';
  } else {
    vCoupleChat.style.borderColor = 'var(--Female)';
    vWho.style.color = 'var(--Female)';
  }

}

function HideInfo() {
  document.getElementById('Currency').innerHTML = '';
}



// var Account = document.getElementById("Account");
var vSecurity = document.getElementById("Security");

function Security() {
  if (vSecurity.style.display === "block") {
    vSecurity.style.display = "none";
  } else {
    vSecurity.style.display = "block";
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

var vCustomPIC = document.getElementById("CustomPIC");

function CustomPIC() {
  if (vCustomPIC.style.display === "block") {
    vCustomPIC.style.display = "none";
  } else {
    vCustomPIC.style.display = "block";
  }
}

