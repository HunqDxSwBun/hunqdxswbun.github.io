var data = {
    "vietnamese":
    {
        "HYears": "Năm",
        "HMonths": "Tháng",
        "HDays": "Ngày", 
        "HHours": "Giờ",
        "HMins": "Phút",
        "HSecs": "Giây",
        "HMale": "Mạnh Hùng",
        "HFemale": "Thy Thy",
        "FHead": "Bảng tin",
        "EHead": "Sự kiện",
        "MText1": "Đang phát",
        "MText2": '<i class="fa-solid fa-circle"></i> Trực tiếp'
        
    },
    
    "japanese":
    {
        "HYears": "年",
        "HMonths": "月",
        "HDays": "日", 
        "HHours": "時",
        "HMins": "分",
        "HSecs": "秒",
        "HMale": "マン フン",
        "HFemale": "ティ ティ",
        "FHead": "餌",
        "EHead": "イベント",
        "MText1": "今プレイ中",
        "MText2": '<i class="fa-solid fa-circle"></i> 直接'
        
    }
}

const changeLangBtn = document.getElementById("Months");

const HYears = document.querySelector("#Years .unit");
const HMonths = document.querySelector("#Months .unit");
const HDays = document.querySelector(".DGrid.Date");
const HHours = document.querySelector("#Hours .unit");
const HMins = document.querySelector("#Mins .unit");
const HSecs = document.querySelector("#Secs .unit");

const HMale = document.querySelector(".Info.Male .Name");
const HFemale = document.querySelector(".Info.Female .Name");

const FHead = document.querySelector("#Story h1.head");
const EHead = document.querySelector("#Event h1.head");

const MText1 = document.querySelector("#Music .player .dashboard .Header header h4");
const MText2 = document.querySelector("#LiveNoti");


// Kiểm tra xem có ngôn ngữ đã được lưu không
let currentLang = localStorage.getItem("selectedLang") || "vietnamese";

// Cập nhật dữ liệu cho ngôn ngữ hiện tại
updateLanguage(currentLang);

changeLangBtn.addEventListener("click", () => {
    // Đổi ngôn ngữ
    currentLang = currentLang === "vietnamese" ? "japanese" : "vietnamese";
    if (currentLang == 'vietnamese') {
        Done2('Đã chuyển sang Tiếng Việt')
    } else {
        Done2('日本語に切り替えました')
    }
   setTimeout(() => {
    ReloadBlog();
    ReloadEvent();
    location.reload();
   }, 1000);
 
    // Lưu ngôn ngữ đã chọn
    localStorage.setItem("selectedLang", currentLang);

    // Cập nhật dữ liệu cho ngôn ngữ mới
    updateLanguage(currentLang);
});

function updateLanguage(lang) {
    HYears.textContent = data[lang].HYears;
    HMonths.textContent = data[lang].HMonths;
    HDays.textContent = data[lang].HDays;
    HHours.textContent = data[lang].HHours;
    HMins.textContent = data[lang].HMins;
    HSecs.textContent = data[lang].HSecs;

    HMale.textContent = data[lang].HMale;
    HFemale.textContent = data[lang].HFemale;

    FHead.textContent = data[lang].FHead;
    EHead.textContent = data[lang].EHead;

    MText1.textContent = data[lang].MText1;
    MText2.innerHTML = data[lang].MText2;
}
