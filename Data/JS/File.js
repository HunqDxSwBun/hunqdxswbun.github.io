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

// chỉ cần thêm div này vào HTML
/* <div id="toggle-button" ></div> */


// Kiểm tra xem trình duyệt có phải là trình duyệt trên điện thoại không
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
  console.log("Đây là trình duyệt trên điện thoại");
} else {
  console.log("Đây là trình duyệt trên máy tính");
}

// Lấy nút nhấn và thêm sự kiện nhấn vào
const button = document.getElementById('toggle-button');
button.addEventListener('click', toggleMode);

// Khởi tạo chế độ mặc định và lưu vào local storage (nếu chưa có)
let mode = parseInt(localStorage.getItem('mode')) || 1;
var x = document.getElementById("CustomColor");
  if (mode === 4) {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
setMode(mode);

// Hàm chuyển đổi chế độ
function toggleMode() {
  // Tăng chế độ lên 1 và quay về chế độ 1 nếu chế độ hiện tại là 3
  mode = mode < 5 ? mode + 1 : 1;
  setMode(mode);
  // Lưu chế độ vào local storage
  localStorage.setItem('mode', mode);

  var x = document.getElementById("CustomColor");
  if (mode === 4) {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


// Hàm thiết lập chế độ
function setMode(mode) {
  switch (mode) {
    case 1:
      button.innerHTML = '<i class="fa-solid fa-sun"></i>';
      button.style.backgroundColor = '#f5c85d';
      button.style.color = '#000';
      // Chạy hàm cho chế độ 1
      mode1();
      break;
    case 2:
      button.innerHTML = '<i class="fa-solid fa-moon"></i>';
      button.style.backgroundColor = '#211e2c';
      button.style.color = '#eee';

      // Chạy hàm cho chế độ 2
      mode2();
      break;
    case 3:

      button.style.backgroundColor = '#40c3da';
      button.style.color = '#000';

      if (isMobile) {
        button.innerHTML = '<i class="fa-solid fa-mobile-screen-button"></i>';
      } else {
        button.innerHTML = '<i class="fa-solid fa-desktop"></i>';
      }


      // Chạy hàm cho chế độ 3
      mode3();
      break;
      case 4:

      button.style.backgroundColor = '#ff2655';
      button.style.color = '#ffffff';
      button.innerHTML = ' <i class="fa-solid fa-palette"></i>';
      
      // Chạy hàm cho chế độ 4
      mode4();
      break;
      case 5:

      button.style.backgroundColor = '#111111';
      button.style.color = '#ff2655';
      button.innerHTML = ' <i class="fa-solid fa-palette"></i>';
      

      break;
    default:
      break;
  }
}

// Hàm cho chế độ 1 chế độ sáng
function mode1() {
  handleResetColors();
  console.log('Chế độ 1');

  var body = document.querySelector('body');
  body.classList.remove('dark-mode');
}

// Hàm cho chế độ 2 chế độ tối
function mode2() {
  console.log('Chế độ 2');

  var body = document.querySelector('body');
  body.classList.add('dark-mode');
}

// Hàm cho chế độ 3 chế độ sáng / tối
function mode3() {
  console.log('Chế độ 3');

  var body = document.querySelector('body');
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
}

// Hàm cho chế độ 4 chế độ tối
function mode4() {
  console.log('Chế độ 4');

  var body = document.querySelector('body');
  body.classList.remove('dark-mode');
}




function convertText() {
  var selectElement = document.getElementById("mySelect");
  var selectedValue = selectElement.value;

  if (selectedValue === "Ascii") {
    convertTextA();
  } 
  if (selectedValue === "Morse") {
    convertTextB();
  }
  if (selectedValue === "Base64") {
    convertTextC();
  }
}



function convertTextA() {
  var option = "";
  if (document.getElementById("textOption").checked) {
    option = "text";
  } else if (document.getElementById("Option").checked) {
    option = "ascii";
  }

  var inputText = document.getElementById("inputText").value;
  var outputText = "";

  if (option === "text") {
    // Chuyển đổi ASCII sang văn bản (UTF-8)
    var asciiArray = inputText.split(" ");
    outputText = "";

    for (var i = 0; i < asciiArray.length; i++) {
      var decimalValue = parseInt(asciiArray[i]);
      var char = String.fromCharCode(decimalValue);
      outputText += char;
    }
  } else if (option === "ascii") {
    // Chuyển đổi văn bản sang ASCII
    outputText = "";

    for (var i = 0; i < inputText.length; i++) {
      var char = inputText.charCodeAt(i);
      outputText += char + " ";
    }
  }

  document.getElementById("outputText").value = outputText.trim();
}


function convertTextB() {
  var inputText = document.getElementById("inputText").value.trim();
  var outputText = document.getElementById("outputText");

  var textOption = document.getElementById("textOption");
  var Option = document.getElementById("Option");

  if (textOption.checked) {
    outputText.value = morseToText(inputText);
  } else if (Option.checked) {
    outputText.value = textToMorse(inputText);
  }
}

function morseToText(morseCode) {
  var morseTable = {
    ".-": "a",
    "-...": "b",
    "-.-.": "c",
    "-..": "d",
    ".": "e",
    "..-.": "f",
    "--.": "g",
    "....": "h",
    "..": "i",
    ".---": "j",
    "-.-": "k",
    ".-..": "l",
    "--": "m",
    "-.": "n",
    "---": "o",
    ".--.": "p",
    "--.-": "q",
    ".-.": "r",
    "...": "s",
    "-": "t",
    "..-": "u",
    "...-": "v",
    ".--": "w",
    "-..-": "x",
    "-.--": "y",
    "--..": "z"
  };

  return morseCode
    .split(" ")
    .map(function (morseChar) {
      return morseTable[morseChar] || " ";
    })
    .join("");
}

function textToMorse(text) {
  var morseTable = {
    "a": ".-",
    "b": "-...",
    "c": "-.-.",
    "d": "-..",
    "e": ".",
    "f": "..-.",
    "g": "--.",
    "h": "....",
    "i": "..",
    "j": ".---",
    "k": "-.-",
    "l": ".-..",
    "m": "--",
    "n": "-.",
    "o": "---",
    "p": ".--.",
    "q": "--.-",
    "r": ".-.",
    "s": "...",
    "t": "-",
    "u": "..-",
    "v": "...-",
    "w": ".--",
    "x": "-..-",
    "y": "-.--",
    "z": "--.."
  };

  return text
    .toLowerCase()
    .split("")
    .map(function (char) {
      return morseTable[char] || " ";
    })
    .join(" ");
}


function copyText() {
  var textArea = document.getElementById("outputText");
  var copyOutputText = document.getElementById("copyOutputText");
  textArea.select();
  document.execCommand("copy");
  copyOutputText.innerText = 'Đã sao chép thành công!'
  setTimeout(() => {
    copyOutputText.innerText = 'Sao chép'
  }, 3000);

}

function convertTextC() {
  var inputText = document.getElementById("inputText").value;
  var outputText = document.getElementById("outputText");

  var textOption = document.getElementById("textOption");
  var Option = document.getElementById("Option");

  if (textOption.checked) {
    // Chuyển đổi từ mã sang văn bản
    var decodedText = atob(inputText);
    outputText.value = decodedText;
  } else if (Option.checked) {
    // Chuyển đổi từ văn bản sang mã
    var encodedText = btoa(inputText);
    outputText.value = encodedText;
  }
}


const inputs = document.querySelectorAll('.SettingBlock input[type="color"]');
  const resetButton = document.getElementById('resetColors');
  const defaultValues = {};

  inputs.forEach(input => {
    input.addEventListener('change', handleColorChange);
    defaultValues[input.id] = input.value;
  });

  resetButton.addEventListener('click', handleResetColors);

  function handleColorChange(event) {
    const variableName = `--${event.target.id}`;
    const colorValue = event.target.value;

    document.documentElement.style.setProperty(variableName, colorValue);
    localStorage.setItem(variableName, colorValue);
  }

  function handleResetColors() {
    inputs.forEach(input => {
      const variableName = `--${input.id}`;
      const defaultValue = defaultValues[input.id];

      document.documentElement.style.setProperty(variableName, defaultValue);
      localStorage.setItem(variableName, defaultValue);
      input.value = defaultValue;
    });
  }

  window.addEventListener('load', () => {
    inputs.forEach(input => {
      const variableName = `--${input.id}`;
      const colorValue = localStorage.getItem(variableName);

      if (colorValue) {
        document.documentElement.style.setProperty(variableName, colorValue);
        input.value = colorValue;
      }
    });
  });


const imageFileInput = document.getElementById('imageFileInput');
const saveImageBtn = document.getElementById('saveImageBtn');
const deleteImageBtn = document.getElementById('deleteImageBtn');
const homeElement = document.getElementById('Home');

saveImageBtn.addEventListener('click', handleSaveImage);
deleteImageBtn.addEventListener('click', handleDeleteImage);

function handleSaveImage() {
  const file = imageFileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const imageUrl = e.target.result;

      homeElement.style.backgroundImage = `url('${imageUrl}')`;
      localStorage.setItem('homeBackgroundImage', imageUrl);
    };

    reader.readAsDataURL(file);
  }
}

function handleDeleteImage() {
  homeElement.style.backgroundImage = '';
  localStorage.removeItem('homeBackgroundImage');
}

window.addEventListener('load', () => {
  const imageUrl = localStorage.getItem('homeBackgroundImage');

  if (imageUrl) {
    homeElement.style.backgroundImage = `url('${imageUrl}')`;
  }
});

function Redeem() {
  var x = document.getElementById("Redeem");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

var data = [
  { code: "SWBUN18", NoiDung: "Em tưởng anh nhầm ngày sinh nhật em à?. Không đâu 18 là Sendnupe 🌚", Data: "1000" },
  { code: "SWBUN19", NoiDung: "Yêu em nhiều lắm ❤", Data: "1000" },
  { code: "ABC123", NoiDung: "Không có gì cả", Data: "1200" }
];

function redeemCode() {
  // Lấy mã nhập vào từ người dùng
  var inputCode = document.getElementById("codeInput").value;
  var codeOutput = document.getElementById("codeOutput");

  // Chuyển đổi mã nhập thành chữ in hoa
  var upperCaseCode = inputCode.toUpperCase();

  // Kiểm tra mã nhập vào với dữ liệu
  for (var i = 0; i < data.length; i++) {
      if (data[i].code === upperCaseCode) {
          // Hiển thị nội dung tương ứng
          codeOutput.innerText = data[i].NoiDung;
          return; // Kết thúc hàm sau khi tìm thấy mã
      }
  }

  // Thông báo khi mã không hợp lệ
  codeOutput.innerText = ("Mã không hợp lệ!");
}

function Access() {
  alert('Trợ năng chưa khả dụng')
}

function DownloadFile() {
  alert('Hiện tại tính năng tải tất cả bài viết đang tạm dừng vì lý do lỗi sảy ra.')
}
