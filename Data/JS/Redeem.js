var data = [
    { code: "SWBUN19", NoiDung: "Yêu em nhiều lắm ❤", Data: "1000" },
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
            codeOutput.innerHTML = data[i].NoiDung;
            return; // Kết thúc hàm sau khi tìm thấy mã
        }
    }
  
    // Thông báo khi mã không hợp lệ
    codeOutput.innerText = ("Mã không hợp lệ!");
  }