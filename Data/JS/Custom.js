
const inputs = document.querySelectorAll('.SettingBlock input[type="color"]');
  const resetButton = document.getElementById('resetColors');
  const defaultValues = {};

  inputs.forEach(input => {
    input.addEventListener('change', handleColorChange);
    defaultValues[input.id] = input.value;
  });

  resetButton.addEventListener('click', handleResetColors);

  function handleColorChange(event) {
    const variableName = `--${event.target.id}`;
    const colorValue = event.target.value;

    document.documentElement.style.setProperty(variableName, colorValue);
    localStorage.setItem(variableName, colorValue);
  }

  function handleResetColors() {
    inputs.forEach(input => {
      const variableName = `--${input.id}`;
      const defaultValue = defaultValues[input.id];

      document.documentElement.style.setProperty(variableName, defaultValue);
      localStorage.setItem(variableName, defaultValue);
      input.value = defaultValue;
    });
  }

  window.addEventListener('load', () => {
    inputs.forEach(input => {
      const variableName = `--${input.id}`;
      const colorValue = localStorage.getItem(variableName);

      if (colorValue) {
        document.documentElement.style.setProperty(variableName, colorValue);
        input.value = colorValue;
      }
    });
  });


const imageFileInput = document.getElementById('imageFileInput');
const saveImageBtn = document.getElementById('saveImageBtn');
const deleteImageBtn = document.getElementById('deleteImageBtn');
const homeElement = document.getElementById('Home');

saveImageBtn.addEventListener('click', handleSaveImage);
deleteImageBtn.addEventListener('click', handleDeleteImage);

function handleSaveImage() {
  const file = imageFileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const imageUrl = e.target.result;

      homeElement.style.backgroundImage = `url('${imageUrl}')`;
      localStorage.setItem('homeBackgroundImage', imageUrl);
    };

    reader.readAsDataURL(file);
  }
}

function handleDeleteImage() {
  homeElement.style.backgroundImage = '';
  localStorage.removeItem('homeBackgroundImage');
}

window.addEventListener('load', () => {
  const imageUrl = localStorage.getItem('homeBackgroundImage');

  if (imageUrl) {
    homeElement.style.backgroundImage = `url('${imageUrl}')`;
  }
});