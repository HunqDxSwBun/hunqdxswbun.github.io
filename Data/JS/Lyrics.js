function OnLyric() {
    var x = document.getElementById("lyrics");
    var xx = document.getElementById("OnLyric"); 
    var dashboard = document.querySelector('.dashboard');

    if (x.style.display === "block") {
        x.style.display = "none";
        xx.classList.remove('active');
        dashboard.classList.remove('active')
    } else {
        x.style.display = "block";
        xx.classList.add('active');
        dashboard.classList.add('active')
        setTimeout(() => {
            lyrics();
        }, 500);
    }
}

function OffLyric() {
    var x = document.getElementById("lyrics");
    var xx = document.getElementById("OnLyric"); 
    x.style.display = "none";
    xx.classList.remove('active');
}

function lyrics() {
  
    // Hàm để tải nội dung của một tệp văn bản
    function loadTextFile(file, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                } else {
                    // Thông báo khi không thể tìm thấy tệp văn bản
                    var lyricsDiv = document.querySelector('#lyrics');
                    lyricsDiv.innerHTML = 'Không tìm thấy lời cho bài hát này.' ;
                }
            }
        };
        xhr.open("GET", file, true);
        xhr.send();
    }

    // Kiểm tra nội dung của .dashboard .Header header h2 và chuyển thành viết thường
    var headerContent = document.querySelector('.dashboard .Header header h2').textContent.trim();

    // Đường dẫn đến tệp văn bản chứa lời bài hát và chuyển thành viết thường
    var filePath = './Music/Lyrics/' + headerContent + '.txt';

    // Tải nội dung của tệp văn bản
    loadTextFile(filePath, function (lyrics) {
        if (lyrics.trim() !== "") {
            // Lấy thẻ #Lyrics
            var lyricsDiv = document.querySelector('#lyrics');

            // Xóa nội dung hiện tại của #Lyrics (nếu có)
            lyricsDiv.innerHTML = '';

            // Tạo một mảng chứa các dòng lời bài hát
            var lyricsArray = lyrics.split('\n');

            // Biến đếm số lượng dòng lời bài hát
            var lineCount = 0;

            // Thêm từng dòng lời bài hát vào #Lyrics, mỗi dòng trong một thẻ <p>
            lyricsArray.forEach(function (line) {
                // Tạo thẻ <p> để chứa dòng lời bài hát
                var paragraph = document.createElement('p');
                paragraph.textContent = line;
                lyricsDiv.appendChild(paragraph);

                // Tăng biến đếm số lượng dòng lời bài hát
                lineCount++;

                // Kiểm tra nếu đã thêm vào 4 dòng thì thêm một dòng trống
                if (lineCount % 4 === 0) {
                    // Tạo thẻ <br> để thêm dòng trống
                    var lineBreak = document.createElement('br');
                    lyricsDiv.appendChild(lineBreak);
                }
            });
        } else {
            // Thông báo khi không có lời bài hát cho bài hát được chọn
            var lyricsDiv = document.querySelector('#lyrics');
            lyricsDiv.innerHTML = '';
        }
    });

}
