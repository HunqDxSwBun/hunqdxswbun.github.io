// function clickCounter() {
//     var count = localStorage.clickcount = Number(localStorage.clickcount)+1;
    
//     if (isNaN(count) === true) {
//     	count = localStorage.clickcount = 1;
//     	document.getElementById("result").innerHTML = count;
//     } else {
//    		document.getElementById("result").innerHTML = count;
//     }
// } 
// function resetCounter() {
// 	var reset = localStorage.clickcount = 0;
//     document.getElementById("result").innerHTML = reset;
// }
// function Changer() { 
//   localStorage.clickcount = 10;
// }


// Load Game
function OnLOAD() {
    ReloadItem();
    TimeGame();
    ReLoadTree();
}


// Thông số Game
var MoneyHung = 5;
var MoneyThy = 5;

// Thông Số Lưu
var clicks = 0;
var LvTree = 0;
var Money = MoneyHung + MoneyThy;
var Water = 200;




// Chức Năng Cây
function FWater() {
    Water -= 1;
    ReloadItem();
}
function NangCapCay() {
    if (clicks == 100) {
        LvTree += 1;
        ReloadItem();
        ReLoadTree();
    };
}

// Chức năng Fix Lỗi 
function Rest() {
    LvTree = 0;
    clicks = 0;
    ReLoadTree();
}

// Tải Tiền, Nước, Cây, Vật Phẩm
function ReloadItem() {
    document.getElementById('Money').innerText = Money;
    document.getElementById('Water').innerText = Water;
    document.getElementById('Seed').innerText = LvTree;
}
function ReLoadTree() {
    // 690
    clicks = 0;
    TienDoTuoiCay();
    if (LvTree == 0) {
        var Tree = "./img/Plant/plant0.png";
        var Row = "50px 200px 230px 110px 100px"; 
    } else {
        if (LvTree == 1) {
            var Tree = "./img/Plant/plant1.gif";
            var Row = "50px 200px 200px 140px 100px";
        } else {
            if (LvTree == 2) {
                var Tree = "./img/Plant/plant2.gif";
                var Row = "50px 200px 200px 140px 100px";
            } else {
                if (LvTree == 3) {
                    var Tree = "./img/Plant/plant3.gif";
                    var Row = "50px 200px 200px 140px 100px";
                } else {
                    var Tree = "./img/Plant/meme.gif";
                }
            }
        }
    }

    document.getElementById('DivPlant').style.gridTemplateRows = Row;
    document.getElementById('iTree').src = Tree;
}

// Ngày & Đêm
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
function TimeGame() {
    var Time = formatAMPM(new Date);
    if (Time.includes('am') || Time <= "5:11 PM") {
        Day();
    } else {
        Night();
    }
}
function Night() {
    document.getElementById('iSky').src = "./img/data/moon.gif";
    document.getElementById('idCloud').src = "./img/data/Star.gif";
    document.body.classList.add('Night');
}
function Day() {
    document.getElementById('iSky').src = "./img/data/sun.gif";
    document.getElementById('idCloud').src = "./img/data/sky.gif";
    document.body.classList.remove('Night');
}

// Nhiệm Vụ

// Tưới Cây
function FTuoiCay() {
    if (Water >= 1) {
        TuoiCay();
    } else {
        Tips();
        document.getElementById('Tips').innerHTML = "Hết nước rồi :(";
    }
}
function TuoiCay() {
    FWater();
    HideTips();
    TienDoTuoiCay();
    document.getElementById('Watering').style.display = "block";
    document.getElementById('Watering').style.animationPlayState = "running";
    setTimeout(NgungTuoiCay, 2000);
}
function TienDoTuoiCay() {
    clicks += 10;
    if (clicks == 100) {
        NangCapCay();
        Tips();
        document.getElementById('TextTips').innerHTML = "Đã Nâng Cấp Thành Công \nCây cấp: " + LvTree;
    }
    if (clicks == 110) {
        clicks -= 110;
    }
    document.getElementById('iProgressTree').style.width = clicks + "%";
    document.getElementById('iProgressTree').style.animationPlayState = "running";
}
function NgungTuoiCay() {
    document.getElementById('Watering').style.display = "none";
    document.getElementById('Watering').style.animationPlayState = "paused";
}

// Mẹo, Thông Báo,...
function Tips() {
    NgungTuoiCay();
    document.getElementById('Tips').style.display = "block";
    setTimeout(HideTips, 5000);
}
function HideTips() {
    document.getElementById('Tips').style.display = "none";
}