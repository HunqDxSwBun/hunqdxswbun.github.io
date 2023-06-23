document.addEventListener('DOMContentLoaded', function () {
  const hash = window.location.hash;

  if (hash && hash !== '') {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

const rssUrl1 = 'https://hunqdswbun.data.blog/feed/';
const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=';

fetch(proxyUrl + encodeURIComponent(rssUrl1))
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const items = data.querySelectorAll("item");

    let storyCount = 0;
    let storyHTML = '';

    items.forEach((item, index) => {
      storyCount++;

      const title = item.querySelector("title").textContent;
      const encoded = item.querySelector("encoded").textContent;
      const pubDate = item.querySelector("pubDate").textContent;
      const creator = item.querySelector("creator").textContent;

      const pubDateTimeStamp = Date.parse(pubDate);
      const nowTimeStamp = Date.now();
      const timeDiff = nowTimeStamp - pubDateTimeStamp;

      // Chuyển khoảng thời gian từ millisecond sang giây, phút, giờ hoặc ngày
      const secondDiff = Math.floor(timeDiff / 1000);
      const minuteDiff = Math.floor(timeDiff / (1000 * 60));
      const hourDiff = Math.floor(timeDiff / (1000 * 60 * 60));
      const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      let timeDiffText = '';
      if (dayDiff > 0) {
        timeDiffText = dayDiff + " ngày trước";
      } else if (hourDiff > 0) {
        timeDiffText = hourDiff + " giờ trước";
      } else if (minuteDiff > 0) {
        timeDiffText = minuteDiff + " phút trước";
      } else {
        timeDiffText = "Vừa xong";
      }

      let author = '';
      let srcIMG = '';
      if (creator === 'HunqD') {
        author = 'Đinh Mạnh Hùng';
        srcIMG = 'https://graph.facebook.com/100045640179308/picture?type=large&amp;access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662';
      } else if (creator === 'hoangnguyen thythy') {
        author = 'Hoàng Nguyễn Thy Thy';
        srcIMG = 'https://graph.facebook.com/100074217488487/picture?type=large&amp;access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662';
      }


      storyHTML += `
      <div class="Feed" id="FeedID${storyCount}">
        <div class="Head">
            <div class="Author">
                <div class="Avatar">
                    <img src="/Data/icon/Logo-Square.png" alt="${author}">
                </div>
                <div class="Info">
                    <div class="Name">${author}</div>
                    <div class="Time">${timeDiffText}</div>
                </div>
            </div>
        </div>
        
        <div class="Body">
            <div class="Status">
                <h1>${title}</h1>
                <div class="Content">${encoded}</div>
            </div>
        </div>

        <div class="Bottom">
            <div class="BlockFunc">
                <div class="Func Share">
                    <i class="fa-solid fa-share-from-square"></i>
                </div>
            </div>
        </div>
      </div>
      `;
    });
    

    document.querySelector('#rss-feed').innerHTML = storyHTML;

    
    // Lấy tất cả các div có lớp wp-block-video
    var videoDivs = document.querySelectorAll('.wp-block-video');
    // Lặp qua từng div và tìm thẻ video trong mỗi div
    videoDivs.forEach(function (videoDiv) {
        var video = videoDiv.querySelector('video');
        if (video) {
            video.setAttribute('webkit-playsinline', '');
            video.setAttribute('playsinline', '');
            video.removeAttribute('controls', ''); // Thêm thuộc tính controls nếu chưa có
        }
    });

    
    const videos = document.querySelectorAll('.wp-block-video video');

    videos.forEach(video => {
      video.addEventListener('click', function () {
        // Dừng tất cả các video khác
        videos.forEach(otherVideo => {
          if (otherVideo !== video) {
            otherVideo.pause();
          }
        });
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });
    });
    

    const shareButtons = document.querySelectorAll('.Func.Share');

    shareButtons.forEach(button => {
      button.addEventListener('click', function () {
        const story = button.closest('.Feed');
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


  })
  .catch(error => console.log(error));

  


