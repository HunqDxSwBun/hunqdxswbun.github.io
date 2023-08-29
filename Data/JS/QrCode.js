const generateBtn = document.getElementById('generateBtn');
const qrText = document.getElementById('qrText');
const qrType = document.getElementById('qrType');
const textOptions = document.getElementById('textOptions');
const wifiOptions = document.getElementById('wifiOptions');
const wifiSecurity = document.getElementById('wifiSecurity');
const ssidInput = document.getElementById('ssid');
const passwordInput = document.getElementById('password');
const qrCodeContainer = document.getElementById('qrCode');

generateBtn.addEventListener('click', generateQRCode);
qrType.addEventListener('change', toggleWifiOptions);

function generateQRCode() {
    const type = qrType.value;

    if (type === 'wifi') {
        const securityType = wifiSecurity.value;
        const ssid = ssidInput.value;
        const password = passwordInput.value;

        let qrData = `WIFI:T:${securityType};S:${ssid};`;

        if (securityType !== 'none') {
            qrData += `P:${password};`;
        }

        qrCodeContainer.innerHTML = '';
        new QRCode(qrCodeContainer, qrData);
    } else {
        const text = qrText.value;
        qrCodeContainer.innerHTML = '';
        new QRCode(qrCodeContainer, text);
    }
    downloadBtn.style.display = 'block';
}

function toggleWifiOptions() {
    if (qrType.value === 'wifi') {
        wifiOptions.style.display = 'block';
        textOptions.style.display = 'none';
    } else {
        wifiOptions.style.display = 'none';
        textOptions.style.display = 'block';
    }
}

qrType.addEventListener('change', toggleWifiOptions);

const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('click', downloadQRCode);

function downloadQRCode() {
    const qrCodeImage = qrCodeContainer.querySelector('img');
    const qrDataURL = qrCodeImage.src;

    const link = document.createElement('a');
    link.href = qrDataURL;
    link.download = 'qr_code_hunqdswbun.png';
    link.click();
}