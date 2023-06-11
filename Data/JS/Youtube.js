
function chuyenDoi() {
    var inputText = document.getElementById("inputLinkYTB").value;
    var resultDiv = document.getElementById("outLinkYTB");
    
    // Kiểm tra trường nhập liệu có rỗng hay không
    if (inputText === "") {
      resultDiv.innerHTML = "Vui lòng nhập một đường dẫn YouTube hợp lệ.";
      return;
    }
    
    // Tạo một iframe và thiết lập thuộc tính src bằng đường dẫn URL từ API
    var iframe = document.createElement("iframe");
    iframe.id = "iframeYTB";
    var block = document.createElement("div");
    block.id = "Block";
    block.innerHTML = '<p>Bấm vào ô dưới đây.<br>Sau đó chờ và bấm vào <b>"Download"</b> để tải về.</p>';

    iframe.src = "https://convert2mp3s.com/api/single/mp3?url=" + encodeURIComponent(inputText);
    
    // Xóa bất kỳ nội dung cũ trong div
    resultDiv.innerHTML = "";
    
    // Thêm iframe vào div
    resultDiv.appendChild(block);
    resultDiv.appendChild(iframe);
    
    var iframe = document.getElementById('iframeYTB');

        // Lắng nghe sự kiện khi iframe cố gắng mở tab mới
        iframe.addEventListener('beforeunload', function (event) {
            // Ngăn chặn mở tab mới
            event.preventDefault();
    });
}

function blockNewTab() {
            var newTab = window.open("", "_blank");
            newTab.close();
}