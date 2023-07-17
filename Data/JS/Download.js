
function downloadFile() {
  console.log('Đang tải');
  // Lấy nội dung của div Story
  var storyContent = document.getElementById('Story').innerHTML;

  // Tạo thẻ <style> và thêm nội dung CSS
  var styleTag = document.createElement('style');
  styleTag.innerHTML = `
      :root {
        --BodyCL: #ffffff;
        --HeadCL: #ff2655;
  
        --BodyBG: #ffc0cb;
        --StoryBG: #fa7f7f;
      }
      * {
        margin: 0;
      }
  
      body {
        background-size: cover;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: var(--BodyCL);
        background-color: var(--BodyBG);
      }
      .head{
        color: var(--HeadCL);
        text-align: center;
      }
     
#rss-feed {
  padding: 10px;
  padding-bottom: 50px;
}

.Feed {
  color: #fff;
  background-color: #111;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
}

.Feed:first-child {
  margin-top: 0;
}

.Feed:last-child {
  margin-bottom: 0;
}

.Feed.Active {
  background-color: #252525;
}

.Head .Author {
  display: flex;
}

.Head .Author .Avatar img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.Head .Author .Info {
  margin-left: 10px;
}

.Head .Author .Info .Name {
  font-size: 20px;
  font-weight: bold;
}

.Head .Author .Info .Time {
  font-size: 14px;
}

.wp-block-video video {
  max-width: 100%;
  margin: 5px 0;
}

.Body .Status {
  padding: 5px;
}

.Body .Status h1 {
  font-size: 20px;
  margin-bottom: 2px;
}

.figure {
  margin: 5px 0;
}

.Body .Status img,
.Body .Status video {
  max-width: 100%;
  border-radius: 10px;
  border: 3px solid #fff;
  box-sizing: border-box;
}

.Body .Status video {
  background-color: var(--HeadCL);
}


.Body .Status .Content .wp-smiley {
  border: none;
}

.Status .wp-block-gallery {
  column-count: 3 !important;
  --webkit-column-count: 2;
  --moz-column-count: 2;
  gap: 10px;
  margin: 5px 0;
}

.Status .wp-block-image {
  margin: 5px 0;
}

.Status .wp-block-gallery .wp-block-image {
  margin: 0 auto;
  text-align: center;
}

.Load {
  display: none;
}

.Bottom {
  display: none;
  width: 100%;
  margin: 10px 0;
}

.Bottom .RepMess {
  display: grid;
  grid-template-columns: 50px auto 50px 50px;
  background-color: #000;
  border-radius: 10px;
}

.Bottom .RepStory {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

}

.Bottom .RepStory textarea {
  width: 100%;
  min-height: 20px;
  padding: 5px;
  font-size: 18px;
  color: var(--BodyCL);
  background-color: var(--BodyBG);
  border: 2px solid var(--BodyCL);
  box-sizing: border-box;
  border-radius: 0;
  border-left: 0;
}

.Bottom .RepStory textarea:focus {
  outline: none;
}

.RepMess .Func {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--Female);
  ;
  border: 2px solid var(--BodyCL);
  border-left: none;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  box-sizing: border-box;
}

.RepMess .Func:nth-child(1) {
  border: 2px solid var(--BodyCL);
  border-right: 0;
  background-color: var(--BodyBG);
  border-radius: 0;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}

.RepMess .Func:nth-child(3) {
  background-color: var(--Male);
  border-left: 2px solid var(--BodyCL);
  border-left: 0;
  border-radius: 0;
  box-sizing: border-box;
}
    `;

  // Tạo nội dung HTML
  var htmlContent = '<html><head> <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />' + styleTag.outerHTML + '</head><body>' + storyContent + '</body></html>';

  // Tạo một đối tượng Blob từ nội dung HTML
  var blob = new Blob([htmlContent], { type: 'text/html' });

  // Tạo một đối tượng URL để tải xuống tệp tin HTML
  var downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = 'Story.html';
  downloadLink.click();
}