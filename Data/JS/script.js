
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

window.addEventListener("beforeunload", function() {
  if (myLove.style.display === "block") {
    localStorage.setItem("password", password);
  } else {
    localStorage.removeItem("password");
  }
});

