// JSON dữ liệu
var events = [
  {
    "SuKien": "Kỉ niệm 900 ngày",
    "Ngay": "01/01",
    "Anh": "/Events/IMG/Kiss.png",
    "Link": "/index.html"
  },
  {
    "SuKien": "Tết Tây",
    "Ngay": "01/01",
    "Anh": "/Events/IMG/HPNY.JPG",
    "Link": "/index.html"
  },
  {
    "SuKien": "Tết Nguyên Đán",
    "Ngay": "09/02",
    "Anh": "/Events/IMG/TetTa.JPG",
    "Link": "/index.html"
  },
  {
    "SuKien": "Valentine",
    "Ngay": "14/02",
    "Anh": "/Events/IMG/Logo.png",
    "Link": "/index.html"
  },
  {
    "SuKien": "Quốc tế phụ nữ",
    "Ngay": "08/03",
    "Anh": "/Events/IMG/8thang3.JPG",
    "Link": "/index.html"
  },
  {
    "SuKien": "Kỉ niệm yêu nhau",
    "Ngay": "15/07",
    "Anh": "/Events/IMG/Kiss.png",
    "Link": "/Events/2Years/"
  },
  {
    "SuKien": "Sinh Nhật Anh Yêu ❤",
    "Ngay": "30/08",
    "Anh": "/Events/IMG/SinhNhat.JPG",
    "Link": "/index.html"
  },
  {
    "SuKien": "Sinh Nhật Em Yêu ❤",
    "Ngay": "19/10",
    "Anh": "/Events/IMG/SinhNhat.JPG",
    "Link": "/index.html"
  },
  {
    "SuKien": "Lễ Chúa giáng sinh",
    "Ngay": "25/12",
    "Anh": "/Events/IMG/Noel.png",
    "Link": "/index.html"
  }
];


// var currentDate = new Date();
var currentDate = new Date();

var currentYear = currentDate.getFullYear();

events.forEach(function (event) {
  var eventDate = new Date(currentYear, parseInt(event.Ngay.split('/')[1]) - 1, parseInt(event.Ngay.split('/')[0]));

  if (eventDate.getDate() === currentDate.getDate() && eventDate.getMonth() === currentDate.getMonth()) {
    // Ngày sự kiện trùng với ngày hiện tại, không cần thay đổi.
  } else if (eventDate.getDate() < currentDate.getDate()) {
    console.log(eventDate.getDate());

  }
  if (eventDate < currentDate) {
    eventDate.setFullYear(eventDate.getFullYear() + 1);
  }
  event['Ngay'] = eventDate;
});

events.sort(function (a, b) {
  var aIsCurrent = a.Ngay <= currentDate;
  var bIsCurrent = b.Ngay <= currentDate;

  if (aIsCurrent && !bIsCurrent) {
    return -1; // Sự kiện a đang diễn ra, đặt lên đầu
  } else if (!aIsCurrent && bIsCurrent) {
    return 1; // Sự kiện b đang diễn ra, đặt lên đầu
  } else {
    return a.Ngay - b.Ngay; // So sánh ngày như bình thường
  }
});

// Tạo các phần tử HTML và cài đặt thuộc tính
var eventContainer = document.createElement("div");
eventContainer.classList.add("Event");

var comingLink = document.createElement("a");
comingLink.href = events[0].Link;

var comingDiv = document.createElement("div");
comingDiv.classList.add("Comming");
comingDiv.id = "Comming";

var comingDiv = document.createElement("div");
comingDiv.classList.add("Comming");
comingDiv.id = "Comming";
comingDiv.style.backgroundImage = "url(" + events[0].Anh + ")";


var headComingDiv = document.createElement("div");
headComingDiv.classList.add("HeadComing");

var h1Element = document.createElement("h1");
h1Element.textContent = events[0].SuKien;

var countdownElement = document.createElement("p");
countdownElement.id = "Countdown";

headComingDiv.appendChild(h1Element);
headComingDiv.appendChild(countdownElement);
comingLink.appendChild(comingDiv);
comingDiv.appendChild(headComingDiv);
eventContainer.appendChild(comingLink);

var countdownInterval = setInterval(updateCountdown, 1000);

function updateCountdown() {
  var currentDate = new Date();
  var eventDate = events[0].Ngay;
  var timeDiff = eventDate.getTime() - currentDate.getTime();

  var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  var minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  var seconds = Math.floor((timeDiff / 1000) % 60);

  if (days >= 1) {
    countdownElement.textContent = days + " Ngày " + hours + ":" + minutes + ":" + seconds;
  } else if (days === 0) {
    countdownElement.textContent = hours + " Giờ " + minutes + " Phút " + seconds + ' Giây';
  } else {
    countdownElement.textContent = 'Đang diễn ra sự kiện';
  }
}


// Thêm sự kiện tiếp theo
for (var i = 1; i < events.length; i++) {
  var upnextDiv = document.createElement("div");
  upnextDiv.classList.add("Upnext");
  upnextDiv.style.backgroundImage = "url(" + events[i].Anh + ")";

  var contentDiv = document.createElement("div");
  contentDiv.classList.add("Content");

  var h1Element = document.createElement("h1");
  h1Element.textContent = events[i].SuKien;

  var pElement = document.createElement("p");
  var eventDate = events[i].Ngay;
  var eventDay = eventDate.getDate();
  var eventMonth = eventDate.getMonth() + 1;
  var eventYear = eventDate.getFullYear();
  pElement.textContent = eventDay + " tháng " + eventMonth + " " + eventYear;

  contentDiv.appendChild(h1Element);
  contentDiv.appendChild(pElement);

  var Countdown = document.createElement("div");
  Countdown.classList.add("Countdown");
  var countdown = document.createElement("h1");

  // Đếm ngày còn lại
  var eventDate = new Date(events[i].Ngay);
  eventDate.setFullYear(currentDate.getFullYear()); // Đặt năm của sự kiện bằng năm hiện tại
  if (eventDate < currentDate) {
    eventDate.setFullYear(currentDate.getFullYear() + 1); // Tăng năm lên 1 nếu sự kiện đã qua
  }

  var timeDiff = eventDate.getTime() - currentDate.getTime();
  var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (days == 0) {
    countdown.textContent = 'Đang Diễn Ra';
  } else {
    countdown.textContent = days + 1;
  }


  Countdown.appendChild(countdown);
  upnextDiv.appendChild(contentDiv);
  upnextDiv.appendChild(Countdown);
  eventContainer.appendChild(upnextDiv);

}

var SuKienSapToi = events[0].SuKien;
var NgaySuKien = events[0].Ngay;
var snowflakes = document.getElementById('snowflakes');

if (SuKienSapToi === 'Sinh Nhật Anh Yêu ❤' || SuKienSapToi === 'Sinh Nhật Em Yêu ❤') {
  snowflakes.innerHTML = `
        <div class="snowflake">🎂</div>
        <div class="snowflake">🎉</div>
        <div class="snowflake">💕</div>
        <div class="snowflake">😋</div>
        <div class="snowflake">🤩</div>
        <div class="snowflake">🍰</div>
        <div class="snowflake">🎁</div>
        <div class="snowflake">💌</div>
        <div class="snowflake">🍬</div>
        <div class="snowflake">💋</div>
        <div class="snowflake">🎈</div>
        <div class="snowflake">💖</div>
  `
} else if (SuKienSapToi === 'Lễ Chúa giáng sinh') {
    snowflakes.innerHTML = `
          <div class="snowflake">❅</div>
          <div class="snowflake">❆</div>
          <div class="snowflake">❅</div>
          <div class="snowflake">❆</div>
          <div class="snowflake">❅</div>
          <div class="snowflake">❆</div>
          <div class="snowflake">❅</div>
          <div class="snowflake">❆</div>
          <div class="snowflake">❅</div>
          <div class="snowflake">❆</div>
          <div class="snowflake">❅</div>
          <div class="snowflake">❆</div>
    `
}else if (SuKienSapToi === 'Kỉ niệm yêu nhau' || SuKienSapToi === 'Kỉ niệm 900 ngày') {
    snowflakes.innerHTML = `
          <div class="snowflake">❤️</div>
          <div class="snowflake">😍</div>
          <div class="snowflake">😘</div>
          <div class="snowflake">💕</div>
          <div class="snowflake">💖</div>
          <div class="snowflake">🥰</div>
          <div class="snowflake">❤️‍🔥</div>
          <div class="snowflake">💞</div>
          <div class="snowflake">🫰</div>
          <div class="snowflake">💋</div>
          <div class="snowflake">💓</div>
          <div class="snowflake">♥️</div>
    `
}else {
  snowflakes.style.display = "none";
}


// Thêm vào phần tử gốc
var rootElement = document.getElementById("root");
rootElement.appendChild(eventContainer);
