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

function addProduct() {
  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;
  const productQuantity = document.getElementById("productQuantity").value;
  const productPriceCV = document.getElementById('productPrice').dataset.rawValue;
  if (productName && productPrice && productQuantity) {
      const cartBox = document.getElementById("CartBox");

      // Create a new div element for the product item
      const newItem = document.createElement("div");
      newItem.classList.add("Item");

      // Fill in the content for the new item
      newItem.innerHTML = `
          <div class="ItemName">
              <h1>${productName} <span>x ${productQuantity}</span></h1>
              <p>Giá: ${productPrice}</p>
              <p>Tổng: ${formatNumber(productPriceCV * productQuantity)}</p>
          </div>
          <div class="ItemFunc">
              <button onclick="removeProduct(this)">Xoá</button>
              <button onclick="markAsPurchased('${productName}', ${productQuantity}, ${productPrice})">Đã Mua</button>
          </div>
      `;

      // Add the new item to the cart
      cartBox.appendChild(newItem);

      // Save the product to local storage
      saveProductToLocalStorage(productName, productPrice, productQuantity);

      // Clear the input fields
      document.getElementById("productName").value = "";
      document.getElementById("productPrice").value = "";
      document.getElementById("productQuantity").value = 1;
  }
}

function saveProductToLocalStorage(name, price, quantity) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push({ name, price, quantity });
  localStorage.setItem("products", JSON.stringify(products));
}

function removeProduct(button) {
  const itemDiv = button.closest(".Item");
  const productName = itemDiv.querySelector("h1 span").textContent;
  itemDiv.remove();

  // Remove the product from local storage
  removeProductFromLocalStorage(productName);
}

function removeProductFromLocalStorage(productName) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products = products.filter(product => product.name !== productName);
  localStorage.setItem("products", JSON.stringify(products));
}

function markAsPurchased(productName, productQuantity, productPrice) {
  alert(`Đã mua:\nTên sản phẩm: ${productName}\nSố lượng: ${productQuantity}\nGiá: ${productPrice}\nTổng: ${productPrice * productQuantity}`);
}

// Load existing products from local storage
function loadProductsFromLocalStorage() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  for (const product of products) {

      const cartBox = document.getElementById("CartBox");
      const newItem = document.createElement("div");
      newItem.classList.add("Item");
      newItem.innerHTML = `
          <div class="ItemName">
              <h1>${product.name} <span>x ${product.quantity}</span></h1>
              <p>Giá: ${product.price}</p>
              <p>Tổng: ${product.PriceCV * productQuantity}</p>
          </div>
          <div class="ItemFunc">
              <button onclick="removeProduct(this)">Xoá</button>
              <button onclick="markAsPurchased('${product.name}', ${product.quantity}, ${product.price})">Đã Mua</button>
          </div>
      `;
      cartBox.appendChild(newItem);
  }
}

// Load existing products from local storage when the page loads
loadProductsFromLocalStorage();