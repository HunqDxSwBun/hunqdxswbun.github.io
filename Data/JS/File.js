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
  document.getElementById(TabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function countDaysLove() {
  var startDate = new Date('2021-07-15');
  var currentDate = new Date();
  var timeDifference = currentDate.getTime() - startDate.getTime();
  var dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  var years = Math.floor(dayDifference / 365);
  var months = Math.floor((dayDifference % 365) / 30);
  var weeks = Math.floor(dayDifference / 7); // Thêm tính toán số tuần
  var days = (dayDifference % 365) % 30;
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();

  document.getElementById("DaysLove").innerHTML = (dayDifference - 1).toString(); // Trừ 1 ngày để tính từ ngày yêu
  document.getElementById("Years").getElementsByClassName("number")[0].textContent = years;
  document.getElementById("Months").getElementsByClassName("number")[0].textContent = months;
  document.getElementById("Weeks").getElementsByClassName("number")[0].textContent = weeks;
  document.getElementById("Days").getElementsByClassName("number")[0].textContent = days;
  document.getElementById("Hours").getElementsByClassName("number")[0].textContent = hours;
  document.getElementById("Mins").getElementsByClassName("number")[0].textContent = minutes;
  document.getElementById("Secs").getElementsByClassName("number")[0].textContent = seconds;
}

setInterval(countDaysLove, 1000);
