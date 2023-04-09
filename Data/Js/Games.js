let cap = 1;
let xu = 10;
let nuoc = 20;
let cay = 0;
let kinhNghiemCay = 0;

function tangCap() {
  cap++;
  CapNhatGame();
}

function tangXu(x) {
  xu += x;
  CapNhatGame();
}

function tangNuoc(x) {
  nuoc += x;
  CapNhatGame();
}

function tangCay(x) {
  cay += x;
  CapNhatGame();
}

function tangKinhNghiemCay(x) {
  kinhNghiemCay += x;
  CapNhatGame();
}

function CapNhatGame() {
  // Lưu trữ dữ liệu vào local storage
  localStorage.setItem('cap', cap);
  localStorage.setItem('xu', xu);
  localStorage.setItem('nuoc', nuoc);
  localStorage.setItem('cay', cay);
  localStorage.setItem('kinhNghiemCay', kinhNghiemCay);
  
  document.querySelector("#CapDo").textContent = cap
  document.querySelector("#Nuoc").textContent = nuoc
  document.querySelector("#Xu").textContent = xu


}
function XoaDuLieuGame() {
    localStorage.clear();
    cap = 1;
    xu = 10;
    nuoc = 20;
    cay = 1;
    kinhNghiemCay = 10;
  }
  

// Load dữ liệu từ local storage (nếu có)
cap = parseInt(localStorage.getItem('cap')) || cap;
xu = parseInt(localStorage.getItem('xu')) || xu;
nuoc = parseInt(localStorage.getItem('nuoc')) || nuoc;
cay = parseInt(localStorage.getItem('cay')) || cay;
kinhNghiemCay = parseInt(localStorage.getItem('kinhNghiemCay')) || kinhNghiemCay;
document.querySelector("#CapDo").textContent = cap;
document.querySelector("#Nuoc").textContent = nuoc;
document.querySelector("#Xu").textContent = xu;


const dailyElement = document.getElementById('daily');
const checkinButton = document.getElementById('checkin');
const resetButton = document.getElementById('reset');

window.addEventListener('DOMContentLoaded', () => {
  const days = localStorage.getItem('days') || 0;
  dailyElement.innerText = days;
});

checkinButton.addEventListener('click', () => {
  const now = new Date();
  const today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
  const lastCheckinDate = localStorage.getItem('lastCheckinDate');

  if (lastCheckinDate === today) {
    alert('Bạn đã điểm danh hôm nay rồi!');
  } else {
    let days = localStorage.getItem('days') || 0;
    days++;
    localStorage.setItem('days', days);
    localStorage.setItem('lastCheckinDate', today);
    dailyElement.innerText = days;
    alert('Điểm danh thành công!');
    if (days <= 10) {
      tangXu(10);
      tangNuoc(20);
    }

  }
});

resetButton.addEventListener('click', () => {
  localStorage.clear();
  dailyElement.innerText = 0;
  alert('Dữ liệu đã được xoá!');
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('days', dailyElement.innerText);
});
