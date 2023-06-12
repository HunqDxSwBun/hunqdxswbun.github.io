fetch('https://api.currencyapi.com/v3/latest?apikey=UoxNnHpqRwtK03SnHBdcY7c7zIOC4J7c8FPT6ITp&base_currency=JPY')
  .then(response => response.json())
  .then(data => {
    const exchangeRate = data.data.VND.value.toFixed(0);
    const lastUpdated = new Date(data.meta.last_updated_at);
    const lastUpdatedLocal = lastUpdated.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });


    // document.getElementById('Currency')
    document.getElementById('CurrencyOUT').innerText = exchangeRate + ' VND';
    document.getElementById('CurrencyOUTlastUpdated').innerText = 'Cập nhật: ' + lastUpdatedLocal;
  })
  .catch(error => {
    console.log('Đã xảy ra lỗi:', error);
  });

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