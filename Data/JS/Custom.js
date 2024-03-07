function openBackgroundModal() {
  const SoLuongAnh = 20;
  // const homeBackgroundImage = localStorage.getItem("homeBackgroundImage");
  // const url = new URL(homeBackgroundImage);
  // const imagePath = url.pathname;

  var modal = document.getElementById("backgroundModal");
  var modalContent = modal.querySelector('.SelectWallpaper');
  modalContent.innerHTML = ''; // Clear previous content

  var wallpaperDiv = document.createElement('div');
  wallpaperDiv.classList.add('Wallpaper');

  // Create image elements and append them to the modal content
  for (var i = 1; i <= SoLuongAnh; i++) {
    var imgSrc = `/Data/Wallpaper/${i}.jpg`;

    var imgDiv = document.createElement('div');
    imgDiv.classList.add('IMG');

    // if (homeBackgroundImage !== null) {
    //   if (imgSrc === imagePath) {
    //     imgDiv.classList.add('Active');
    //   }
    // }


    var imgElement = document.createElement('img');
    imgElement.src = imgSrc;
    imgElement.onclick = function () {
      setBackground(this.src);
      closeBackgroundModal();
      Done2('Đổi hình nền thành công')
    };

    imgDiv.appendChild(imgElement);
    wallpaperDiv.appendChild(imgDiv);
  }

  modalContent.appendChild(wallpaperDiv);
  modal.style.display = "block";
}

function setBackground(imageSrc) {
  const homeElement = document.getElementById('IMGBG');
  homeElement.style.backgroundImage = `url('${imageSrc}')`;
  localStorage.setItem('homeBackgroundImage', imageSrc);
}
function closeBackgroundModal() {
  var modal = document.getElementById("backgroundModal");
  modal.style.display = "none";
}





const imageFileInput = document.getElementById('imageFileInput');
const saveImageBtn = document.getElementById('saveImageBtn');
const deleteImageBtn = document.getElementById('deleteImageBtn');
const homeElement = document.getElementById('IMGBG');

saveImageBtn.addEventListener('click', handleSaveImage);
deleteImageBtn.addEventListener('click', handleDeleteImage);

function handleSaveImage() {
  const file = imageFileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageUrl = e.target.result;

      homeElement.style.backgroundImage = `url('${imageUrl}')`;
      localStorage.setItem('homeBackgroundImage', imageUrl);
    };

    reader.readAsDataURL(file);
  }
  Done('Cài đặt hình nền thành công.')
}

function handleDeleteImage() {
  homeElement.style.backgroundImage = '';
  localStorage.removeItem('homeBackgroundImage');
  closeBackgroundModal();
  Done('Đã xoá ảnh nền.');

}

window.addEventListener('load', () => {
  const imageUrl = localStorage.getItem('homeBackgroundImage');

  if (imageUrl) {
    homeElement.style.backgroundImage = `url('${imageUrl}')`;
  }
});

