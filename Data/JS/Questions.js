let currentQuestion = 0;
let score = 0;
let questions = [];
let skippedQuestion = false;
let hideTwoUsed = false;
let callFriendUsed = false;
let skipQuestionUsed = 0;
let timer;

function startGame() {
    fetch('./Questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            showQuestion();
        })
        .catch(error => console.error('Error fetching questions:', error));
}

function showQuestion() {
    clearTimeout(timer); // Xóa bỏ hẹn giờ trước đó (nếu có)

    const questionDiv = document.querySelector('.question');
    const DapAnDiv = document.querySelector('.DapAn');
    const timerDiv = document.querySelector('.timer');
    const countdownSpan = document.querySelector('.countdown');
    const resultDiv = document.querySelector('.result');
    const startBtn = document.getElementById('start-btn');

    if (currentQuestion < questions.length) {
        questionDiv.style.display = 'block';
        DapAnDiv.style.display = 'block';
        timerDiv.style.display = 'block'; // Hiển thị đồng hồ đếm ngược
        resultDiv.innerText = '';
        startBtn.style.display = 'none';

        // Show the question image
        const questionImage = document.querySelector('.question-image');
        questionImage.src = questions[currentQuestion].HinhAnh;

        // Show the question text
        const questionText = document.querySelector('.question-text');
        questionText.innerText = questions[currentQuestion].CauHoi;

        // Update the option buttons with the correct answers
        const DapAns = ['A', 'B', 'C', 'D'];
        DapAns.forEach((DapAn) => {
            const DapAnButton = document.querySelector(`.DapAn[data-dapan="${DapAn}"]`);
            if (questions[currentQuestion][DapAn]) {
                DapAnButton.style.display = 'block';
                DapAnButton.innerText = DapAn + ': ' + questions[currentQuestion][DapAn];
                DapAnButton.disabled = false; // Cho phép người chơi chọn đáp án
            } else {
                DapAnButton.style.display = 'none';
            }
        });

        // Bắt đầu hẹn giờ cho câu hỏi hiện tại (30 giây)
        let remainingTime = 30;
        countdownSpan.innerText = remainingTime; // Hiển thị thời gian còn lại trên giao diện

        timer = setInterval(() => {
            remainingTime--;
            countdownSpan.innerText = remainingTime;
            if (remainingTime <= 0) {
                clearTimeout(timer); // Xóa bỏ hẹn giờ
                skippedQuestion = true; // Đánh dấu câu hỏi hiện tại đã bị bỏ qua
                currentQuestion++; // Chuyển sang câu hỏi tiếp theo
                showQuestion(); // Hiển thị câu hỏi mới
            }
        }, 1000); // 1 giây
    } else {
        questionDiv.style.display = 'none';
        DapAnDiv.style.display = 'none';
        timerDiv.style.display = 'none'; // Ẩn đồng hồ đếm ngược khi kết thúc trò chơi
        resultDiv.innerText = 'Tổng điểm của bạn: ' + score;
        startBtn.style.display = 'block';
        startBtn.innerText = 'Chơi lại';
        currentQuestion = 0;
        score = 0;
    }
}

function checkAnswer(selectedOption) {
    clearTimeout(timer); // Xóa bỏ hẹn giờ trả lời

    const resultDiv = document.querySelector('.result');

    if (selectedOption === questions[currentQuestion].DapAn) {
        score++;
        resultDiv.innerText = 'Chính xác!';
    } else {
        resultDiv.innerText = 'Sai rồi!';
    }

    currentQuestion++;
    setTimeout(showQuestion, 1000);
}


function lifeline(lifelineType) {
    if (lifelineType === 'hideTwo') {
        // Kiểm tra xem nút hideTwo đã được sử dụng chưa
        if (!hideTwoUsed) {
            // Logic để ẩn đi 2 đáp án sai
            const DapAns = ['A', 'B', 'C', 'D'];
            const correctAnswer = questions[currentQuestion].DapAn;
            let hiddenAnswers = 0;

            DapAns.forEach((DapAn) => {
                if (DapAn !== correctAnswer && hiddenAnswers < 2) {
                    const DapAnButton = document.querySelector(`.DapAn[data-dapan="${DapAn}"]`);
                    DapAnButton.style.display = 'none';
                    hiddenAnswers++;
                }
            });

            hideTwoUsed = true; // Đánh dấu nút hideTwo đã được sử dụng
        }
    } else if (lifelineType === 'callFriend') {
        // Kiểm tra xem nút callFriend đã được sử dụng chưa
        if (!callFriendUsed) {
            const GoiDien = questions[currentQuestion].Goi;
            var calling = document.getElementById('calling');
            calling.play();
            setTimeout(() => {
                calling.pause();
                speakText(GoiDien);
            }, 6000);

            callFriendUsed = true; // Đánh dấu nút callFriend đã được sử dụng
        }
    } else if (lifelineType === 'skipQuestion') {
        // Kiểm tra xem đã sử dụng đủ số lần cho nút skipQuestion chưa (3 lần)
        if (skipQuestionUsed < 3) {
            // Logic để bỏ qua câu hỏi
            if (!skippedQuestion) {
                // Nếu chưa bỏ qua câu hỏi trước đó, thực hiện bỏ qua
                skippedQuestion = true; // Đánh dấu câu hỏi hiện tại đã bị bỏ qua
                currentQuestion++; // Chuyển sang câu hỏi tiếp theo
                showQuestion(); // Hiển thị câu hỏi mới
                skipQuestionUsed++; // Tăng số lần sử dụng nút skipQuestion lên 1
            }
        }
    }
}


function speakText(text) {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Trình duyệt của bạn không hỗ trợ Web Speech API.');
    }
  }

startGame();
