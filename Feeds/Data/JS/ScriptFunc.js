
    // Lấy tất cả các div có lớp wp-block-video
    var videoDivs = document.querySelectorAll('.wp-block-video');

    // Lặp qua từng div và tìm thẻ video trong mỗi div
    videoDivs.forEach(function (videoDiv) {
        var video = videoDiv.querySelector('video');
        if (video) {
            video.setAttribute('webkit-playsinline', '');
            video.setAttribute('playsinline', '');
            video.setAttribute('controls', ''); // Thêm thuộc tính controls nếu chưa có
        }
    });



    const videos = document.querySelectorAll('.Story .wp-block-video video');
    videos.forEach(video => {
      video.addEventListener('click', function () {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });
    });

    const soundFuncs = document.querySelectorAll('.Func.Sound');
    soundFuncs.forEach(soundFunc => {
      const video = soundFunc.closest('.Story').querySelector('video');
      const icon = soundFunc.querySelector('i');
      soundFunc.addEventListener('click', function () {
        video.muted = !video.muted;
        if (video.muted) {
          icon.classList.replace('fa-volume-high', 'fa-volume-xmark');
        } else {
          icon.classList.replace('fa-volume-xmark', 'fa-volume-high');
        }
      });
    });

    const downloadButtons = document.querySelectorAll('.Func.Download');

    downloadButtons.forEach(button => {
      button.addEventListener('click', function () {
        const story = button.closest('.Story');
        const videoElement = story.querySelector('.Video video');
        const sourceElement = videoElement.querySelector('source');
        const videoSrc = sourceElement.src;

        // Tạo một thẻ <a> để tải video
        const downloadLink = document.createElement('a');
        downloadLink.href = videoSrc;
        downloadLink.download = 'VideoStory.mp4';
        downloadLink.click();
      });
    });

    const shareButtons = document.querySelectorAll('.Func.Share');

    shareButtons.forEach(button => {
      button.addEventListener('click', function () {
        const story = button.closest('.Story');
        const storyId = story.id;
        const currentUrl = 'https://hunqdxswbun.github.io/Feeds/';
        const shareUrl = `${currentUrl}#${storyId}`;

        // Cập nhật URL chứa #StoryID vào clipboard
        if (navigator.share) {
          navigator.share({
            url: shareUrl,
          })
            .then(() => console.log('Chia sẻ thành công'))
            .catch((error) => console.error('Lỗi chia sẻ:', error));
        } else {
          // Hiển thị thông báo cho các trình duyệt không hỗ trợ API Web Share
          alert('Trình duyệt của bạn không hỗ trợ chức năng chia sẻ.');
        }
      });
    });