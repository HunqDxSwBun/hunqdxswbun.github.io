OnLOAD();
function OnLOAD() {
    countUpFromTime("July 15, 2021 00:00:00", 'DaysLove'); // ****** Change this line!
}

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
    countUpFromTime.interval = setTimeout(function () { countUpFromTime(countFrom, id); }, 1000);
}

const dataMemory = [
    {
        date: "Jan 1",
        title: "Tết Tây",
        subtitles: "tết đầu năm lịch dương",
        color: "",
        Bcolor: "",
        background: ""
    },
    {
        date: "Tháng 1 đến giữa tháng 2",
        title: "Tết Ta (Tết Nguyên Đán)",
        subtitles: "tết đầu năm lịch âm",
        color: "",
        Bcolor: "",
        background: ""
    },
    {
        date: "Feb 14",
        title: "Valentine",
        subtitles: "",
        color: "",
        Bcolor: "",
        background: ""
    },
    {
        date: "Mar 8",
        title: "Quốc tế phụ nữ",
        subtitles: "",
        color: "",
        Bcolor: "",
        background: "https://static.vecteezy.com/system/resources/previews/018/845/714/original/international-women-day-poster-with-abstract-women-silhouette-illustration-free-vector.jpg"
    },
    {
        date: "Jun 1",
        title: "Quốc tế thiếu nhi",
        subtitles: "vjp",
        color: "",
        Bcolor: "",
        background: "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2021/11/pjimage-38-1636786559.jpg"
    },
    {
        date: "Jul 15",
        title: "Kỉ niệm yêu nhau",
        subtitles: "",
        color: "",
        Bcolor: "",
        background: ""
    },
    {
        date: "Aug 30",
        title: "Sinh nhật anh yêu 💖",
        subtitles: "",
        color: "",
        Bcolor: "",
        background: ""
    },
    {
        date: "Oct 10",
        title: "Sinh nhật em yêu 💖",
        subtitles: "",
        color: "",
        Bcolor: "",
        background: ""
    },
    {
        date: "Dec 25",
        title: "Noel",
        subtitles: "",
        color: "",
        Bcolor: "",
        background: ""
    }
];




const today = new Date();
let closestEvent = null;
let closestDistance = Infinity;

for (let i = 0; i < dataMemory.length; i++) {
    const eventDate = new Date(today.getFullYear() + ' ' + dataMemory[i].date);
    const distance = eventDate - today;
    if (distance >= 0 && distance < closestDistance) {
        closestEvent = dataMemory[i];
        closestDistance = distance;
    }
}

if (closestEvent !== null) {
    const daysLeft = Math.ceil(closestDistance / (1000 * 60 * 60 * 24));
    const upcomingEventsDiv = document.getElementById('upcoming-events');
    const title = closestEvent.title;
    const subtitle = closestEvent.subtitles;
    const color = closestEvent.color;
    const Bcolor = closestEvent.Bcolor;
    upcomingEventsDiv.innerHTML = `
    <div class="event" style="background-color:${Bcolor};color:${color};">
        <h1>${title}</h1>
        <h3>${subtitle}</h3>
        <p>${daysLeft} Ngày nữa</p>
    </div>
  `;
    if (closestEvent.background !== "") {
        upcomingEventsDiv.style.backgroundImage = `url(${closestEvent.background})`;
    }
}




const progressBar = document.querySelector('.progress-bar');

function fillProgressBar(progress) {
    progressBar.style.setProperty('--progress', progress + '%');
}



// Tạo một đối tượng ngày bắt đầu yêu
const startDate = new Date("2021-07-15");

// Tính toán số ngày yêu
const daysLove = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

const events = [
    {
        title: "Sự kiện 1",
        date: 100 // Số ngày tính từ ngày bắt đầu yêu
    },
    {
        title: "Sự kiện 2",
        date: 200
    },
    {
        title: "Sự kiện 3",
        date: 700
    }
];

const sortedEvents = events.sort((a, b) => a.date - b.date);
let passedEvent = null;
let upcomingEvent = null;

for (let i = 0; i < sortedEvents.length; i++) {
    const event = sortedEvents[i];

    if (event.date < daysLove) {
        passedEvent = event;
    } else if (event.date > daysLove) {
        upcomingEvent = event;
        break;
    }
}

var x = (daysLove * 100) / upcomingEvent.date;

fillProgressBar(x);

//   document.querySelector(".DaysLove").textContent = daysLove;
document.querySelector(".Memory").textContent = passedEvent ? passedEvent.title : "Không có sự kiện đã trôi qua";
document.querySelector(".UpComing").textContent = upcomingEvent ? upcomingEvent.title : "Không có sự kiện sắp tới";