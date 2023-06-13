
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
  
  function pasteConvertText() {
    navigator.clipboard.readText()
      .then(function (clipboardData) {
        // Gán giá trị từ clipboard vào trường input
        document.getElementById('inputText').value = clipboardData;
      })
      .catch(function (error) {
        console.error('Lỗi khi đọc dữ liệu từ clipboard: ', error);
      });
  }
  
  function copyText() {
    var textArea = document.getElementById("outputText");
    var copyOutputText = document.getElementById("copyOutputText");
    textArea.select();
    document.execCommand("copy");
    copyOutputText.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
    setTimeout(() => {
      copyOutputText.innerHTML = '<i class="fa-regular fa-clone"></i>'
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
  