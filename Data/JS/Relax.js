function RelaxMusic(feeling) {
    // Lấy đối tượng audio
    var audio = document.getElementById('myAudioRelax');

    // Lấy đường dẫn từ tập tin JSON
    var json = [
        {
            "Feeling": "HanhPhuc",
            "Src": "/Data/MusicRelax/SummerMusicMix.mp3"
        },
        {
            "Feeling": "BuonBa",
            "Src": "/Data/MusicRelax/RainyLofi.mp3"
        },
        {
            "Feeling": "BinhThuong",
            "Src": "/Data/MusicRelax/RainyLofi.mp3"
        },
        {
            "Feeling": "SoHai",
            "Src": "/Data/MusicRelax/AmbientMusic.mp3"
        },
        {
            "Feeling": "GianDu",
            "Src": "/Data/MusicRelax/LofiHipHop.mp3"
        },
        {
            "Feeling": "Vinahey",
            "Src": "/Data/MusicRelax/Vinahey.mp3"
        }
        ,
        {
            "Feeling": "TopTopRemix",
            "Src": "/Data/MusicRelax/TopTopRemix.mp3"
        }
       
    ];

    // Tìm đường dẫn tương ứng với cảm xúc
    var src = '';
    for (var i = 0; i < json.length; i++) {
        if (json[i].Feeling === feeling) {
            src = json[i].Src;
            break;
        }
    }

    // Cập nhật nguồn audio
    audio.src = src;

    
    // Bật hoặc tắt audio
    if (src !== '') {
        // Phát audio
        audio.play();

    } else {
        audio.pause();
    }
}

function RelaxMusicLive() {
    var audio = document.getElementById('myAudioRelax');
    var currentTime = new Date().getMinutes(); // Thay đổi giá trị này thành thời gian thực tế

    // Chuyển đổi thời gian hiện tại thành giây
    var currentSeconds = currentTime * 60 ;

    // Thiết lập thời gian bắt đầu của bài hát
    audio.currentTime = currentSeconds;
}