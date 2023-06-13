var data = [
    { code: "SWBUN18", NoiDung: "Em tưởng anh nhầm ngày sinh nhật em à?. Không đâu 18 là Sendnupe 🌚", Data: "1000" },
    { code: "SWBUN19", NoiDung: "Yêu em nhiều lắm ❤", Data: "1000" },
    { code: "ABC123", NoiDung: "Không có gì cả", Data: "1200" },
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