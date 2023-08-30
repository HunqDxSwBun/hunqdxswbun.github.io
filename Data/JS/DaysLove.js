
function countDaysLove() {
    var startDate = new Date('2021-07-15');
    // Thu Jul 15 2021 00:00:00 GMT+0700 (Giờ Đông Dương) 
    var currentDate = new Date();
    var timeDifference = currentDate.getTime() - startDate.getTime();
  
    var dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    var years = Math.floor(dayDifference / 365);
    var months = Math.floor((dayDifference % 365) / 30);
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
  
    document.getElementById("DaysLove").innerHTML = (dayDifference).toString();
    document.getElementById("Years").getElementsByClassName("number")[0].textContent = years;
    document.getElementById("Months").getElementsByClassName("number")[0].textContent = months;
    document.getElementById("Hours").getElementsByClassName("number")[0].textContent = hours;
    document.getElementById("Mins").getElementsByClassName("number")[0].textContent = minutes;
    document.getElementById("Secs").getElementsByClassName("number")[0].textContent = seconds;
  
  
  }
  setInterval(countDaysLove, 1000);
  // Ngày sinh của Hung và Thy
var snHung = new Date('2001-08-30');
var snThy = new Date('2001-10-19');

// Ngày hiện tại
var today = new Date();

// Tính số tuổi của Hung và Thy
var ageHung = today.getFullYear() - snHung.getFullYear();
var ageThy = today.getFullYear() - snThy.getFullYear();

// Kiểm tra nếu chưa đến sinh nhật trong năm nay, giảm đi 1 tuổi
if (today < new Date(today.getFullYear(), snHung.getMonth(), snHung.getDate())) {
  ageHung--;
}
if (today < new Date(today.getFullYear(), snThy.getMonth(), snThy.getDate())) {
  ageThy--;
}

// Tính số ngày còn lại đến sinh nhật của Hung và Thy
var nextBirthdayHung = new Date(today.getFullYear(), snHung.getMonth(), snHung.getDate());
if (today > nextBirthdayHung) {
  nextBirthdayHung.setFullYear(today.getFullYear() + 1);
}
var daysLeftHung = Math.ceil((nextBirthdayHung - today) / (1000 * 60 * 60 * 24));
if (snHung.getDate() === today.getDate() && snHung.getMonth() === today.getMonth()) {
  daysLeftHung = 'đang diễn ra';
}

var nextBirthdayThy = new Date(today.getFullYear(), snThy.getMonth(), snThy.getDate());
if (today > nextBirthdayThy) {
  nextBirthdayThy.setFullYear(today.getFullYear() + 1);
}
var daysLeftThy = Math.ceil((nextBirthdayThy - today) / (1000 * 60 * 60 * 24));
if (snThy.getDate() === today.getDate() && snThy.getMonth() === today.getMonth()) {
  daysLeftThy = 'đang diễn ra';
}

// Hiển thị kết quả
var divHung = document.getElementById("ageHung");
var divThy = document.getElementById("ageThy");

divHung.innerHTML = `<i class="fa-solid fa-mars"></i> ` + ageHung;
divThy.innerHTML = `<i class="fa-solid fa-venus"></i> ` + ageThy;

let countHung = 0;
let countThy = 0;

setTimeout(() => {
  AgeOnload('all');
}, 5000);

function AgeOnload(x) {
  if (x == 'all') {
    divHung.innerHTML = (countHung === 0) ? ` <i class="fa-solid fa-cake-candles"></i> ` + daysLeftHung : `<i class="fa-solid fa-mars"></i> ` + ageHung;
    divThy.innerHTML = (countThy === 0) ? ` <i class="fa-solid fa-cake-candles"></i> ` + daysLeftThy : `<i class="fa-solid fa-venus"></i> ` + ageThy;

    setTimeout(() => {
      divHung.innerHTML = `<i class="fa-solid fa-mars"></i> ` + ageHung;
      divThy.innerHTML = `<i class="fa-solid fa-venus"></i> ` + ageThy;
    }, 3000);
  } else if (x == 'Hung') {
    if (countHung === 0) {
      divHung.innerHTML = ` <i class="fa-solid fa-cake-candles"></i> ` + daysLeftHung;
      countHung++;
    } else {
      divHung.innerHTML = `<i class="fa-solid fa-mars"></i> ` + ageHung;
      countHung = 0;
    }

  } else if (x == 'Thy') {
    if (countThy === 0) {
      divThy.innerHTML = ` <i class="fa-solid fa-cake-candles"></i> ` + daysLeftThy;
      countThy++;
    } else {
      divThy.innerHTML = `<i class="fa-solid fa-venus"></i> ` + ageThy;
      countThy = 0;
    }
  }
}
