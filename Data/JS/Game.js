
// Kiểm tra nếu đã có dữ liệu trong local storage
if (localStorage.getItem('soNgayDiemDanh')) {
    // Lấy giá trị số ngày đã điểm danh từ local storage
    var soNgayDiemDanh = parseInt(localStorage.getItem('soNgayDiemDanh'));
    // Hiển thị số ngày đã điểm danh trong thẻ #DiemDanh
    document.getElementById('DiemDanh').textContent = soNgayDiemDanh;
} else {
    // Nếu chưa có dữ liệu trong local storage, gán giá trị mặc định là 0
    var soNgayDiemDanh = 0;
}

// Gán sự kiện click cho nút điểm danh
document.getElementById('diemDanhBtn').addEventListener('click', function () {
    // Kiểm tra nếu đã điểm danh trong ngày, không làm gì cả
    if (localStorage.getItem('ngayDiemDanh') === getCurrentDate()) {
        return;
    }

    // Tăng giá trị số ngày đã điểm danh lên 1
    soNgayDiemDanh++;
    // Lưu giá trị số ngày đã điểm danh vào local storage
    localStorage.setItem('soNgayDiemDanh', soNgayDiemDanh);
    // Lưu ngày điểm danh vào local storage
    localStorage.setItem('ngayDiemDanh', getCurrentDate());
    // Hiển thị số ngày đã điểm danh trong thẻ #DiemDanh
    document.getElementById('DiemDanh').textContent = soNgayDiemDanh;
});

// Gán sự kiện click cho nút xoá dữ liệu
document.getElementById('xoaDuLieuBtn').addEventListener('click', function () {
    // Xoá dữ liệu số ngày đã điểm danh trong local storage
    localStorage.removeItem('soNgayDiemDanh');
    // Xoá dữ liệu ngày điểm danh trong local storage
    localStorage.removeItem('ngayDiemDanh');
    // Đặt giá trị số ngày đã điểm danh về 0
    soNgayDiemDanh = 0;
    // Hiển thị số ngày đã điểm danh trong thẻ #DiemDanh
    document.getElementById('DiemDanh').textContent = soNgayDiemDanh ;
});

// Hàm trả về ngày hiện tại dưới dạng chuỗi YYYY-MM-DD
function getCurrentDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0');
    var day = today.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}
