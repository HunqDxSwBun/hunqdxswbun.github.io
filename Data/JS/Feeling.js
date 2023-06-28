// Hàm được gọi khi trang được tải lại
function restoreFeeling() {
  // Kiểm tra xem đã có dữ liệu cảm xúc trong Local Storage hay chưa
  if (localStorage.getItem("feelingData") !== null) {
    var feelingData = JSON.parse(localStorage.getItem("feelingData"));

    // Kiểm tra xem dữ liệu có phải là của người yêu Anh hay Em
    if (feelingData.personalCode === "HunqD") {
      // Hiển thị dữ liệu cho người yêu Anh
      document.querySelector(".People.Male h2").innerText = "Anh yêu ❤";
      document.querySelector(".People.Male h1").innerText = feelingData.iconCustom;
      document.querySelector(".People.Male p").innerText = feelingData.sttCustom;
    } else if (feelingData.personalCode === "SwBun") {
      // Hiển thị dữ liệu cho người yêu Em
      document.querySelector(".People.Female h2").innerText = "Em yêu ❤";
      document.querySelector(".People.Female h1").innerText = feelingData.iconCustom;
      document.querySelector(".People.Female p").innerText = feelingData.sttCustom;
    }
  }
}

// Hàm được gọi khi người dùng nhấn nút "Cập nhật cảm xúc"
function updateFeeling() {
  // Lấy mã cá nhân từ trường input
  var personalCode = document.getElementById('personalCode').value;

  // Lấy các giá trị từ trường input
  var iconCustom = document.getElementById("iconCustom").value;
  var sttCustom = document.getElementById("sttCustom").value;

  // Kiểm tra xem mã cá nhân có phải là "SwBun" hay không
  if (personalCode === "HunqD") {
    // Hiển thị dữ liệu cho người yêu Anh
    document.querySelector(".People.Male h2").innerText = "Anh yêu ❤";
    document.querySelector(".People.Male h1").innerText = iconCustom;
    document.querySelector(".People.Male p").innerText = sttCustom;
  } else if (personalCode === "SwBun") {
    // Hiển thị dữ liệu cho người yêu Em
    document.querySelector(".People.Female h2").innerText = "Em yêu ❤";
    document.querySelector(".People.Female h1").innerText = iconCustom;
    document.querySelector(".People.Female p").innerText = sttCustom;
  }

  // Lưu dữ liệu cảm xúc vào Local Storage
  var feelingData = {
    personalCode: personalCode,
    iconCustom: iconCustom,
    sttCustom: sttCustom
  };
  localStorage.setItem("feelingData", JSON.stringify(feelingData));

  // Gửi thông tin cập nhật lên websocket
  var socket = new WebSocket("wss://s9317.nyc1.piesocket.com/v3/1?api_key=iL0T9OF4NHWeeGmmqQKQbTOsz7Y8q4IzybT8uwgo&notify_self=1");
  socket.onopen = function () {
    socket.send(JSON.stringify(feelingData));
  };
}

// Gọi hàm khôi phục trạng thái khi trang được tải lại
window.onload = restoreFeeling;


// Tạo kết nối websocket trên máy B
var socket = new WebSocket("wss://s9317.nyc1.piesocket.com/v3/1?api_key=iL0T9OF4NHWeeGmmqQKQbTOsz7Y8q4IzybT8uwgo&notify_self=1");

// Xử lý sự kiện khi kết nối websocket mở
socket.onopen = function () {
  console.log("WebSocket connection is open.");
};

// Xử lý sự kiện khi nhận được tin nhắn từ websocket
socket.onmessage = function (event) {
  var data = JSON.parse(event.data);

  // Kiểm tra xem dữ liệu nhận được có phải là cập nhật cảm xúc không
  if (data.hasOwnProperty("personalCode") && data.hasOwnProperty("iconCustom") && data.hasOwnProperty("sttCustom")) {
    var personalCode = data.personalCode;
    var iconCustom = data.iconCustom;
    var sttCustom = data.sttCustom;

    // Kiểm tra xem mã cá nhân có phải là "SwBun" hay "SwBun" hay không
    if (personalCode === "HunqD") {
      // Hiển thị dữ liệu cho người yêu Anh
      document.querySelector(".People.Male h2").innerText = "Anh yêu ❤";
      document.querySelector(".People.Male h1").innerText = iconCustom;
      document.querySelector(".People.Male p").innerText = sttCustom;
    } else if (personalCode === "SwBun") {
      // Hiển thị dữ liệu cho người yêu Em
      document.querySelector(".People.Female h2").innerText = "Em yêu ❤";
      document.querySelector(".People.Female h1").innerText = iconCustom;
      document.querySelector(".People.Female p").innerText = sttCustom;
    }

    // Lưu dữ liệu cảm xúc vào Local Storage
    var feelingData = {
      personalCode: personalCode,
      iconCustom: iconCustom,
      sttCustom: sttCustom
    };
    localStorage.setItem("feelingData", JSON.stringify(feelingData));
  }
};

// Xử lý sự kiện khi kết nối websocket đóng
socket.onclose = function () {
  console.log("WebSocket connection is closed.");
};
