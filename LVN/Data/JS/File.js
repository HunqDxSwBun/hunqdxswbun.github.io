function openTAB(evt, TabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(TabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Lấy phần tử input và select từ DOM
const soTienTietKiemInput = document.getElementById('SoTienTietKiem');
const thoiGianTietKiemSelect = document.getElementById('ThoiGianTietKiem');
const tienLaiParagraph = document.getElementById('TienLai');

// Thêm sự kiện 'change' để lắng nghe thay đổi trong input và select
soTienTietKiemInput.addEventListener('change', calculateInterest);
thoiGianTietKiemSelect.addEventListener('change', calculateInterest);

// Hàm tính toán và cập nhật giá trị trong #TienLai
function calculateInterest() {
    // Lấy giá trị từ input và select
    const soTienTietKiem = parseInt(soTienTietKiemInput.value.replace(/,/g, '')) || 0;
    const soTienTietKiemFormatted = formatNumberWithCommas(soTienTietKiem);
    const thoiGianTietKiem = parseInt(thoiGianTietKiemSelect.value);

    // Tính toán tiền lãi
    let tiLeLai;
    switch (thoiGianTietKiem) {
        case 1:
            tiLeLai = 0.1; // Lãi suất 10% cho 1 tháng
            break;
        case 3:
            tiLeLai = 0.3; // Lãi suất 30% cho 3 tháng
            break;
        case 6:
            tiLeLai = 0.5; // Lãi suất 50% cho 6 tháng
            break;
        case 12:
            tiLeLai = 1.0; // Lãi suất 100% cho 10 tháng
            break;
        default:
            tiLeLai = 0; // Nếu không khớp thời hạn nào, tiLeLai sẽ là 0
            break;
    }

    const tienLai = soTienTietKiem * tiLeLai;
    const tongTienLai = soTienTietKiem + tienLai;

    // Cập nhật giá trị trong #TienLai
    tienLaiParagraph.innerHTML = `
        <h1>${formatNumberWithCommas(tongTienLai)}đ</h1>
        <p>Lãi ${tiLeLai * 100}%: Gốc ${soTienTietKiemFormatted}đ + Lãi ${formatNumberWithCommas(tienLai)}đ.</p>
    `;
}

// Hàm định dạng số với dấu phẩy ngăn cách hàng nghìn
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
