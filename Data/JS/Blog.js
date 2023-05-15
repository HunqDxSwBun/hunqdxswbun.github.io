const rssUrl1 = 'https://hunqdswbun.data.blog/feed/';
const proxyUrl = 'https://api.allorigins.win/raw?url=';


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
                TimeDiff = "vừa xong";
            }

            Story += `
    <div class="rss-story">
      <h1>${title}</h1>
      <p>${encoded} </p>
      <p class="time">${TimeDiff}</p>
    </div>
  `;
            //   <a href="${link}">Xem thêm</a>
        });

        document.querySelector('#rss-feed').innerHTML = Story;
       
       
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
            const title = latestItem.querySelector("title").textContent;
            const description = latestItem.querySelector("description").textContent;
            const pubDate = latestItem.querySelector("pubDate").textContent;
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
                TimeDiff = "vừa xong";
            }
        
            const NewPost = `
                <h1>${title}</h1>
                <p>${description}</p>
                <p> ${TimeDiff}</p>
            `;
        
            document.querySelector('#NewPost').innerHTML = NewPost;
        }
        
    })
    .catch(error => console.log(error));


