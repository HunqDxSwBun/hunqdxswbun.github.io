window.addEventListener('DOMContentLoaded', () => {
  const exchangeRate = localStorage.getItem('exchangeRate');
  const lastUpdated = localStorage.getItem('lastUpdated');

  if (exchangeRate && lastUpdated) {
    document.getElementById('CurrencyOUT').innerText = exchangeRate + ' VND';
    document.getElementById('CurrencyOUTlastUpdated').innerText = 'Cập nhật: ' + lastUpdated ;
  }
});
var xCurrency = 0 ;
function Currency() {
  xCurrency++;
  
  if (xCurrency === 1) {
    alert('Nhấn thêm 1 lẫn nữa để cập nhật tỉ giá');
  } else {
    if (xCurrency === 2) {
    localStorage.removeItem('exchangeRate');
    localStorage.removeItem('lastUpdated');
    fetch('https://api.currencyapi.com/v3/latest?apikey=UoxNnHpqRwtK03SnHBdcY7c7zIOC4J7c8FPT6ITp&base_currency=JPY')
    .then(response => response.json())
    .then(data => {
      const exchangeRate = data.data.VND.value.toFixed(0);
      const lastUpdated = new Date(data.meta.last_updated_at);
      const lastUpdatedLocal = lastUpdated.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

      document.getElementById('CurrencyOUT').innerText = exchangeRate + ' VND';
      document.getElementById('CurrencyOUTlastUpdated').innerText = 'Cập nhật: ' + lastUpdatedLocal;

      localStorage.setItem('exchangeRate', exchangeRate);
      localStorage.setItem('lastUpdated', lastUpdatedLocal);
    })
    .catch(error => {
      document.getElementById('CurrencyOUTlastUpdated').innerText = 'Đã xảy ra lỗi:', error;
    });
     alert('Đã cập nhật thành công.')
    }
    else {
        alert('Vì lý do nguồn cung cấp bên thứ 3 sẽ hạn chế số lần nhận dữ liệu nên hạn chế nhấn cập nhật nếu không cần thiết.')
    }
  }
}


// 300/Tài khoản * 10
// UoxNnHpqRwtK03SnHBdcY7c7zIOC4J7c8FPT6ITp - Đang sử dụng
// f6UXIJdlBt6NmXAeXCkWN33egbFSRgAEHh8fmKOV
// n40i0vguvkmE66qYHYnfRgFvzWJz6k3FmYvIXCju
// 6I5PaHCeGV0bm3SY746GPk37pdBRZprlRueMkb6h
// ADDbPPPmC7OcpTSAHWLtqvetLbEtLOMBiK8rhUty
// bO8kLpMDAurUlUNinrQOpb3NgstgxssLfCOqE1Wq
// LyEKFsunuTnM3NWh11vDOCjc5YwHBNc7W1MsNMyb
// 9Wj7qusC8P5xeDPISF8iCPIne6Ta1Nl1k6pAnv6E
// CckX9D70CeG1VP1TTqlt1ah6jRVC77myoM2jwWGr
// FfPkyhHVCu9hah2UZNXqc2hcjlBn7L6T6kTFOL2z
