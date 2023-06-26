const socket = new WebSocket('wss://s9317.nyc1.piesocket.com/v3/1?api_key=iL0T9OF4NHWeeGmmqQKQbTOsz7Y8q4IzybT8uwgo&notify_self=1');
let personalCode = "";
let iconCustom = "";
let sttCustom = "";

socket.onopen = function () {

    // console.log('WebSocket connection established.');
};

socket.onmessage = function (event) {
    // console.log('WebSocket message received:', event.data);
    const data = JSON.parse(event.data);

    console.log(data);

    // Update UI based on received data
    if (data.personalCode === 'ABC123') {
        const peopleMale = document.querySelector('.People.Male');
        peopleMale.querySelector('h1').textContent = data.iconCustom;
        peopleMale.querySelector('p').textContent = data.sttCustom;
    } else if (data.personalCode === 'XYZ123') {
        const peopleFemale = document.querySelector('.People.Female');
        peopleFemale.querySelector('h1').textContent = data.iconCustom;
        peopleFemale.querySelector('p').textContent = data.sttCustom;
    }
};




function updateFeeling() {
    personalCode = document.getElementById('personalCode').value;
    iconCustom = document.getElementById('iconCustom').value;
    sttCustom = document.getElementById('sttCustom').value;

    // Update the UI for the current user
    if (personalCode === 'ABC123') {
        const peopleMale = document.querySelector('.People.Male');
        peopleMale.querySelector('h1').textContent = iconCustom;
        peopleMale.querySelector('p').textContent = sttCustom;
    } else if (personalCode === 'XYZ123') {
        const peopleFemale = document.querySelector('.People.Female');
        peopleFemale.querySelector('h1').textContent = iconCustom;
        peopleFemale.querySelector('p').textContent = sttCustom;
    }

    // Send data to WebSocket
    const data = {
        personalCode: personalCode,
        iconCustom: iconCustom,
        sttCustom: sttCustom
    };
    socket.send(JSON.stringify(data));

    // Clear input fields
    document.getElementById('personalCode').value = "";
    document.getElementById('iconCustom').value = "";
    document.getElementById('sttCustom').value = "";
}






// Lấy nội dung message mới nhất khi tải trang
// console.log('Nội dung message mới nhất:', latestMessage);
