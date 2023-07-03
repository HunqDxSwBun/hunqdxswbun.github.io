// JSON dữ liệu
var events = [
  {
    "SuKien": "Tết Tây",
    "Ngay": "01/01",
    "Anh": "/Events/Logo.png"
  },
  {
    "SuKien": "Tết Nguyên Đán",
    "Ngay": "09/02",
    "Anh": "/Events/Logo.png"
  },
  {
    "SuKien": "Valentine",
    "Ngay": "14/02",
    "Anh": "/Events/Logo.png"
  },
  {
    "SuKien": "Phụ nữ việt nam",
    "Ngay": "08/03",
    "Anh": "/Events/Logo.png"
  },
  {
    "SuKien": "Kỉ niệm 2 năm yêu nhau",
    "Ngay": "15/07",
    "Anh": "/Events/Kiss.png"
  },
  {
    "SuKien": "Sinh Nhật Anh Yêu ❤",
    "Ngay": "30/08",
    "Anh": "/Events/SinhNhat.png"
  },
  {
    "SuKien": "Sinh Nhật Em Yêu ❤",
    "Ngay": "19/10",
    "Anh": "/Events/SinhNhat.png"
  },
  {
    "SuKien": "Noel",
    "Ngay": "25/12",
    "Anh": "/Events/Noel.png"
  }
];

// Kiểm tra và sắp xếp sự kiện
var currentDate = new Date();
var currentYear = currentDate.getFullYear();

events.forEach(function(event) {
  var eventDate = new Date(currentYear, parseInt(event.Ngay.split('/')[1]) - 1, parseInt(event.Ngay.split('/')[0]));
  
  if (eventDate < currentDate) {
    eventDate.setFullYear(eventDate.getFullYear() + 1);
  }
  
  event['Ngay'] = eventDate;
});

events.sort(function(a, b) {
  return a.Ngay - b.Ngay;
});

// Tạo các phần tử HTML và cài đặt thuộc tính
var eventContainer = document.createElement("div");
eventContainer.classList.add("Event");

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
comingDiv.appendChild(headComingDiv);
eventContainer.appendChild(comingDiv);

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
    countdownElement.textContent = days + " ngày " + hours + ":" + minutes + ":" + seconds;
  } else if (days === 0) {
    countdownElement.textContent =  hours + ":" + minutes + ":" + seconds;
  } else {
    countdownElement.textContent = 'Đang diễn ra sự kiện';
  }
}


// Thêm sự kiện tiếp theo
for (var i = 1; i < events.length; i++) {
  var upnextDiv = document.createElement("div");
  upnextDiv.classList.add("Upnext");

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

  var imgDiv = document.createElement("div");
  imgDiv.classList.add("IMG");

  var imgElement = document.createElement("img");
  imgElement.src = events[i].Anh;
  imgElement.alt = "";

  imgDiv.appendChild(imgElement);
  upnextDiv.appendChild(contentDiv);
  upnextDiv.appendChild(imgDiv);
  eventContainer.appendChild(upnextDiv);
}

// Thêm vào phần tử gốc
var rootElement = document.getElementById("root");
rootElement.appendChild(eventContainer);
