ReloadEvent();
function ReloadEvent() {
    var rootElement = document.getElementById("root");
    rootElement.innerHTML = ''; // Xóa nội dung cũ

    var events = [
        {
            "SuKien": "Tết Tây",
            "Ngay": "01/01",
            "Anh": "/Events/IMG/HPNY.JPG"
        },
        {
            "SuKien": "Tết Nguyên Đán",
            "Ngay": "29/01",
            "Anh": "/Events/IMG/TetTa.JPG"
        },
        {
            "SuKien": "Valentine",
            "Ngay": "14/02",
            "Anh": "/Events/IMG/Logo.png"
        },
        {
            "SuKien": "Quốc tế phụ nữ",
            "Ngay": "08/03",
            "Anh": "/Events/IMG/8thang3.JPG"
        },
        {
            "SuKien": "999 Ngày Yêu",
            "Ngay": "09/04",
            "Anh": "/Events/IMG/999.JPG"
        },
        {
            "SuKien": "1000 Ngày Yêu",
            "Ngay": "10/04",
            "Anh": "/Events/IMG/1000.JPG"
        },
        {
            "SuKien": "Kỉ niệm ngày yêu",
            "Ngay": "15/07",
            "Anh": "/Events/IMG/Kiss.png"
        },
        {
            "SuKien": "Sinh Nhật Anh Yêu ❤",
            "Ngay": "30/08",
            "Anh": "/Events/IMG/SinhNhat.JPG"
        },
        {
            "SuKien": "Sinh Nhật Em Yêu ❤",
            "Ngay": "19/10",
            "Anh": "/Events/IMG/SinhNhat.JPG"
        },
        {
            "SuKien": "Lễ Chúa giáng sinh",
            "Ngay": "25/12",
            "Anh": "/Events/IMG/Noel.png"
        }
    ];

    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();

    events.forEach(function (event) {
        var eventDate = new Date(currentYear, parseInt(event.Ngay.split('/')[1]) - 1, parseInt(event.Ngay.split('/')[0]));

        if (eventDate.getDate() === currentDate.getDate() && eventDate.getMonth() === currentDate.getMonth()) {
            //sự kiện đang diễn ra
            eventDate.setFullYear(eventDate.getFullYear() - 1); // Tăng năm của eventDate lên 1
        }

        if (eventDate.getFullYear() < currentDate.getFullYear() || (eventDate.getFullYear() === currentDate.getFullYear() && eventDate.getMonth() < currentDate.getMonth()) || (eventDate.getFullYear() === currentDate.getFullYear() && eventDate.getMonth() === currentDate.getMonth() && eventDate.getDate() === currentDate.getDate())) {
            eventDate.setFullYear(eventDate.getFullYear() + 1); // Tăng năm của eventDate lên 1
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

    var comingDiv = document.createElement("div");
    comingDiv.classList.add("Comming");
    comingDiv.id = "Comming";
    comingDiv.style.backgroundImage = "url(" + events[0].Anh + ")";
    comingDiv.onclick = function () {
        OpenEvent();
    };


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

        var EventComingUp = document.getElementById('EventComingUp'); // Đảm bảo đây là phần tử thích hợp
        var ngay = new Date(eventDate);
        var thu = ngay.toLocaleDateString('vi-VN', { weekday: 'long' });
        var ngayThang = ngay.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' });
        var ketQua = thu + ". " + ngayThang;

        if (days >= 1) {
            countdownElement.innerHTML = `<p>${ketQua}</p> <p>${days} Ngày ${hours}:${minutes}:${seconds}</p>`;
            EventComingUp.textContent = events[0].SuKien + ' ' + days + ' ngày nữa';
        } else if (days === 0) {
            countdownElement.textContent = hours + " Giờ " + minutes + " Phút " + seconds + ' Giây';
        } else {
            countdownElement.textContent = 'Đang diễn ra sự kiện';
            EventComingUp.innerHTML = events[0].SuKien + '<br> Đang diễn ra';

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
            countdown.textContent = days;
        }


        Countdown.appendChild(countdown);
        upnextDiv.appendChild(contentDiv);
        upnextDiv.appendChild(Countdown);
        eventContainer.appendChild(upnextDiv);

    }

    var SuKienSapToi = events[0].SuKien;
    var NgaySuKien = events[0].Ngay;

    // Thêm vào phần tử gốc
    var rootElement = document.getElementById("root");
    rootElement.appendChild(eventContainer);
}

function OpenEvent() {
    var currentDate = new Date();

    if (currentDate.getDate() == 8 && (currentDate.getMonth() + 1) == 3) {
        Done('Chức mừng ngày 8/3', '')
    }
}