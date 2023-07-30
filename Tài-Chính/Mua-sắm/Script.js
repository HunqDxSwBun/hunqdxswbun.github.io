const inputElements = document.querySelectorAll('.inputFM');
inputElements.forEach((input) => {
    input.addEventListener('input', formatNumber);
});

function formatNumber(event) {
    let input = event.target;
    let rawValue = input.value.replace(/\./g, ''); // Lưu trữ giá trị gốc (loại bỏ dấu chấm)
    let formattedValue = formatWithDots(rawValue);
    input.value = formattedValue;
    input.dataset.rawValue = rawValue; // Lưu trữ giá trị gốc trong thuộc tính 'data-raw-value'
}

function formatWithDots(value) {
    if (isNaN(value)) {
        return ''; // Nếu không phải là số thì trả về chuỗi rỗng
    }

    // Chuyển đổi giá trị thành số nguyên từ chuỗi đã loại bỏ dấu chấm
    let intValue = parseInt(value, 10);

    let parts = intValue.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join('.');
}


//Thêm hoặc giảm số lượng sản phẩm 
const inputNumbers = document.querySelectorAll('.input-number');
const btnIncrements = document.querySelectorAll('.btn-increment');
const btnDecrements = document.querySelectorAll('.btn-decrement');

// Định nghĩa hàm tăng giá trị
function incrementValue(event) {
    const targetInput = event.target.previousElementSibling;
    const currentValue = parseInt(targetInput.value);
    targetInput.value = currentValue + 1;
}

// Định nghĩa hàm giảm giá trị
function decrementValue(event) {
    const targetInput = event.target.nextElementSibling;
    const currentValue = parseInt(targetInput.value);
    targetInput.value = currentValue - 1;
}

// Thêm sự kiện click cho các nút +
btnIncrements.forEach(btn => {
    btn.addEventListener('click', incrementValue);
});

// Thêm sự kiện click cho các nút -
btnDecrements.forEach(btn => {
    btn.addEventListener('click', decrementValue);
});
window.addEventListener('DOMContentLoaded', loadItemsFromLocalStorage);

// JavaScript
function loadItemsFromLocalStorage() {
    const cartBox = document.querySelector('.CartBox');
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    storedItems.forEach((itemData) => {
        const { productName, productPrice, productQuantity, productPriceTotal } = itemData;

        // Tạo một div .Item mới và thêm nội dung vào nó
        const newItem = document.createElement('div');
        newItem.classList.add('Item');
        newItem.innerHTML = `
          <div class="ItemIMG">
            <img src="/Tài-Chính/IMG/icon.png" alt="icon">
          </div>
          <div class="ItemInfo">
            <div class="ItemName">
              <h1>${productName}</h1>
              <p>${productPrice}¥ x ${productQuantity}</p>
            </div>
            <div class="ItemTotal">
              <h1>${formatWithDots(productPriceTotal)}¥</h1>
            </div>
          </div>
          <div class="ItemFunc">
            <button onclick="deleteItem(this)"><i class="fa-solid fa-trash"></i></button>
            <button><i class="fa-solid fa-circle-check"></i></button>
          </div>
        `;

        // Thêm div .Item mới vào div .CartBox
        cartBox.appendChild(newItem);
    });
}

function addProduct() {
    // Lấy thông tin từ input
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productPriceCV = document.getElementById('productPrice').dataset.rawValue;
    const productQuantity = document.getElementById('productQuantity').value;
    const productPriceTotal = productPriceCV * productQuantity;

    // Tạo object để lưu thông tin Item
    const newItemData = {
        productName,
        productPrice,
        productQuantity,
        productPriceTotal,
    };

    // Lấy danh sách Item hiện tại từ localStorage
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Thêm Item mới vào danh sách
    storedItems.push(newItemData);

    // Lưu danh sách Item vào localStorage
    localStorage.setItem('cartItems', JSON.stringify(storedItems));

    // Tiếp tục xử lý như trong mã JavaScript ban đầu để hiển thị Item mới vừa thêm vào trang
    const cartBox = document.querySelector('.CartBox');
    const newItem = document.createElement('div');
    newItem.classList.add('Item');
    newItem.innerHTML = `
        <div class="ItemIMG">
          <img src="/Tài-Chính/IMG/icon.png" alt="icon">
        </div>
        <div class="ItemInfo">
          <div class="ItemName">
            <h1>${productName}</h1>
            <p>${productPrice}¥ x ${productQuantity}</p>
          </div>
          <div class="ItemTotal">
            <h1>${formatWithDots(productPriceTotal)}¥</h1>
          </div>
        </div>
        <div class="ItemFunc">
          <button onclick="deleteItem(this)"><i class="fa-solid fa-trash"></i></button>
          <button><i class="fa-solid fa-circle-check"></i></button>
        </div>
      `;

    // Thêm div .Item mới vào div .CartBox
    cartBox.appendChild(newItem);

    // Xóa giá trị các input sau khi thêm Item thành công
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productPrice').dataset.rawValue = 0;
    document.getElementById('productQuantity').value = 1;
}

function deleteItem(item) {
    const cartBox = document.querySelector('.CartBox');
    const itemElement = item.closest('.Item');

    // Lấy tên sản phẩm của Item để xóa khỏi localStorage
    const itemName = itemElement.querySelector('.ItemName h1').textContent;

    // Lấy danh sách Item hiện tại từ localStorage
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Lọc ra các Item trừ Item hiện tại để cập nhật lại danh sách
    const updatedItems = storedItems.filter(
        (itemData) => itemData.productName !== itemName
    );

    // Lưu danh sách Item đã cập nhật vào localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));

    // Xoá div .Item chứa nút "Xoá"
    cartBox.removeChild(itemElement);

    // Cập nhật tổng giá sản phẩm sau khi xoá (nếu cần)
    // ...
}

function updateTotalPrice(price, quantity) {

    // Tính tổng giá mới
    const newTotal = currentTotal + price * quantity;

    // Cập nhật lại tổng giá
    document.querySelector('.WalletBox h1').textContent = newTotal + '¥';
}