function diemDanh() {
    var btn = document.getElementById("btn-diem-danh");
    var daDiemDanh = document.getElementById("da-diem-danh");

    if (localStorage.getItem("daDiemDanh") === null) {
        localStorage.setItem("daDiemDanh", "[]");
    }

    var ngayHienTai = new Date().toLocaleDateString();
    var daDiemDanhArr = JSON.parse(localStorage.getItem("daDiemDanh"));

    if (daDiemDanhArr.includes(ngayHienTai)) {
        alert("Bạn đã điểm danh hôm nay rồi!");
    } else {
        daDiemDanhArr.push(ngayHienTai);
        localStorage.setItem("daDiemDanh", JSON.stringify(daDiemDanhArr));
        btn.style.display = "none";
        daDiemDanh.innerText = "Bạn đã điểm danh " + daDiemDanhArr.length;
    }
}

function kiemTraDaDiemDanh() {
    var btn = document.getElementById("btn-diem-danh");
    var daDiemDanh = document.getElementById("da-diem-danh");

    if (localStorage.getItem("daDiemDanh") === null) {
        localStorage.setItem("daDiemDanh", "[]");
    }

    var daDiemDanhArr = JSON.parse(localStorage.getItem("daDiemDanh"));
    var ngayHienTai = new Date().toLocaleDateString();

    if (daDiemDanhArr.includes(ngayHienTai)) {
        btn.style.display = "none";
        daDiemDanh.innerText = "Bạn đã điểm danh " + daDiemDanhArr.length + " ngày liên tiếp!";
    } else {
        btn.style.display = "block";
        daDiemDanh.innerText = "";
    }
}

function xoaDaDiemDanh() {
    localStorage.removeItem("daDiemDanh");
    var daDiemDanh = document.getElementById("da-diem-danh");
    daDiemDanh.innerText = "";
    var btn = document.getElementById("btn-diem-danh");
    btn.style.display = "block";
    var btnXoa = document.getElementById("btn-xoa");
    btnXoa.style.display = "none";
}

kiemTraDaDiemDanh(); 
