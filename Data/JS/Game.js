// Kiểm tra xem đã có dữ liệu điểm danh trong localStorage chưa
if(localStorage.getItem('diemDanh') === null) {
    localStorage.setItem('diemDanh', 0);
  }
  
  // Lấy phần tử có id là "DiemDanh"
  var diemDanhElement = document.getElementById("DiemDanh");
  
  // Lấy phần tử có id là "diemDanhBtn"
  var diemDanhBtn = document.getElementById("diemDanhBtn");
  
  // Lấy giá trị điểm danh từ localStorage
  var diemDanhValue = parseInt(localStorage.getItem('diemDanh'));
  
  // Cập nhật giá trị của phần tử "DiemDanh" bằng giá trị điểm danh hiện tại
  diemDanhElement.innerHTML = diemDanhValue;
  
  // Kiểm tra nếu đã điểm danh trong ngày thì ẩn nút "Điểm Danh"
  if(localStorage.getItem('lastDanhDau') === getCurrentDate()) {
    diemDanhBtn.style.display = "none";
  }
  
  // Gắn xử lý sự kiện cho nút "Điểm Danh"
  diemDanhBtn.addEventListener("click", function() {
    // Tăng giá trị điểm danh lên 1
    diemDanhValue += 1;
  
    // Cập nhật giá trị mới vào phần tử "DiemDanh"
    diemDanhElement.innerHTML = diemDanhValue;
  
    // Lưu giá trị điểm danh mới vào localStorage
    localStorage.setItem('diemDanh', diemDanhValue);
  
    // Lưu ngày điểm danh vào localStorage
    localStorage.setItem('lastDanhDau', getCurrentDate());
  
    // Ẩn nút "Điểm Danh"
    diemDanhBtn.style.display = "none";
  });
  
  // Hàm trả về ngày hiện tại dưới dạng chuỗi "dd-mm-yyyy"
  function getCurrentDate() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1; // Tháng trong JavaScript đếm từ 0 (tháng 0 là tháng 1)
    var year = today.getFullYear();
  
    return day + "-" + month + "-" + year;
  }
  