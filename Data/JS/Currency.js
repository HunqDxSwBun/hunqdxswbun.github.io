fetch('https://api.currencyapi.com/v3/latest?apikey=UoxNnHpqRwtK03SnHBdcY7c7zIOC4J7c8FPT6ITp&base_currency=JPY')
  .then(response => response.json())
  .then(data => {
    const exchangeRate = data.data.VND.value.toFixed(0);
    const lastUpdated = new Date(data.meta.last_updated_at);
    const lastUpdatedLocal = lastUpdated.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    
    // document.getElementById('Currency')
    document.getElementById('CurrencyOUT').innerText =  exchangeRate + ' VND';
    document.getElementById('CurrencyOUTlastUpdated').innerText = 'Cập nhật: ' + lastUpdatedLocal ;
  })
  .catch(error => {
    console.log('Đã xảy ra lỗi:', error);
  });

