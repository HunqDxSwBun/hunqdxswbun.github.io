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
  alert('Cài đặt hình nền thành công.')
}

function handleDeleteImage() {
  homeElement.style.backgroundImage = '';
  localStorage.removeItem('homeBackgroundImage');
  alert('Đã xoá ảnh nền.')

}

window.addEventListener('load', () => {
  const imageUrl = localStorage.getItem('homeBackgroundImage');

  if (imageUrl) {
    homeElement.style.backgroundImage = `url('${imageUrl}')`;
  }
});



const randomImageBtn = document.getElementById('randomImageBtn');
let currentImageIndex = 1;
const SoLuongAnh = 20;

randomImageBtn.addEventListener('click', handleRandomImage);

function handleRandomImage() {
  const imageUrl = `/Data/Wallpaper/${currentImageIndex}.jpg`;

  homeElement.style.backgroundImage = `url('${imageUrl}')`;
  localStorage.setItem('homeBackgroundImage', imageUrl);

  // Tăng giá trị currentImageIndex và kiểm tra điều kiện lặp lại
  currentImageIndex++;
  if (currentImageIndex > SoLuongAnh) {
    currentImageIndex = 1;
  }
}
