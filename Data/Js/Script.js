var nhanVats = document.querySelectorAll(".NhanVat");
for (var i = 0; i < nhanVats.length; i++) {
    nhanVats[i].addEventListener("click", function () {
        var chonNhanVat = document.querySelector(".NhanVat.Chon");
        if (chonNhanVat) {
            chonNhanVat.classList.remove("Chon");
        }
        this.classList.add("Chon");
        document.querySelector("#XacNhanNhanVat").style.display = "block";
    });
}

document.querySelector("#XacNhanNhanVat").addEventListener("click", function () {
    
    var chonNhanVat = document.querySelector(".NhanVat.Chon");
    if (chonNhanVat) {
        var tenNhanVat = chonNhanVat.querySelector("img").alt;
        localStorage.setItem("tenNhanVat", tenNhanVat);
        document.querySelector(".ChaoMung").style.display = "none";
        document.querySelector(".TrangChu").style.display = "block";
        console.log("Đã chọn nhân vật: " + tenNhanVat);

        ThongBao('Đã chọn nhân vật ' + tenNhanVat );
        
    } else {
        ThongBao('Vui lòng chọn một nhân vật.');
    }
    
});

var tenNhanVat = localStorage.getItem("tenNhanVat");
if (tenNhanVat) {
    console.log("Đã chọn nhân vật: " + tenNhanVat);
    document.querySelector(".ChaoMung").style.display = "none";
    document.querySelector(".TrangChu").style.display = "block";

}

function CapNhatNhanVat() {
    if (tenNhanVat == 'Em Yêu ❤') {
        var imgNhanVat = './Data/img/Chapter/SwBun.GIF'
    }
    if (tenNhanVat == 'Anh Yêu ❤') {
        var imgNhanVat = './Data/img/Chapter/HunqD.GIF'
    }
    var NhanVat =  document.querySelector("#NhanVat");
    NhanVat.innerHTML = '<img src="'+ imgNhanVat +'" alt="" srcset="">'
    
}

function Reset() {
    // localStorage.clear();
    localStorage.removeItem("tenNhanVat");
    document.querySelector("#XacNhanNhanVat").style.display = "none";
    document.querySelector(".ChaoMung").style.display = "flex";
    document.querySelector(".TrangChu").style.display = "none";
}

function ThongBao(noidung) {
    var ThongBao =  document.querySelector(".ThongBao");
    ThongBao.style.display = 'block'
    ThongBao.innerHTML = '<p>'+ noidung +'</p>'
    setTimeout(() => {
        ThongBao.style.display = 'none'
    }, 2000);
}
DemNgayYeu();

function DemNgayYeu() {
// Lấy ngày hiện tại
var today = new Date();

// Lấy ngày 1/1/2021
var startDate = new Date(2021, 0, 1);

// Tính số ngày kể từ ngày 1/1/2021 đến ngày hiện tại
var daysCount = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

// Hiển thị số ngày lên trang web
document.getElementById("days").innerHTML = daysCount;
setTimeout(() => {
    DemNgayYeu()
}, 1000);
}
