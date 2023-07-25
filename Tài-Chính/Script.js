function openTab(evt, Tabname) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("Tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("Func");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(Tabname).style.display = "block";
    evt.currentTarget.className += " active";
}

let cashAmount = 0;
let cardAmount = 0;
let totalAmount = 0;
let transactionsHistory = [];
let debtAmount = 0;
let savingsAmount = 0;

document.addEventListener('DOMContentLoaded', function () {
    // Lấy giá trị tiền mặt từ localStorage (nếu tồn tại), nếu không thì mặc định là 0
    cashAmount = parseInt(localStorage.getItem('cashAmount')) || 0;
    cardAmount = parseInt(localStorage.getItem('cardAmount')) || 0;
    totalAmount = parseInt(localStorage.getItem('totalAmount')) || 0;
    debtAmount = parseInt(localStorage.getItem('debtAmount')) || 0;
    savingsAmount = parseInt(localStorage.getItem('savingsAmount')) || 0;

    // Hiển thị giá trị số tiền mặt và tiền thẻ trong các phần tử displayCash và displayCard
    const displayCash = document.getElementById('displayCash');
    const displayCard = document.getElementById('displayCard');
    const displayTotal = document.getElementById('displayTotal');
    const tiennoDiv = document.getElementById('tienno');
    const savingsTotalDiv = document.getElementById('savingsTotal');


    displayCash.innerText = cashAmount.toLocaleString();
    displayCard.innerText = cardAmount.toLocaleString();
    displayTotal.innerText = totalAmount.toLocaleString();
    tiennoDiv.innerText = debtAmount.toLocaleString();
    savingsTotalDiv.innerText = savingsAmount.toLocaleString();

    const savedTransactions = localStorage.getItem('transactionsHistory');
    if (savedTransactions) {
        transactionsHistory = JSON.parse(savedTransactions);
    }

    // Hiển thị lịch sử giao dịch
    displayTransactionHistory();
});

function displayTransactionHistory() {
    const transactionDiv = document.getElementById('Transactions');
    transactionDiv.innerHTML = ''; // Xóa các giao dịch hiện tại để hiển thị lại toàn bộ lịch sử

    for (const transaction of transactionsHistory) {
        const p = document.createElement('p');
        p.innerText = transaction;
        transactionDiv.appendChild(p);
    }
}

function addMoney(x) {
    const cashValue = parseInt(document.getElementById('cash').value) || 0;
    const cardValue = parseInt(document.getElementById('card').value) || 0;
    const cashWithdrawValue = parseInt(document.getElementById('cashWithdraw').value) || 0;
    const cardWithdrawValue = parseInt(document.getElementById('cardWithdraw').value) || 0;
    const TotalMoney = document.getElementById('displayTotal');
    const displayCash = document.getElementById('displayCash');
    const displayCard = document.getElementById('displayCard');

    // Cộng dồn số tiền mặt và tiền thẻ từ người dùng
    if (x === undefined || x === 0) {
        cashAmount += cashValue;
    } else {
        cashAmount += x;
    }
    cardAmount += cardValue;

    // Trừ số tiền mặt và tiền thẻ từ người dùng
    cashAmount -= cashWithdrawValue;
    cardAmount -= cardWithdrawValue;

    // Cộng dồn giá trị mới từ người dùng vào tổng tiền
    const totalValue = cashAmount + cardAmount;

    TotalMoney.innerText = totalValue.toLocaleString();
    displayCash.innerText = cashAmount.toLocaleString();
    displayCard.innerText = cardAmount.toLocaleString();

    const data = {
        Money: {
            cash: cashAmount,
            card: cardAmount,
            total: totalValue,
        },
        Withdraw: {
            cash: cashWithdrawValue,
            card: cardWithdrawValue
        }
    };

    console.log(JSON.stringify(data, null, 2));

    // Reset các giá trị input về 0 sau khi nhấn nút "Nhập"
    document.getElementById('cash').value = 0;
    document.getElementById('card').value = 0;
    document.getElementById('cashWithdraw').value = 0;
    document.getElementById('cardWithdraw').value = 0;

    localStorage.setItem('cashAmount', cashAmount);
    localStorage.setItem('cardAmount', cardAmount);
    localStorage.setItem('totalAmount', totalValue);

    let transactionMessage = new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString() + ' - ';
    const cashNote = document.getElementById('cashNote').value.trim();
    const cashWithdrawNote = document.getElementById('cashWithdrawNote').value.trim();

    if (cashValue > 0 || cardValue > 0 || cashWithdrawValue > 0 || cardWithdrawValue > 0) {
        if (cashValue > 0) {
            transactionMessage += 'Đã thêm ' + cashValue.toLocaleString() + 'đ vào tài khoản [Tiền mặt].';
            if (cashNote !== '') {
                transactionMessage += cashNote + '.';
            }
        }

        if (cardValue > 0) {
            if (transactionMessage !== new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString() + ' - ') {
                transactionMessage += '\n' + new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString() + ' - ';
            }
            transactionMessage += 'Đã thêm ' + cardValue.toLocaleString() + 'đ vào tài khoản [Tiền thẻ].';
            if (cashNote !== '') {
                transactionMessage += cashNote + '.';
            }
        }

        if (cashWithdrawValue > 0) {
            if (transactionMessage !== new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString() + ' - ') {
                transactionMessage += '\n' + new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString() + ' - ';
            }
            transactionMessage += 'Đã trừ ' + cashWithdrawValue.toLocaleString() + 'đ từ tài khoản [Tiền mặt].';
            if (cashWithdrawNote !== '') {
                transactionMessage += cashWithdrawNote + '.';
            }
        }

        if (cardWithdrawValue > 0) {
            if (transactionMessage !== new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString() + ' - ') {
                transactionMessage += '\n' + new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString() + ' - ';
            }
            transactionMessage += 'Đã trừ ' + cardWithdrawValue.toLocaleString() + 'đ từ tài khoản [Tiền thẻ].';
            if (cashWithdrawNote !== '') {
                transactionMessage += cashWithdrawNote + '.';
            }
        }
        displayTransaction(transactionMessage);

        // Thêm giao dịch mới vào đầu danh sách
        transactionsHistory.unshift(transactionMessage);

        SaveHistory();
        displayTransactionHistory();
        changeColor();
    }
}
function SaveHistory() {
    // Giới hạn số lượng giao dịch lưu lại (nếu muốn)
    const maxTransactionHistory = 50; // Số lượng giao dịch tối đa muốn lưu lại
    if (transactionsHistory.length > maxTransactionHistory) {
        transactionsHistory.pop();
    }

    // Lưu lịch sử giao dịch vào localStorage
    localStorage.setItem('transactionsHistory', JSON.stringify(transactionsHistory));
}


function recordDebt() {
    const debtWho = document.getElementById('debtWho').value;
    const debtValue = parseInt(document.getElementById('debtAmount').value) || 0;
    const payWho = document.getElementById('payWho').value;
    const payAmount = parseInt(document.getElementById('payAmount').value) || 0;

    let transactionMessage = new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString() + ' - ';

    if (debtValue > 0) {
        addMoney(debtValue)
        debtAmount -= debtValue;
        const tiennoDiv = document.getElementById('tienno');
        tiennoDiv.innerText = debtAmount.toLocaleString();
        localStorage.setItem('debtAmount', debtAmount);
        transactionMessage += 'Đã mượn ' + debtValue.toLocaleString() + 'đ của ' + debtWho + ' vào tài khoản [Tiền mặt].';
        displayTransaction(transactionMessage);
        transactionsHistory.unshift(transactionMessage);
        SaveHistory();
        changeColor();
    }
    if (debtAmount < 0) {
        if (payAmount > 0) {
            addMoney(-payAmount)
            debtAmount += payAmount;
            const tiennoDiv = document.getElementById('tienno');
            tiennoDiv.innerText = debtAmount.toLocaleString();
            localStorage.setItem('debtAmount', debtAmount);
            transactionMessage += 'Đã trả ' + payAmount.toLocaleString() + 'đ cho ' + payWho + ' bằng tài khoản [Tiền mặt].';
            displayTransaction(transactionMessage);
            transactionsHistory.unshift(transactionMessage);
            SaveHistory();
            changeColor();

        }
    } else {
        alert('Có nợ ai đâu mà trả 🤔')
    }

    document.getElementById('debtWho').value = '...';
    document.getElementById('payWho').value = '...';
    document.getElementById('debtAmount').value = 0;
    document.getElementById('payAmount').value = 0;

}

function saveSavings() {
    let transactionMessage = new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString() + ' - ';
    const savingsValue = parseInt(document.getElementById('savingsAmount').value) || 0;
    if (savingsValue > 0) {
        savingsAmount += savingsValue;
        const savingsTotalDiv = document.getElementById('savingsTotal');
        savingsTotalDiv.innerText = savingsAmount.toLocaleString();
        localStorage.setItem('savingsAmount', savingsAmount);

        transactionMessage += 'Đã tiết kiệm ' + savingsValue.toLocaleString() + 'đ vào tài khoản [Tiết kiệm].';
        displayTransaction(transactionMessage);
        transactionsHistory.unshift(transactionMessage);
        SaveHistory();
        changeColor();
    }
    document.getElementById('savingsAmount').value = 0;
    document.getElementById('withdrawalAmount').value = 0;
}


function withdrawSavings() {
    let transactionMessage = new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString() + ' - ';
    const withdrawalValue = parseInt(document.getElementById('withdrawalAmount').value) || 0;
    if (withdrawalValue > 0 && withdrawalValue <= savingsAmount) {
        savingsAmount -= withdrawalValue;
        const savingsTotalDiv = document.getElementById('savingsTotal');
        savingsTotalDiv.innerText = savingsAmount.toLocaleString();

        localStorage.setItem('savingsAmount', savingsAmount);
        transactionMessage += 'Đã rút ' + withdrawalValue.toLocaleString() + 'đ từ tài khoản [Tiết kiệm].';
        displayTransaction(transactionMessage);
        transactionsHistory.unshift(transactionMessage);
        SaveHistory();
        changeColor();
    } else {
        alert('vượt quá số dư');
    }
    document.getElementById('savingsAmount').value = 0;
    document.getElementById('withdrawalAmount').value = 0;

}


function TinhTienMuaHang() {
    var GiaGocSanPham = document.getElementById('GiaGocSanPham').value;
    var GiaSanPham = document.getElementById('GiaSanPham').value;
    var CoNenMuaKhong = document.getElementById('CoNenMuaKhong');

    var ptram = GiaSanPham * 100 / totalAmount;
    var giamgia = GiaGocSanPham - GiaSanPham;
    var ptramgiamgia = giamgia * 100 / GiaGocSanPham;

    if (GiaSanPham >= totalAmount) {
        if (ptramgiamgia >= 50) {
            CoNenMuaKhong.innerHTML = `
        <p class="alert red">Nếu mua sẽ hết <strong>${ptram.toFixed(1)}%</strong> tổng số tiền của bạn.</p>
        <p class="alert green" >Giảm được <strong>${giamgia.toLocaleString()}đ | ${ptramgiamgia.toFixed(1)}%</strong> so với giá gốc.</p>
        `
        } else {
            CoNenMuaKhong.innerHTML = `
            <p class="alert red" >Nếu mua sẽ hết <strong>${ptram.toFixed(1)}%</strong> tổng số tiền của bạn.</p>
            <p class="alert red" >Giảm được <strong>${giamgia.toLocaleString()}đ | ${ptramgiamgiaptram.toFixed(1)}%</strong> so với giá gốc.</p>
            `
        }
    }
    if (GiaSanPham < totalAmount) {
        if (ptramgiamgia >= 20) {
            CoNenMuaKhong.innerHTML = `
        <p class="alert green">Nếu mua sẽ hết <strong>${ptram.toFixed(1)}%</strong> tổng số tiền của bạn.</p>
        <p class="alert green" >Giảm được <strong>${giamgia.toLocaleString()}đ | ${ptramgiamgiaptram.toFixed(1)}%</strong> so với giá gốc.</p>
        `
        } else {
            CoNenMuaKhong.innerHTML = `
            <p class="alert green">Nếu mua sẽ hết <strong>${ptram.toFixed(1)}%</strong> tổng số tiền của bạn.</p>
            <p>Giảm được <strong>${giamgia.toLocaleString()}đ | ${ptramgiamgiaptram.toFixed(1)}%</strong> so với giá gốc.</p>
            `
        }
    }


}






function displayTransaction(message) {
    const transactionDiv = document.getElementById('Transactions');
    const p = document.createElement('p');
    p.innerText = message;
    // Thêm giao dịch mới vào đầu danh sách
    transactionDiv.insertBefore(p, transactionDiv.firstChild);
}


// Hàm thực hiện chức năng xuất giao dịch ra file text
function exportTransactions() {
    const textToSave = transactionsHistory.join('\n');
    const blob = new Blob([textToSave], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Lịch Sử Giao Dịch.txt';
    a.click();
}

let clickCount = 0;
// Hàm thực hiện chức năng xoá toàn bộ giao dịch
function clearTransactions() {
    clickCount++;
    if (clickCount === 2) {
        transactionsHistory = [];
        localStorage.removeItem('transactionsHistory');
        displayTransactionHistory();
        clickCount = 0; // Reset số lần bấm về 0 sau khi xóa lịch sử
    }
}

function changeColor() {
    var spanElements = document.querySelectorAll('.Card.Money h1 ');

    for (var i = 0; i < spanElements.length; i++) {
        var spanElement = spanElements[i];
        var value = parseFloat(spanElement.innerText);


        if (value < 0) {
            spanElement.classList.add('red');
            spanElement.classList.remove('green');
        } else if (value > 1) {
            spanElement.classList.add('green');
            spanElement.classList.remove('red');
        } else {
            // Remove both classes if value is between 0 and 1
            spanElement.classList.remove('red', 'green');
        }
    }
}

// Call the function when the page loads and whenever the values change
window.addEventListener('load', changeColor);


function Clear() {
    localStorage.clear();
}