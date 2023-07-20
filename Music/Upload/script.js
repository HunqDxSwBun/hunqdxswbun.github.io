function submitForm() {
    const FA1 = document.getElementById("FA1").value;
    const FA2 = document.getElementById("FA2").value;
    // const FA3 = document.getElementById("FA3").value;
    const FA4 = document.getElementById("FA4").value;
    const FA5 = document.getElementById("FA5").value;
    const processedFA1 = FA1.endsWith(".mp3") ? FA1.slice(0, -4) : FA1;
  
    const data = {
      name:processedFA1,
      singer:FA2,
      path:FA4,
      image:FA5
    };

    const output = document.getElementById("output");
    output.textContent = JSON.stringify(data, null, 2);

    setTimeout(() => {
       // Lấy các giá trị của các trường form
  const FA1Value = document.getElementById('FA1').value;
  const FA2Value = document.getElementById('FA2').value;
  // const FA3Value = document.getElementById('FA3').value;
  const FA4Value = document.getElementById('FA4').value;
  const FA5Value = document.getElementById('FA5').value;
  const processedFA1Value = FA1Value.endsWith(".mp3") ? FA1Value.slice(0, -4) : FA1Value;

  // Tạo dữ liệu định dạng JSON từ các giá trị đã lấy được
  const data = {
    name:processedFA1Value,
    singer:FA2Value,
    path:FA4Value,
    image:FA5Value
  };

  // Chuyển dữ liệu sang định dạng JSON và sao chép vào clipboard
  const jsonData = JSON.stringify(data, null, 2);
  navigator.clipboard.writeText(jsonData);
    }, 100);
}
const copyBtn = document.getElementById('copyBtn');

copyBtn.addEventListener('click', () => {
  // Lấy các giá trị của các trường form
  const FA1Value = document.getElementById('FA1').value;
  const FA2Value = document.getElementById('FA2').value;
  // const FA3Value = document.getElementById('FA3').value;
  const FA4Value = document.getElementById('FA4').value;
  const FA5Value = document.getElementById('FA5').value;
  const processedFA1Value = FA1Value.endsWith(".mp3") ? FA1Value.slice(0, -4) : FA1Value;

  // Tạo dữ liệu định dạng JSON từ các giá trị đã lấy được
  const data =  {
    name:processedFA1Value,
    singer:FA2Value,
    path:FA4Value,
    image:FA5Value
  };

  // Chuyển dữ liệu sang định dạng JSON và sao chép vào clipboard
  const jsonData = ',' + JSON.stringify(data, null, 2);
  navigator.clipboard.writeText(jsonData);
});
