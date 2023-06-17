var capDoCay = document.getElementById("CapDoCay");
var phanLoaiCay = document.getElementById("PhanLoaiCay");
var tenCay = document.getElementById("TenCay");
var cayTrong = document.getElementById("CayTrong");
var nuocCanTuoi = document.getElementById("NuocCanTuoi");
var nuocDaTuoi = document.getElementById("NuocDaTuoi");
var thoiGianTuoi = document.getElementById("ThoiGianTuoi");
var thoiGianHu = document.getElementById("ThoiGianHu");

var currentPlantIndex = 0; // Chỉ số cây đang chọn
var currentWaterLevel = 0; // Mức nước đã tưới

// Hàm cập nhật thông tin cây trồng
function updatePlantInfo(plant) {
    capDoCay.innerHTML = "Cấp độ: " + plant.PhanLoai;
    phanLoaiCay.innerHTML = "Phân loại: " + plant.PhanLoai;
    tenCay.innerHTML = "Tên cây: " + plant.TenCay;
    cayTrong.innerHTML = "<img src='" + plant.HinhCay1 + "' alt='Cây trồng'>";
    nuocCanTuoi.innerHTML = "Nước cần tưới: " + plant.TuoiNuoc1;
    nuocDaTuoi.innerHTML = "Nước đã tưới: " + currentWaterLevel;
    thoiGianTuoi.innerHTML = "Thời gian tưới: " + plant.ThoiGianTuoi + " phút";
    thoiGianHu.innerHTML = "Thời gian hủy: " + plant.ThoiGianHu + " giờ";
}

// Hàm lấy dữ liệu từ tệp JSON
function getPlantData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            callback(data);
        }
    };
    xhr.open("GET", "./DataGame/Plants.json", true);
    xhr.send();
}

// Hàm xử lý khi nhấn vào nút phân loại cây
function phanLoaiCay(phanLoai) {
    getPlantData(function(data) {
        var selectedPlant = data.find(function (plant) {
            return plant.PhanLoai === phanLoai;
        });

        if (selectedPlant) {
            currentPlantIndex = data.indexOf(selectedPlant);
            updatePlantInfo(selectedPlant);
        }
    });
}

// Hàm xử lý khi nhấn vào nút tưới cây
function tuoiCay() {
    getPlantData(function(data) {
        var selectedPlant = data[currentPlantIndex];

        if (selectedPlant) {
            currentWaterLevel++;
            nuocDaTuoi.innerHTML = "Nước đã tưới: " + currentWaterLevel;
        }
    });
}

// Mặc định hiển thị thông tin cây đầu tiên
getPlantData(function(data) {
    updatePlantInfo(data[currentPlantIndex]);
});