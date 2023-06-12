// Tạo biến global để lưu trạng thái mở tab mới
var isNewTabOpened = false;

function chuyenDoi() {
  var inputText = document.getElementById("inputLinkYTB").value;
  var resultDiv = document.getElementById("outLinkYTB");

  // Kiểm tra trường nhập liệu có rỗng hay không
  if (inputText === "") {
    resultDiv.innerHTML = "<b>Vui lòng nhập một đường dẫn YouTube hợp lệ.</b>";
    return;
  }
  // Tạo một iframe và thiết lập thuộc tính src bằng đường dẫn URL từ API
  var iframe = document.createElement("iframe");
  iframe.id = "iframeYTB";
  var block = document.createElement("div");
  block.id = "Block";
  block.innerHTML = '<p>Bấm vào ô dưới đây.</p> <p>Sau đó chờ và bấm vào <b>"Download"</b> để tải về.</p>';

  iframe.src = "https://convert2mp3s.com/api/single/mp3?url=" + encodeURIComponent(inputText);

  // Xóa bất kỳ nội dung cũ trong div
  resultDiv.innerHTML = "";

  // Thêm iframe vào div
  resultDiv.appendChild(block);
  resultDiv.appendChild(iframe);

}

// Hàm lấy dữ liệu từ clipboard
function pasteClipboardData() {
  navigator.clipboard.readText()
    .then(function (clipboardData) {
      // Gán giá trị từ clipboard vào trường input
      document.getElementById('inputLinkYTB').value = clipboardData;
    })
    .catch(function (error) {
      console.error('Lỗi khi đọc dữ liệu từ clipboard: ', error);
    });
}