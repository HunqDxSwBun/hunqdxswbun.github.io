
var password = "";
var passwordInput = document.getElementById("password-input");
var keypad = document.getElementById("keypad-container");
var myLove = document.querySelector(".MyLove");
var lockButton = document.getElementById("lock-button");

function showMyLove() {
	myLove.style.display = "block";
	document.querySelector('.FormPassword').style.display = 'none';
}

function hideMyLove() {
	myLove.style.display = "none";
	document.querySelector('.FormPassword').style.display = 'block';
	password = "";
	passwordInput.value = "";
}

lockButton.addEventListener("click", function() {
	hideMyLove();
});

if (localStorage.getItem("password") !== null) {
	password = localStorage.getItem("password");
	passwordInput.value = "*".repeat(password.length);
}

keypad.addEventListener("click", function(event) {
	var key = event.target;
	var keyValue = key.innerHTML;

	if (keyValue === "Xoá") {
		password = "";
		passwordInput.value = "";
	} else if (keyValue === "OK") {
		if (password === "150721") {
			alert("Đăng nhập thành công!");
			localStorage.setItem("password", password);
			showMyLove();
		} else {
			alert("Sai mật khẩu!");
			password = "";
			passwordInput.value = "";
		}
	} else {
		password += keyValue;
		passwordInput.value += "*";
		if (password === "150721") {
			localStorage.setItem("password", password);
			showMyLove();
		}
	}
});
if (localStorage.getItem("password") !== null) {
  password = localStorage.getItem("password");
  passwordInput.value = "*".repeat(password.length);
  showMyLove();
}

// Lưu trữ trạng thái của trang web
function storeStateInLocalStorage(state) {
	localStorage.setItem('my-web-page-state', JSON.stringify(state));
  }
  
  // Lấy trạng thái của trang web từ localStorage
  function getStateFromLocalStorage() {
	const state = localStorage.getItem('my-web-page-state');
	return state ? JSON.parse(state) : null;
  }
  
  // Sử dụng localStorage để lưu trữ thông tin mật khẩu
  function savePasswordToLocalStorage(password) {
	localStorage.setItem('my-web-page-password', password);
  }
  
  // Kiểm tra mật khẩu đã được lưu trữ trong localStorage hay chưa
  function checkPasswordInLocalStorage() {
	const password = localStorage.getItem('my-web-page-password');
	if (password === "150721") {
	  showMyLove();
	}
  }
  
  // Kiểm tra trạng thái của trang web khi tải lại
  window.addEventListener('load', () => {
	const state = getStateFromLocalStorage();
	if (state) {
	  if (state.isMyLoveVisible) {
		showMyLove();
	  } else {
		hideMyLove();
	  }
	  passwordInput.value = state.passwordInputValue;
	  password = state.password;
	} else {
	  passwordInput.value = "";
	  password = "";
	}
  
	checkPasswordInLocalStorage();
  });
  
  // Lưu trạng thái của trang web trước khi tải lại
  window.addEventListener('beforeunload', () => {
	storeStateInLocalStorage({
	  isMyLoveVisible: myLove.style.display === "block",
	  passwordInputValue: passwordInput.value,
	  password: password
	});
  });
  