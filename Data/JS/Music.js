
function PhatNhac(TenBaiHat) {
    // Lấy đối tượng audio
    var audio = document.getElementById('myAudioRelax');
    var NameSong = document.getElementById('NameSong');
    var IMGMusic = document.getElementById('IMGMusic');
    var button = document.getElementById("MusicButton");

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/MusicRelax/MusicList.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var musicList = JSON.parse(xhr.responseText);
            // Gọi hàm xử lý dữ liệu trong musicList
            processMusicList(musicList);
        }
    };
    xhr.send();

    function processMusicList(musicList) {
        // Tiếp tục xử lý dữ liệu trong musicList
        var src = '';
        for (var i = 0; i < musicList.length; i++) {
            if (musicList[i].TenBaiHat === TenBaiHat) {
                src = musicList[i].Src;
                NameSong.innerText = musicList[i].Ten;
                IMGMusic.style.backgroundImage = "url(" + musicList[i].SrcIMG + ")";
                break;
            }
        }

        // Cập nhật nguồn audio
        audio.src = src;

        // Bật hoặc tắt audio
        if (src !== '') {
            button.click();
            PauseMusic();
            IMGMusic.classList.add('rotate');
        } else {
            audio.pause();
            IMGMusic.classList.remove('rotate');
        }
    }
   
}

fetch('/MusicRelax/MusicList.json')
      .then(response => response.json())
      .then(data => {
        var songs = data;

        // Tạo nút nhấn dựa trên dữ liệu
        var buttonContainer = document.getElementById("ListMusic");

        for (var i = 0; i < songs.length; i++) {
          var song = songs[i];
          var button = document.createElement("button");
          button.textContent = song.Ten;
          button.setAttribute("onclick", "PhatNhac('" + song.TenBaiHat + "')");
          buttonContainer.appendChild(button);
        }
      })
      .catch(error => {
        console.log("Lỗi khi tải dữ liệu:", error);
      });


var audio = document.getElementById('myAudioRelax');

function backwardTenSeconds() {
    audio.currentTime -= 10;
    return;
}

function forwardTenSeconds() {
    audio.currentTime += 10;
    return;
}

function PauseMusic() {
    var IMGMusic = document.getElementById('IMGMusic');
    var BtnPause = document.getElementById('BtnPause');
    var audio = document.querySelector('#myAudioRelax');

    if (audio.paused) {
        audio.play();
        TimeSong();
        IMGMusic.classList.add('rotate');
        BtnPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        audio.pause();
        BtnPause.innerHTML = '<i class="fa-solid fa-play"></i>';
        IMGMusic.classList.remove('rotate');
    }
}

function TimeSong() {
    audio.addEventListener('timeupdate', function () {
        // Lấy số thời gian hiện tại của bài hát
        var currentTime = audio.currentTime;

        // Chuyển đổi số thời gian thành định dạng giờ:phút:giây
        var hours = Math.floor(currentTime / 60 / 60);
        var minutes = Math.floor(currentTime / 60);
        var seconds = Math.floor(currentTime % 60);
        if (hours > 0) {
            var formattedTime = hours + ':' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        } else {
            var formattedTime = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }

        // Hiển thị số thời gian hiện tại
        document.getElementById('TimeSong').innerText = formattedTime;
    });
}



function Time() {
    // Lấy thẻ audio từ HTML
    var currentTime = new Date().getMinutes();
    var currentTimes = new Date().getSeconds();
    var currentSeconds = currentTime * 60;
    audio.currentTime = currentSeconds + currentTimes;
    TimeSong();
}

window.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("MusicButton");
    var buttonState = localStorage.getItem("buttonState");

    if (buttonState === "true") {
        button.classList.add("active");
        Time();
    }

    button.addEventListener("click", function () {
        button.classList.toggle("active");

        if (button.classList.contains("active")) {
            localStorage.setItem("buttonState", true);
            Time();
        } else {
            localStorage.setItem("buttonState", false);
            // Dừng âm thanh
            audio.currentTime = 0;
        }
    });
});


var audio = document.getElementById("myAudioRelax");
var loopButton = document.getElementById("loopButton");

loopButton.addEventListener("click", function() {
  audio.loop = !audio.loop;
  loopButton.classList.toggle("active");
});
