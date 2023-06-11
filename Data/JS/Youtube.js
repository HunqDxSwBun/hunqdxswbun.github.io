
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
    block.innerHTML = '<p>Bấm vào ô dưới đây.</p> <p>Sau đó chờ và bấm vào <b>"Download"</b> để tải về.</p> <p>Vì sử dụng nguồn cung cấp bên thứ 3 nên khi bấm "Download" có thể sẽ nhảy sang trang quảng cáo nên khi có trang quảng cáo hãy đóng trang đó càng nhanh càng tốt. Sắp tới sẽ xử lý vấn đề này nên tạm thời chịu quảng cáo 😓</p>';

    iframe.src = "https://convert2mp3s.com/api/single/mp3?url=" + encodeURIComponent(inputText);
    
    // Xóa bất kỳ nội dung cũ trong div
    resultDiv.innerHTML = "";
    
    // Thêm iframe vào div
    resultDiv.appendChild(block);
    resultDiv.appendChild(iframe);
    
}

