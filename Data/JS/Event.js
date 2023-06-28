// Dữ liệu JSON
var jsonData = [
    {
         "TieuDe": " Sự kiên A ",
         "NgaySuKien": "25/07/2023",
         "LapLai": "1Y",
         "ThoiHan": "VinhVien",
         "NoiDung": "Đây là sự kiện A."
     },
     {
        "TieuDe": "Sự kiên B ",
        "NgaySuKien": "10/07/2023",
        "LapLai": "1M",
        "ThoiHan": "1",
        "NoiDung": "Pellentesque pretium tellus id mauris  pretium, quis malesuada purus maximus."
    },
    {
        "TieuDe": " Sự kiên C ",
        "NgaySuKien": "20/07/2023",
        "LapLai": "1Y",
        "ThoiHan": "2",
        "NoiDung": "Pellentesque pretium tellus id mauris  pretium, quis malesuada purus maximus."
    }
];

// Lấy ngày hiện tại
var currentDate = new Date("2023-07-19");

// Sắp xếp các sự kiện theo thứ tự từ gần đến xa
jsonData.sort(function(a, b) {
  var dateA = new Date(a.NgaySuKien.split('/').reverse().join('/'));
  var dateB = new Date(b.NgaySuKien.split('/').reverse().join('/'));
  return Math.abs(dateA - currentDate) - Math.abs(dateB - currentDate);
});

// Lấy phần tử chứa timeline từ HTML
var timelineElement = document.querySelector('.timeline');

// Duyệt qua mỗi sự kiện trong JSON
jsonData.forEach(function(event) {
  // Tạo phần tử HTML cho mỗi sự kiện
  var eventElement = document.createElement('div');
  eventElement.classList.add('tl-content');
  
  var headerElement = document.createElement('div');
  headerElement.classList.add('tl-header');

  var markerElement = document.createElement('span');
  markerElement.classList.add('tl-marker');

  var titleElement = document.createElement('p');
  titleElement.classList.add('tl-title');
  titleElement.textContent = event.TieuDe;

  var timeElement = document.createElement('time');
  timeElement.classList.add('tl-time');
  timeElement.setAttribute('datetime', event.NgaySuKien);
  timeElement.textContent = event.NgaySuKien;

  var bodyElement = document.createElement('div');
  bodyElement.classList.add('tl-body');

  var contentElement = document.createElement('p');
  contentElement.textContent = event.NoiDung;

  // Gắn các phần tử vào cấu trúc HTML
  headerElement.appendChild(markerElement);
  headerElement.appendChild(titleElement);
  headerElement.appendChild(timeElement);

  bodyElement.appendChild(contentElement);

  eventElement.appendChild(headerElement);
  eventElement.appendChild(bodyElement);

  timelineElement.appendChild(eventElement);
});
