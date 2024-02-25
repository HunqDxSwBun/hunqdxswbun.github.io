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

function openTAB(evt, TabName) {
    var tabcontent = document.getElementsByClassName("tabcontent");
    var tablinks = document.getElementsByClassName("tablinks");
    var body = document.querySelector('body');

    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    if (TabName == "Home") {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "auto";
    }

    if (TabName !== "Story") {
        stopAllVideos();
    }

    var currentTab = document.getElementById(TabName);
    currentTab.style.display = "block";
    evt.currentTarget.classList.add("active");
}

function stopAllVideos() {
    var videos = document.getElementsByTagName('video');
    for (var i = 0; i < videos.length; i++) {
        videos[i].pause();
    }
}

var timeoutId;

function Menu() {
    var x = document.getElementById("iMenu");
    var navbar = document.getElementById("navbar");

    if (x.style.bottom === "10px") {
        x.style.bottom = "-100px";
        navbar.style.bottom = "15px";
    } else {
        x.style.bottom = "10px";
        navbar.style.bottom = "80px";
    }

    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(function () {
        x.style.bottom = "-100px";
        navbar.style.bottom = "15px";
        timeoutId = null;
    }, 3000);
}

function cancelMenuClose() {
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
}

function startMenuCloseTimer() {
    if (!timeoutId) {
        timeoutId = setTimeout(function () {
            var x = document.getElementById("iMenu");
            var navbar = document.getElementById("navbar");
            x.style.bottom = "-100px";
            navbar.style.bottom = "15px";
            timeoutId = null;
        }, 3000);
    }
}

function handleImageError() {
    this.src = "./Data/icon/Logo2.png";
    this.removeEventListener('error', handleImageError);
}

function CheckIMG() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        images[i].addEventListener('error', handleImageError);
    }
}

window.addEventListener('DOMContentLoaded', CheckIMG);



function Done(T1, T2) {
    Swal.fire(
        T1,
        T2,
        'success'
    )
}

function Fail(T1, T2) {
    Swal.fire(
        T1,
        T2,
        'error'
    )
}
function Warning(T1, T2) {
    Swal.fire(
        T1,
        T2,
        'warning'
    )
}
function Info(T1, T2) {
    Swal.fire(
        T1,
        T2,
        'info'
    )
}


function toggleMusic() {
    var x = document.getElementById("myAudio");
    var tablinks = document.getElementById("toggleMusic");

    var currentTime = new Date();
    var startMinute = currentTime.getMinutes();
    var startSecond = currentTime.getSeconds();
    x.currentTime = startMinute * 60 + startSecond;

    if (x.paused == false) {
        tablinks.classList.remove('MUSIC');
        x.pause();
    } else {
        tablinks.classList.add('MUSIC');
        x.play();
    }
}


function padNumber(num, length) {
    var r = num.toString();
    while (r.length < length) {
        r = '0' + r;
    }
    return r;
}
function updateClock() {
    const selectedLang = localStorage.getItem("selectedLang");

    var now = new Date();
    var sec = now.getSeconds(),
        min = now.getMinutes(),
        hou = now.getHours(),
        mo = now.getMonth() + 1,
        dy = now.getDate(),
        yr = now.getFullYear();

    // Lấy tên của ngày trong tuần
    if (selectedLang == 'vietnamese') { 
        var dayOfWeek = now.toLocaleDateString('vi-VN', { weekday: 'long' });

    }
    else {
        var dayOfWeek = now.toLocaleDateString('ja-JP', { weekday: 'long' });

    }

    var months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    var tags = ["mon", "d", "y", "h", "m", "dayOfWeek"];
    var corr = [months[mo - 1], dy, yr, padNumber(hou, 2), padNumber(min, 2), dayOfWeek];

    for (var i = 0; i < tags.length; i++) {
        var element = document.getElementById(tags[i]);
        if (element) {
            if (tags[i] === "dayOfWeek") {
                element.textContent = corr[i]; // Sử dụng textContent để cập nhật nội dung
            } else {
                element.firstChild.nodeValue = corr[i];
            }
        } else {
            console.error("Element with id '" + tags[i] + "' not found.");
        }
    }

}

function initClock() {
    updateClock();
    window.setInterval(updateClock, 1000);
}

initClock();

var DaysLove = document.getElementById("DaysLove");
var click = 0;
DaysLove.addEventListener('click', function () {
    var body = document.querySelector('body');
    var Secs = document.getElementById('Secs');

    click++;
    if (click === 1) {
        body.style.opacity = 1;
        Secs.style.display = 'block';
    } else if (click === 2) {
        Secs.style.display = 'none';
        body.style.opacity = 0.5;
    } else {
        body.style.opacity = 0.05;
        click = 0;
    }

});

function Oled() {
    var body = document.querySelector('body');
    body.classList.toggle('oled-mode');
}