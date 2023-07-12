function createImage() {
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];

  var reader = new FileReader();
  reader.onload = function(event) {
    var img = new Image();
    img.onload = function() {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      var aspectRatio = img.width / img.height;
      var size = Math.min(img.width, img.height);
      var xOffset = 0;
      var yOffset = 0;

      if (aspectRatio > 1) {
        size = img.height;
        xOffset = (img.width - size) / 2;
      } else if (aspectRatio < 1) {
        size = img.width;
        yOffset = (img.height - size) / 2;
      }

      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, xOffset, yOffset, size, size, 0, 0, size, size);

      var frameSelect = document.getElementById('frameSelect');
      var selectedFrame = frameSelect.options[frameSelect.selectedIndex].value;

      var frame = new Image();
      frame.onload = function() {
        ctx.drawImage(frame, 0, 0, size, size);
        var resultImg = document.createElement('img');
        resultImg.src = canvas.toDataURL();
        document.getElementById('outpic').innerHTML = '';
        document.getElementById('outpic').appendChild(resultImg);
        document.getElementById('outbtnDownload').style.display = 'block';
      };
      frame.src = selectedFrame;

    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function downloadImage() {
  var imgSrc = document.getElementById('outpic').querySelector('img').src;
  var link = document.createElement('a');
  link.href = imgSrc;
  link.download = '2YearsAnniversary.png';
  link.click();
}