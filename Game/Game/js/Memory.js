function Memory() {
var SuKien = 365;
var NgayHienTai = document.getElementById('iDaysLove').textContent;

var TrungGian = NgayHienTai * 100/ SuKien ; 
var MotNam = TrungGian.toFixed(0);

var NgayConLai = SuKien - NgayHienTai ;

document.getElementById("iProgressLove").style.width = MotNam + "%";
document.getElementById("iProgressLove").style.animationPlayState = "running";


document.getElementById("DaysMemoryPresent").textContent = 'Đã Yêu ' + (SuKien - NgayConLai) + ' Ngày' ;

document.getElementById("DaysMemory").textContent =  "Còn "+NgayConLai + " Ngày";
setTimeout(Birthdays,1000)
}

function Birthdays () {
    var NgayHienTai = new Date().getTime();

    var HunqD = new Date("Aug 30, 2022").getTime();
    var SwBun = new Date("Oct 19, 2022").getTime();

    var BDHunqD = HunqD - NgayHienTai  ;
    var HunqDdays = Math.floor(BDHunqD / (1000 * 60 * 60 * 24));
    var BDSwBun = SwBun - NgayHienTai  ;
    var SwBundays = Math.floor(BDSwBun / (1000 * 60 * 60 * 24));

    
    // Số Ngày đã qua 
    var a = 365 - HunqDdays ; 
    var b = a * 100/ 365 ;
    var SinhNhatHung = b.toFixed(0);

    var c = 365 - SwBundays ; 
    var d = c * 100/ 365 ;
    var SinhNhatThy = d.toFixed(0);

    document.getElementById("iBirthdayHunqD").style.width = SinhNhatHung + "%";
    document.getElementById("iBirthdayHunqD").style.animationPlayState = "running";
    document.getElementById("DaysHunqD").textContent =  "Còn "+HunqDdays + " Ngày";


    document.getElementById("iBirthdaySwBun").style.width = SinhNhatThy + "%";
    document.getElementById("iBirthdaySwBun").style.animationPlayState = "running";
    document.getElementById("DaysSwBun").textContent =  "Còn "+SwBundays + " Ngày";

}