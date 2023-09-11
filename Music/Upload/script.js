function submitForm() {
  const FA1 = document.getElementById("FA1").value;
  const FA2 = document.getElementById("FA2").value;
  const FA4 = document.getElementById("FA4").value;
  const FA5 = document.getElementById("FA5").value;

  let googleDriveID = FA4; // Sử dụng giá trị FA4 mặc định

  // Kiểm tra nếu FA4 là URL Google Drive
  if (FA4.includes("https://drive.google.com/") && FA4.includes("id=")) {
    const match = FA4.match(/id=([^&]+)/);
    if (match) {
      googleDriveID = match[1];
    }
  }

  const processedFA1 = FA1.endsWith(".mp3") ? FA1.slice(0, -4) : FA1;

  const data = {
    name: processedFA1,
    singer: FA2,
    path: 'https://drive.google.com/uc?id=' +  googleDriveID, // Sử dụng ID Google Drive cho FA4
    image: FA5,
  };

  const output = document.getElementById("output");
  output.textContent = JSON.stringify(data, null, 2);

  setTimeout(() => {
    // Code sao chép vào clipboard ở đây
  }, 100);
}

const copyBtn = document.getElementById('copyBtn');

copyBtn.addEventListener('click', () => {
  const FA1Value = document.getElementById('FA1').value;
  const FA2Value = document.getElementById('FA2').value;
  const FA4Value = document.getElementById('FA4').value;
  const FA5Value = document.getElementById('FA5').value;

  let googleDriveID = FA4Value; // Sử dụng giá trị FA4 mặc định

  // Kiểm tra nếu FA4 là URL Google Drive
  if (FA4Value.includes("https://drive.google.com/") && FA4Value.includes("id=")) {
    const match = FA4Value.match(/id=([^&]+)/);
    if (match) {
      googleDriveID = match[1];
    }
  }

  const data = {
    name: FA1Value.endsWith(".mp3") ? FA1Value.slice(0, -4) : FA1Value,
    singer: FA2Value,
    path: 'https://drive.google.com/uc?id=' + googleDriveID, // Sử dụng ID Google Drive cho FA4
    image: FA5Value,
  };

  const jsonData = ',' + JSON.stringify(data, null, 2);
  navigator.clipboard.writeText(jsonData);
});
