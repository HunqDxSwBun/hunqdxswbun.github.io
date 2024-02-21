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
    },
    
    "japanese":
    {
        "HYears": "年",
        "HMonths": "月",
        "HDays": "日", 
        "HHours": "時",
        "HMins": "分",
        "HSecs": "秒",
        "HMale": "Manh Hung",
        "HFemale": "Thy Thy",
        
    }
}

const langEl = document.querySelector(".LangSelect");
const link = document.querySelectorAll(".iConLang");

const HYears = document.querySelector("#Years .unit");
const HMonths = document.querySelector("#Months .unit");
const HDays = document.querySelector(".DGrid.Date");
const HHours = document.querySelector("#Hours .unit");
const HMins = document.querySelector("#Mins .unit");
const HSecs = document.querySelector("#Secs .unit");

const HMale = document.querySelector(".Info.Male .Name");
const HFemale = document.querySelector(".Info.Female .Name");



link.forEach((el) => {
    el.addEventListener("click", () => {
        langEl.querySelector(".active").classList.remove("active");
        el.classList.add("active");
        const attr = el.getAttribute("language");

        console.log(data[attr].HYears);
        HYears.textContent = data[attr].HYears;
        HMonths.textContent = data[attr].HMonths;
        HDays.textContent = data[attr].HDays;
        HHours.textContent = data[attr].HHours;
        HMins.textContent = data[attr].HMins;
        HSecs.textContent = data[attr].HSecs;

        HMale.textContent = data[attr].HMale;
        HFemale.textContent = data[attr].HFemale;
       
    });
});