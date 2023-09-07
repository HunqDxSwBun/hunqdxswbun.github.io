ReloadBlog();
function ReloadBlog() {

  const rssUrl1 = 'https://htupload.wordpress.com/feed/';
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
        const reverseIndex = items.length + index; 
        const audioID = `AudioID${reverseIndex}`; // Tạo id của div Feed

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

        var dateObj = new Date(pubDate);
        var daysOfWeek = ["Chủ Nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
        var dayOfWeek = daysOfWeek[dateObj.getDay()];
        var day = dateObj.getDate();
        var month = dateObj.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0, nên cần cộng thêm 1
        var year = dateObj.getFullYear();

        var formattedDate = dayOfWeek + ". " + day + "/" + month + "/" + year;


        if (dayDiff >= 365) {
          timeDiffText = formattedDate;
        } else if (dayDiff > 0) {
          timeDiffText = dayDiff + " ngày trước";
        } else if (hourDiff > 0) {
          timeDiffText = hourDiff + " giờ trước";
        } else if (minuteDiff > 0) {
          timeDiffText = minuteDiff + " phút trước";
        } else {
          timeDiffText = "Vừa xong";
        }

        let author = '';
        if (creator === 'HunqD') {
          author = 'Anh Yêu ❤';
        } else if (creator === 'hoangnguyen thythy') {
          author = 'Em Yêu ❤';
        }

        // URL của Google Drive
        var googleDriveURL = encoded;

        // Sử dụng biểu thức chính quy để trích xuất mã
        var regex = /id=([^&]+)/;
        var match = googleDriveURL.match(regex);

        if (match) {
          var fileId = match[1];
        } else {
          console.log("Không thể trích xuất mã từ URL.");
        }


        storyHTML += `
      <div class="Feed">
        <div class="Head">
            <div class="Author">
                <div class="Info">                                                                             
                    <div class="Name">${author}</div>
                    <div class="Time">${timeDiffText}</div>
                </div>
            </div>
        </div>

        
        <div class="Body">
            <div class="Status">
                <h1>${title}</h1>
                <audio id="${audioID}" controls class="iru-tiny-player" data-title=" " style="display: none;">
                <source src="https://drive.google.com/uc?export=download&id=${fileId}">
            </audio>
            </div>
        </div>
      </div>
      `;
      });


      document.querySelector('#rss-feed').innerHTML = storyHTML;

      // Lớp phủ cho Audio
      var script = document.createElement('script');
      script.src = './TIMELINE/js/music.js';
      document.head.appendChild(script);


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

    })
    .catch(error => console.log(error));
}

