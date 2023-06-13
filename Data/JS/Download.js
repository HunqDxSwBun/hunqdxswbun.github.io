
function downloadFile() {
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
          padding-bottom: 45px;
      }
  
      .rss-story {
          background-color: var(--StoryBG);
          padding: 10px;
          margin-top: 10px;
          border-radius: 10px;
      }
  
      .rss-story:first-child {
          margin-top: 0;
      }
  
      .rss-story h1 {
          font-size: 20px;
          margin-bottom: 5px;
      }
  
      .rss-story p:last-child {
          font-size: 14px;
          font-weight: 500;
          text-align: right;
          margin-top: 10px;
      }
  
      .rss-story img,
      .rss-story video,
      .rss-story iframe {
          max-width: calc(100% - 6px);
          max-height: 300px;
          border-radius: 10px;
          border: 3px solid var(--BodyCL);
          background-color: var(--BodyCL);
          margin-top: 10px;
      }
  
      .rss-story figure {
          text-align: center;
      }
  
      .rss-story figcaption {
          text-align: center;
          text-shadow: 0px 2px 6px #111111;
          font-size: 12px;
          font-weight: 600;
      }
  
      .rss-story hr {
          border: none;
          height: 2px;
          width: 80%;
          background-color: var(--BodyCL);
          margin: 10px auto;
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