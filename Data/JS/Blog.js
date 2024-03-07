ReloadBlog();
function ReloadBlog() {

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
        const reverseIndex = items.length - index; // Tính chỉ số đếm ngược
        const storyId = `FeedID${reverseIndex}`; // Tạo id của div Feed

        const selectedLang = localStorage.getItem("selectedLang");
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
        if (selectedLang == 'vietnamese') {
          var daysOfWeek = ["Chủ Nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
        } else {
          var daysOfWeek = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
        }
        var dayOfWeek = daysOfWeek[dateObj.getDay()];
        var day = dateObj.getDate();
        var month = dateObj.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0, nên cần cộng thêm 1
        var year = dateObj.getFullYear();

        var formattedDate = dayOfWeek + ". " + day + "/" + month + "/" + year;

        if (selectedLang == 'vietnamese') {
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
        } else {
          if (dayDiff >= 365) {
            timeDiffText = formattedDate;
          } else if (dayDiff > 0) {
            timeDiffText = dayDiff + " 日前";
          } else if (hourDiff > 0) {
            timeDiffText = hourDiff + " 時間前";
          } else if (minuteDiff > 0) {
            timeDiffText = minuteDiff + " 分前";
          } else {
            timeDiffText = "ちょうど終わった";
          }
        }


        let author = '';
        let srcIMG = '';


        if (creator === 'HunqD') {
          if (selectedLang == 'vietnamese') {
            author = 'Anh Yêu ❤';
          } else {
            author = 'ハニー ❤';
          }
          srcIMG = './Data/IMG/AVTHung.jpg';
        } else if (creator === 'hoangnguyen thythy') {
          if (selectedLang == 'vietnamese') {
            author = 'Em Yêu ❤';
          } else {
            author = 'ハニー ❤';
          }

          srcIMG = 'https://graph.facebook.com/100074217488487/picture?width=9999&amp;access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662';
        }


        storyHTML += `
      <div class="Feed" id="${storyId}">
        <div class="Head">
            <div class="Author">
                <div class="Avatar">
                  <img src="${srcIMG}" alt="${author}">
                </div>
                <div class="Info">                                                                             
                  <div class="Name">${author}</div>
                  <div class="Time">${timeDiffText}</div>
                </div>
                <div class="Func Translate">
                  <button class="translateButton"><img src="./Data/Lang/VietNam.svg" alt="VietNam"></button>
                  <button class="translateButton2"><img src="./Data/Lang/Japan.svg" alt="Japan"></button>
                </div>
                <div class="Func Share">
                  <i class="fa-solid fa-paper-plane"></i>
                </div>
            </div>
        </div>
        
        <div class="Body">
            <div class="Status">
              <p class="ContentTranslate"></p>
              <h1 class="Title">${title}</h1>
              <div class="Content">${encoded}</div>
            </div>
        </div>
      </div>
      `;
      });

      // Bắt sự kiện nhấn vào nút dịch
      // $(document).on('click', '.translateButton', function () {
      //   var $this = $(this); // Lưu trữ $(this) trong một biến

      //   var sourceText = $this.closest('.Feed').find('.Title').html();
      //   var sourceText2 = $this.closest('.Feed').find('.Content').html(); // Lấy nội dung của .Content trong cùng một .Feed

      //   var sourceLang = 'auto';
      //   var targetLang = 'vi';
      //   // Loại bỏ các thẻ HTML không mong muốn và chuyển đổi ký tự đặc biệt HTML
      //   var cleanedText = cleanAndEncodeHTML('[ ' + sourceText + ' ]' + sourceText2);

      //   var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(cleanedText);


      //   $.getJSON(url, function (data) {
      //     Done2('Văn bản đã được dịch')
      //     var translatedText = data[0][0][0];
      //     var spacedText = translatedText.replace(/\s+/g, ' ');
      //     var boldedText = spacedText.replace(/\[([^\]]+)\]/g, '<b>$1</b> <br>');
      //     $this.closest('.Feed').find('.ContentTranslate').html(boldedText);
      //   });
      // });

      // $(document).on('click', '.translateButton2', function () {
      //   var $this = $(this); // Lưu trữ $(this) trong một biến

      //   var sourceText = $this.closest('.Feed').find('.Title').html();
      //   var sourceText2 = $this.closest('.Feed').find('.Content').html(); // Lấy nội dung của .Content trong cùng một .Feed

      //   var sourceLang = 'auto';
      //   var targetLang = 'ja';
      //   // Loại bỏ các thẻ HTML không mong muốn và chuyển đổi ký tự đặc biệt HTML
      //   var cleanedText = cleanAndEncodeHTML('[ ' + sourceText + ' ]' + sourceText2);

      //   var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(cleanedText);

      //   $.getJSON(url, function (data) {
      //     Done2('テキストは翻訳されました');
      //     var translatedText = data[0][0][0];
      //     var spacedText = translatedText.replace(/\s+/g, ' ');
      //     var boldedText = spacedText.replace(/\[([^\]]+)\]/g, '<b>$1</b> <br>');
      //     $this.closest('.Feed').find('.ContentTranslate').html(boldedText);
      //   });

      // });


      function cleanAndEncodeHTML(text) {
        if (!text) {
          console.error('Text is not defined or empty');
          return '';
        }

        // Loại bỏ các thẻ HTML không mong muốn
        text = text.replace(/<\/?[^>]+(>|$)/g, '');

        // Loại bỏ tất cả dấu cách
        text = text.replace(/\s+/g, '');

        // Chuyển đổi các ký tự đặc biệt HTML
        text = text.replace(/&/g, "&amp;");
        text = text.replace(/</g, "&lt;");
        text = text.replace(/>/g, "&gt;");

        return text;
      }








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
          const currentUrl = 'https://hunqdxswbun.github.io/';
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
            Warning('Lỗi', 'Trình duyệt của bạn không hỗ trợ chức năng chia sẻ.');
          }
        });
      });


      setTimeout(() => {
        const hash = window.location.hash;

        if (hash && hash !== '') {
          const targetElement = document.querySelector(hash);
          if (targetElement) {
            document.getElementById('tablinksStory').click();
            targetElement.className += " Active";
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 200);



      let latestItem = null;
      let latestPubDate = null;

      items.forEach(item => {
        const pubDate = item.querySelector("pubDate").textContent;
        const pubDateTimeStamp = Date.parse(pubDate);

        if (latestPubDate === null || pubDateTimeStamp > latestPubDate) {
          latestItem = item;
          latestPubDate = pubDateTimeStamp;
        }
      });

      if (latestItem !== null) {
        const selectedLang = localStorage.getItem("selectedLang");
        const title = latestItem.querySelector("title").textContent;
        let description = latestItem.querySelector("description").textContent;
        const pubDate = latestItem.querySelector("pubDate").textContent;
        const pubDateTimeStamp = Date.parse(pubDate);
        const nowTimeStamp = Date.now();
        const timeDiff = nowTimeStamp - pubDateTimeStamp;

        // Kiểm tra nếu độ dài của description lớn hơn 50
        if (description.length > 30) {
          // Cắt chuỗi description để giữ lại 50 ký tự đầu tiên
          description = description.substring(0, 30);
          // Thêm "..." vào cuối chuỗi cắt
          description += "...";
        }

        // Chuyển khoảng thời gian từ millisecond sang giây, phút, giờ hoặc ngày
        const secondDiff = Math.floor(timeDiff / 1000);
        const minuteDiff = Math.floor(timeDiff / (1000 * 60));
        const hourDiff = Math.floor(timeDiff / (1000 * 60 * 60));
        const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        let TimeDiff = '';

        if (selectedLang == 'vietnamese') {
          if (dayDiff > 0) {
            TimeDiff = dayDiff + " ngày trước";
          } else if (hourDiff > 0) {
            TimeDiff = hourDiff + " giờ trước";
          } else if (minuteDiff > 0) {
            TimeDiff = minuteDiff + " phút trước";
          } else {
            TimeDiff = "Vừa xong";
          }
        } else {
          if (dayDiff > 0) {
            TimeDiff = dayDiff + " 日前";
          } else if (hourDiff > 0) {
            TimeDiff = hourDiff + " 時間前";
          } else if (minuteDiff > 0) {
            TimeDiff = minuteDiff + " 分前";
          } else {
            TimeDiff = "ちょうど終わった";
          }
        }


        const NewPost = `
            <h1>${title}</h1>
            <p>${description}</p>
            <p id="LangA001"> ${TimeDiff}</p>
        `;

        document.querySelector('#NewPost').innerHTML = NewPost;
      }

    })
    .catch(error => console.log(error));
}

