const rssUrl1 = 'https://hunqdswbun.data.blog/feed/';
const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=';

fetch(proxyUrl + encodeURIComponent(rssUrl1))
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        const items = data.querySelectorAll("item");

        let Story = '';
        items.forEach(item => {
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
            let TimeDiff = '';
            if (dayDiff > 0) {
                TimeDiff = dayDiff + " ngày trước";
            } else if (hourDiff > 0) {
                TimeDiff = hourDiff + " giờ trước";
            } else if (minuteDiff > 0) {
                TimeDiff = minuteDiff + " phút trước";
            } else {
                TimeDiff = "Vừa xong";
            }

            let Author = '';
            let srcIMG = '';
            if (creator === 'HunqD') {
                Author = 'Đinh Mạnh Hùng';
                srcIMG = 'https://graph.facebook.com/100045640179308/picture?type=large&amp;access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662';
            } else if (creator === 'hoangnguyen thythy') {
                Author = 'Hoàng Nguyễn Thy Thy';
                srcIMG = 'https://graph.facebook.com/100074217488487/picture?type=large&amp;access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662';
            }

            const videoUrl = encoded.match(/src="(.*?)"/)[1];
            const videoBlockRegex = /<figure class="wp-block-video">([\s\S]*?)<\/figure>/gm;
            const contentWithoutVideoBlock = encoded.replace(videoBlockRegex, '');
            
            Story += `
        <div class="Story">
          <div class="Head">
            <div class="Author">
              <div class="Avatar">
                <img src="${srcIMG}" alt="${Author}">
              </div>
              <div class="Info">
                <div class="Name">${Author}</div>
                <div class="Time">${TimeDiff}</div>
              </div>
            </div>
            <div class="BlockFunc">
              <div class="Func Sound">
                <i class="fa-solid fa-volume-high"></i>
              </div>
              <div class="Func Share">
                <i class="fa-solid fa-share-nodes"></i>
              </div>
            </div>
          </div>
          <div class="Body">
            <div class="Video">
                <video>
                    <source src="${videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
          </div>
          <div class="Bottom">
            <div class="Content">
                <h1>${title}</h1>
                <p>${contentWithoutVideoBlock}</p>
            </div>
          </div>
        </div>
      `;
        });

        document.querySelector('#rss-feed').innerHTML = Story;

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

        const videos = document.querySelectorAll('video');
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
          soundFunc.addEventListener('click', function() {
            video.muted = !video.muted;
            if (video.muted) {
              icon.classList.replace('fa-volume-high', 'fa-volume-xmark');
            } else {
              icon.classList.replace('fa-volume-xmark', 'fa-volume-high');
            }
          });
        });
        
    })
    .catch(error => console.log(error));

// Lấy danh sách tất cả các thẻ video trên trang web
var videoTags = document.querySelectorAll('video');

