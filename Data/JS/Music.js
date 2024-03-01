// Danh sách các album và thông tin của từng album
// const albums = [
//   { name: '🔥 Nghe Nhiều', dataAlbum: "HOT" },
//   { name: "Âu Mỹ", dataAlbum: "USUK" },
//   { name: "🇻🇳 Việt Nam", dataAlbum: "NhacViet" },
//   { name: "❤ Yêu Xa", dataAlbum: "TinhYeuXa" },
//   { name: "Bích Phương", dataAlbum: "BichPhuong" },
//   { name: "Binaural Beats", dataAlbum: "Binaural" },
//   { name: "Remix", dataAlbum: "Remix" },
//   { name: "EDM", dataAlbum: "EDM" },
//   { name: "US UK Mix", dataAlbum: "USUKMix" },
//   { name: "Chill", dataAlbum: "Chill" },
//   // Thêm các album khác vào đây nếu cần
// ];

const albums = [
  { name: "RADIO 1507", dataAlbum: "FM1507" },
  { name: 'Nhạc Việt Lossless', dataAlbum: "Lossless" },
  { name: "Remix", dataAlbum: "Remix" },
  // { name: "EDM", dataAlbum: "EDM" },
  // Thêm các album khác vào đây nếu cần
];



// Lấy đối tượng div "Album" để tiến hành thêm nút
const albumContainer = document.getElementById("albumContainer");

// Tạo và thêm các nút album vào div "Album"
albums.forEach((album, index) => { // Thêm tham số index vào forEach
  const button = document.createElement("button");
  button.innerHTML = album.name;
  button.classList.add("album-btn");
  button.setAttribute("data-album", album.dataAlbum);

  if (index === 0) {
    button.classList.add("active");
  }

  // Thêm sự kiện click cho mỗi nút album
  button.addEventListener("click", () => {
    const activeButton = document.querySelector(".album-btn.active");

    // Loại bỏ lớp .active từ nút album đang có
    if (activeButton) {
      activeButton.classList.remove("active");
    }

    // Thêm lớp .active cho nút album vừa được nhấp vào
    button.classList.add("active");

    // Xử lý khi người dùng nhấn vào nút album (thay thế thành logic xử lý của bạn)
    // console.log(`Bạn đã chọn album: ${album.name}`);
  });

  albumContainer.appendChild(button);

});


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "HunqD_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = new Audio();
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const albumButtons = $$(".album-btn");
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  songs: [],

  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },

  loadSongs: function (songs) {
    this.songs = songs;
  },

  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
          <div class="thumb" style="background-image: url('${song.image}')"></div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option" >
            <a href="${song.path}" download>
            <i class="fa-regular fa-circle-down"></i>
            </a>
          </div>
        </div>
      `;
    });
    playlist.innerHTML = htmls.join("");
  },

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },

  handleEvents: function () {
    const _this = this;
    var x = document.getElementById("myAudio");
    // Xử lý khi click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
        x.pause();
      }
    };

    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
    };

    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
    };

    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
        progress.value = progressPercent;
      }
      const thoiGianDaChuyenDoi = chuyenDoiThoiGian(audio.currentTime);
      document.getElementById('SeekTimeOnload').innerText = thoiGianDaChuyenDoi;
    };

    progress.onchange = function (e) {
      liveOFF();
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;

    };

    function chuyenDoiThoiGian(gio) {
      const gioInt = Math.floor(gio / 3600);
      const phutInt = Math.floor((gio % 3600) / 60);
      const giayInt = Math.floor(gio % 60);

      if (gioInt > 0) {
        return `${gioInt}:${phutInt.toString().padStart(2, '0')}:${giayInt.toString().padStart(2, '0')}`;
      } else {
        return `${phutInt}:${giayInt.toString().padStart(2, '0')}`;
      }
    }

    nextBtn.onclick = function () {
      liveOFF();
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    prevBtn.onclick = function () {
      liveOFF();
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest(".option")) {
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          audio.play();
          _this.render();
          audio.play();
          liveOFF();
        }
      }
    };

    albumButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const albumName = this.dataset.album;
        _this.changeAlbum(albumName);
      });
    });
  },

  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 300);
  },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.currentSong.name,
        artist: this.currentSong.singer,
        album: 'HunqDSwBun',
        artwork: [
          { src: this.currentSong.image, sizes: '96x96', type: 'image/png' },
          { src: this.currentSong.image, sizes: '128x128', type: 'image/png' },
          { src: this.currentSong.image, sizes: '192x192', type: 'image/png' },
          { src: this.currentSong.image, sizes: '256x256', type: 'image/png' },
          { src: this.currentSong.image, sizes: '384x384', type: 'image/png' },
          { src: this.currentSong.image, sizes: '512x512', type: 'image/png' },
          { src: this.currentSong.image, sizes: '600x600', type: 'image/png' },
        ]
      });
    };

  },


  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },

  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  changeAlbum: function (albumName) {
    albumButtons.forEach((button) => {
      button.classList.remove("active");
      if (button.dataset.album === albumName) {
        button.classList.add("active");
      }
    });

    fetch(`/Music/${albumName}.json`)
      .then((response) => response.json())
      .then((data) => {
        liveOFF();
        this.loadSongs(data);
        this.currentIndex = 0;
        this.loadCurrentSong();
        this.render();
        audio.play();
      })
      .catch((error) => {
        console.log("An error occurred while fetching the JSON file:", error);
      });
  },

  start: function () {
    const _this = this;

    this.config = JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {};
    this.currentIndex = this.config.currentIndex || 0;
    this.isRandom = this.config.isRandom || false;
    this.isRepeat = this.config.isRepeat || false;

    albumButtons.forEach((button) => {
      const albumName = button.dataset.album;
      if (albumName === this.config.currentAlbum) {
        button.classList.add("active");
      }
    });

    fetch(`/Music/${this.config.currentAlbum || "FM1507"}.json`)
      .then((response) => response.json())
      .then((data) => {
        _this.loadSongs(data);
        _this.loadConfig();
        _this.defineProperties();
        _this.handleEvents();
        _this.loadCurrentSong();
        _this.render();
      })
      .catch((error) => {
        console.log("An error occurred while fetching the JSON file:", error);
      });
  }
};

app.start();


function liveAUDIO() {
  var timeAudio = audio.duration;
  var hours = Math.floor(timeAudio / 3600);
  var minutes = Math.floor((timeAudio % 3600) / 60);

  var currentDate = new Date();
  // Lấy phút hiện tại
  var currentMinute = currentDate.getMinutes();
  // Lấy giây hiện tại
  var currentSecond = currentDate.getSeconds();

  var button = document.querySelector(".LiveBTN");
  var isActive = button.classList.contains("active");
  var LiveNoti = document.querySelector("#LiveNoti");

  const selectedLang = localStorage.getItem("selectedLang");
  if (selectedLang == 'vietnamese') { 
    if (hours >= 1 || minutes >= 59) {
      audio.currentTime = (currentMinute * 60) + currentSecond;
      LiveNoti.innerHTML = '<i class="fa-solid fa-circle"></i> Đang phát trực tiếp';
      if (isActive) {
        button.classList.remove("active");
        audio.currentTime = 0;
        LiveNoti.innerHTML = '<i class="fa-solid fa-circle"></i> Trực tiếp';
      } else {
        button.classList.add("active");
      }
    } else {
      LiveNoti.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Không thể phát trực tiếp';
    }
  }
  else {
    if (hours >= 1 || minutes >= 59) {
      audio.currentTime = (currentMinute * 60) + currentSecond;
      LiveNoti.innerHTML = '<i class="fa-solid fa-circle"></i> ライブストリーム';
      if (isActive) {
        button.classList.remove("active");
        audio.currentTime = 0;
        LiveNoti.innerHTML = '<i class="fa-solid fa-circle"></i> 直接';
      } else {
        button.classList.add("active");
      }
    } else {
      LiveNoti.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ライブ配信ができない';
    }
  }

 

}


function liveOFF() {
  var button = document.querySelector(".LiveBTN");
  var LiveNoti = document.querySelector("#LiveNoti");

  button.classList.remove("active");
  LiveNoti.innerHTML = '<i class="fa-solid fa-circle"></i> Trực tiếp';
}

function handlePlayTrack() {
  playBtn.onclick();
}
function handlePauseTrack() {
  playBtn.onclick();
}

function handleBackward() {
  audio.currentTime -= 10
}
function handleForward() {
  audio.currentTime += 10
}

function handlePreTrack() {
  prevBtn.onclick();
}
function handleNextTrack() {
  nextBtn.onclick();
}

navigator.mediaSession.setActionHandler('play', handlePlayTrack);
navigator.mediaSession.setActionHandler('pause', handlePauseTrack);
navigator.mediaSession.setActionHandler('previoustrack', handlePreTrack);
navigator.mediaSession.setActionHandler('nexttrack', handleNextTrack);



// Sau đó, bạn có thể sử dụng media session API để xử lý seek to như sau:
// navigator.mediaSession.setActionHandler('seekto', (details) => {
//   const { seekTime } = details;
//   console.log(`SeekTime` + details)
//   // Xử lý seek to ở thời gian seekTime
// });

function SeekTimeOnload() {
  var inputText = prompt("Nhập tiếng và phút (hh:mm):");

  if (inputText !== null) {
    var parts = inputText.split(':');
    if (parts.length === 2) {
      var hours = parseInt(parts[0], 10);
      var minutes = parseInt(parts[1], 10);

      if (!isNaN(hours) && !isNaN(minutes)) {
        audio.currentTime = (hours * 3600) + (minutes * 60);
        console.log("Giờ: " + hours + ", Phút: " + minutes);
      } else {
        alert("Nhập không hợp lệ. Vui lòng nhập giờ và phút dưới dạng hh:mm.");
      }
    } else {
      alert("Nhập không hợp lệ. Vui lòng nhập giờ và phút dưới dạng hh:mm.");
    }
  } else {
    alert("Bạn đã hủy nhập liệu.");
  }
}
