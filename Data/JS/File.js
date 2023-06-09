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
setMode(mode);

// Hàm chuyển đổi chế độ
function toggleMode() {
  // Tăng chế độ lên 1 và quay về chế độ 1 nếu chế độ hiện tại là 3
  mode = mode < 3 ? mode + 1 : 1;
  setMode(mode);
  // Lưu chế độ vào local storage
  localStorage.setItem('mode', mode);
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
    default:
      break;
  }
}

// Hàm cho chế độ 1 chế độ sáng
function mode1() {
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

