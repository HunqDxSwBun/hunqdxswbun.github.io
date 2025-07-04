import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    collection, 
    addDoc,
    query, 
    where,
    getDocs,
    onSnapshot,
    orderBy,
    Timestamp,
    writeBatch,
    deleteDoc,
    arrayUnion,
    arrayRemove,
    increment
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Cấu hình Firebase của bạn
const firebaseConfig = {
    apiKey: "AIzaSyAr9tTx-Q0OWrJ4Iaslb33-o1PJLe1S3GQ",
    authDomain: "lovstory-b6e07.firebaseapp.com",
    projectId: "lovstory-b6e07",
    storageBucket: "lovstory-b6e07.appspot.com",
    messagingSenderId: "810969018898",
    appId: "1:810969018898:web:c8e525581a77ed7d515ecb",
    measurementId: "G-1RP88QT28C"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Biến toàn cục
let currentUser = null;
let userId = null;
let coupleCode = null;
let coupleData = null;
let allStories = []; // Lưu trữ tất cả story để lọc
let localLastMessageTimestamp = null;
let feelingCountdownInterval = null; // Biến cho đồng hồ đếm ngược
let unsubscribeCouple = null;
let unsubscribeEvents = null;
let unsubscribeNormalChat = null;
let unsubscribeSecretChat = null;
let storyCommentListeners = {};
let currentChatMode = 'normal';
let wasInSecretChat = false;

// DOM Elements
const loadingOverlay = document.getElementById('loading-overlay');
const loadingText = document.getElementById('loading-text');
const authScreen = document.getElementById('auth-screen');
const coupleCodeScreen = document.getElementById('couple-code-screen');
const profileSetupScreen = document.getElementById('profile-setup-screen');
const mainApp = document.getElementById('main-app');
const chatFab = document.getElementById('chat-fab');
const chatPopup = document.getElementById('chat-popup');
const closeChatBtn = document.getElementById('close-chat-btn');
const chatHeader = document.getElementById('chat-header');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const toggleChatModeBtn = document.getElementById('toggle-chat-mode-btn');
const filterAuthor = document.getElementById('filter-author');
const filterDate = document.getElementById('filter-date');
const filterLocation = document.getElementById('filter-location');
const filterTag = document.getElementById('filter-tag');
const sortStories = document.getElementById('sort-stories');
const resetFiltersBtn = document.getElementById('reset-filters-btn');
const toggleFiltersBtn = document.getElementById('toggle-filters-btn');
const navLinks = document.querySelectorAll('.nav-link');
const tabContents = document.querySelectorAll('.tab-content');

// Streak Love DOM Elements
const streakHeartContainer = document.getElementById('streak-heart-container');
const streakCount = document.getElementById('streak-count');
const checkInBtn = document.getElementById('check-in-btn');
const partner1CheckinStatus = document.getElementById('partner1-checkin-status');
const partner2CheckinStatus = document.getElementById('partner2-checkin-status');


// --- HÀM TIỆN ÍCH ---
const showView = (viewId) => {
    [authScreen, coupleCodeScreen, profileSetupScreen, mainApp].forEach(screen => screen.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
    loadingOverlay.classList.add('hidden');
};

const showConfirm = (message, onOk, onCancel = () => {}) => {
    const confirmModal = document.getElementById('confirm-modal');
    document.getElementById('confirm-message').textContent = message;
    document.getElementById('confirm-cancel-btn').classList.remove('hidden');
    confirmModal.classList.remove('hidden');

    const okBtn = document.getElementById('confirm-ok-btn');
    const cancelBtn = document.getElementById('confirm-cancel-btn');

    const okListener = () => {
        onOk();
        cleanup();
    };
    const cancelListener = () => {
        onCancel();
        cleanup();
    };
    
    function cleanup() {
        confirmModal.classList.add('hidden');
        okBtn.removeEventListener('click', okListener);
        cancelBtn.removeEventListener('click', cancelListener);
    }

    okBtn.addEventListener('click', okListener);
    cancelBtn.addEventListener('click', cancelListener);
};

const showAlert = (message) => {
     showConfirm(message, () => {});
     document.getElementById('confirm-cancel-btn').classList.add('hidden');
};


// --- QUẢN LÝ XÁC THỰC ---
onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        userId = user.uid;
        if (unsubscribeCouple) unsubscribeCouple();
        if (unsubscribeEvents) unsubscribeEvents();
        if (unsubscribeNormalChat) unsubscribeNormalChat();
        if (unsubscribeSecretChat) unsubscribeSecretChat();
        if (feelingCountdownInterval) clearInterval(feelingCountdownInterval);
        Object.values(storyCommentListeners).forEach(unsub => unsub());
        storyCommentListeners = {};
        allStories = [];

        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists() && userDocSnap.data().coupleCode) {
            coupleCode = userDocSnap.data().coupleCode;
            await setupRealtimeListeners();
            await checkDailyReset(); 
            showView('main-app');
            chatFab.classList.remove('hidden');
            feelingCountdownInterval = setInterval(updateFeelingCountdowns, 1000);
        } else {
            showView('couple-code-screen');
            chatFab.classList.add('hidden');
        }
    } else {
        currentUser = null;
        userId = null;
        coupleCode = null;
        coupleData = null;
        if (unsubscribeCouple) unsubscribeCouple();
        if (unsubscribeEvents) unsubscribeEvents();
        if (unsubscribeNormalChat) unsubscribeNormalChat();
        if (unsubscribeSecretChat) unsubscribeSecretChat();
        if (feelingCountdownInterval) clearInterval(feelingCountdownInterval);
        Object.values(storyCommentListeners).forEach(unsub => unsub());
        storyCommentListeners = {};
        allStories = [];
        showView('auth-screen');
        chatFab.classList.add('hidden');
        chatPopup.classList.remove('active');
    }
});

// --- XỬ LÝ FORM ĐĂNG NHẬP/ĐĂNG KÝ ---
document.getElementById('show-register').addEventListener('click', (e) => { e.preventDefault(); document.getElementById('login-form').classList.add('hidden'); document.getElementById('register-form').classList.remove('hidden'); });
document.getElementById('show-login').addEventListener('click', (e) => { e.preventDefault(); document.getElementById('register-form').classList.add('hidden'); document.getElementById('login-form').classList.remove('hidden'); });
document.getElementById('register-btn').addEventListener('click', async () => {
    const email = document.getElementById('register-email').value, password = document.getElementById('register-password').value, inviteCode = document.getElementById('register-invite-code').value, errorDiv = document.getElementById('register-error');
    errorDiv.textContent = '';
    if (!email || !password || !inviteCode) { errorDiv.textContent = 'Vui lòng nhập đầy đủ thông tin.'; return; }
    try {
        const inviteCodeRef = doc(db, "invitationCodes", inviteCode);
        const inviteCodeSnap = await getDoc(inviteCodeRef);
        if (!inviteCodeSnap.exists() || inviteCodeSnap.data().used) { errorDiv.textContent = 'Mã mời không hợp lệ hoặc đã được sử dụng.'; return; }
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) { console.error("Lỗi đăng ký:", error); errorDiv.textContent = "Đã xảy ra lỗi. Vui lòng thử lại. " + error.message; }
});
document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value, password = document.getElementById('login-password').value, errorDiv = document.getElementById('login-error');
    errorDiv.textContent = '';
    if (!email || !password) { errorDiv.textContent = 'Vui lòng nhập email và mật khẩu.'; return; }
    try { await signInWithEmailAndPassword(auth, email, password); } catch (error) { console.error("Lỗi đăng nhập:", error); errorDiv.textContent = "Email hoặc mật khẩu không đúng."; }
});
document.getElementById('logout-btn').addEventListener('click', async () => { 
    if(wasInSecretChat) {
        showConfirm("Bạn có muốn xóa cuộc trò chuyện bí mật trước khi đăng xuất?", async () => {
            await clearSecretChat();
            await signOut(auth);
        });
    } else {
        await signOut(auth); 
    }
});

// --- XỬ LÝ CẶP ĐÔI & PROFILE ---
document.getElementById('join-couple-btn').addEventListener('click', async () => {
    const code = document.getElementById('couple-code-input').value.trim(), errorDiv = document.getElementById('couple-code-error'); errorDiv.textContent = '';
    if (!code) { errorDiv.textContent = 'Vui lòng nhập mã.'; return; }
    const coupleDocRef = doc(db, "couples", code);
    const coupleDocSnap = await getDoc(coupleDocRef);
    if (!coupleDocSnap.exists()) { errorDiv.textContent = 'Mã cặp đôi không tồn tại.'; return; }
    const data = coupleDocSnap.data();
    if (data.partner1 && data.partner2) { errorDiv.textContent = 'Cặp đôi này đã đủ thành viên.'; return; }
    coupleCode = code; await prepareProfileSetup(data); showView('profile-setup-screen');
});

document.getElementById('create-custom-couple-btn').addEventListener('click', async () => {
    const code = document.getElementById('couple-code-input').value.trim();
    const errorDiv = document.getElementById('couple-code-error');
    errorDiv.textContent = '';

    if (!code) {
        errorDiv.textContent = 'Vui lòng nhập một mã để tạo.';
        return;
    }

    const coupleDocRef = doc(db, "couples", code);
    const coupleDocSnap = await getDoc(coupleDocRef);

    if (coupleDocSnap.exists()) {
        errorDiv.textContent = 'Mã này đã tồn tại. Vui lòng chọn mã khác hoặc nhấn "Tham Gia".';
        return;
    }
    
    coupleCode = code;
    await setDoc(doc(db, "couples", coupleCode), {
        createdAt: Timestamp.now(),
        startDate: null,
        partner1: null,
        partner2: null,
        chatMode: 'normal',
        gameBackgroundURL: 'https://i.ibb.co/L1pS1XF/pixel-art-sakura-tree-and-mountain-landscape-for-8bit-game-free-vector.jpg', // Default background
        streak: {
            count: 0,
            lastDate: null,
            p1_checked: false,
            p2_checked: false
        }
    });

    await prepareProfileSetup({});
    showView('profile-setup-screen');
});

const prepareProfileSetup = async (coupleData) => {
    const genderSelect = document.getElementById('profile-gender'); genderSelect.disabled = false; genderSelect.value = '';
    if (coupleData.partner1) { const existingGender = coupleData.partner1.gender; const otherGender = existingGender === 'male' ? 'female' : 'male'; genderSelect.value = otherGender; genderSelect.disabled = true; }
};

document.getElementById('save-profile-btn').addEventListener('click', async () => {
    const name = document.getElementById('profile-name').value, dob = document.getElementById('profile-dob').value, gender = document.getElementById('profile-gender').value, errorDiv = document.getElementById('profile-setup-error'); errorDiv.textContent = '';
    if (!name || !dob || !gender) { errorDiv.textContent = 'Vui lòng điền đầy đủ thông tin.'; return; }
    const coupleDocRef = doc(db, "couples", coupleCode); const coupleDocSnap = await getDoc(coupleDocRef); const data = coupleDocSnap.data();
    
    const defaultMaleAvatar = 'https://i.ibb.co/1M832Ww/image.png';
    const defaultFemaleAvatar = 'https://i.ibb.co/3kCcvS0/image.png';

    const newPartnerInfo = { 
        userId: userId, 
        name: name, 
        dob: dob, 
        gender: gender, 
        photoURL: gender === 'male' ? defaultMaleAvatar : defaultFemaleAvatar, 
        feeling: "", 
        feelingExpiresAt: null,
    };
    let updateData = {}; if (!data.partner1) { updateData.partner1 = newPartnerInfo; } else { updateData.partner2 = newPartnerInfo; }
    try { await updateDoc(coupleDocRef, updateData); await setDoc(doc(db, "users", userId), { coupleCode: coupleCode }); window.location.reload(); } catch (error) { console.error("Lỗi lưu profile:", error); errorDiv.textContent = "Đã có lỗi xảy ra."; }
});


// --- REALTIME LISTENERS ---
async function setupRealtimeListeners() {
    const coupleDocRef = doc(db, "couples", coupleCode);
    unsubscribeCouple = onSnapshot(coupleDocRef, async (docSnap) => { 
        if (docSnap.exists()) {
            const oldData = coupleData;
            coupleData = docSnap.data();
           
            if (coupleData && typeof coupleData.streak === 'undefined') {
                console.log("Dữ liệu streak không tồn tại, đang khởi tạo...");
                try {
                    await updateDoc(docSnap.ref, {
                        streak: {
                            count: 0,
                            lastDate: null,
                            p1_checked: false,
                            p2_checked: false
                        }
                    });
                    return;
                } catch (error) {
                    console.error("Lỗi khởi tạo dữ liệu streak:", error);
                }
            }
            
            if (oldData && coupleData.lastMessage && coupleData.lastMessage.senderId !== userId) {
                const newTimestamp = coupleData.lastMessage.timestamp;
                if (!localLastMessageTimestamp || newTimestamp.toMillis() > localLastMessageTimestamp.toMillis()) {
                    if (!chatPopup.classList.contains('active')) {
                        chatPopup.classList.add('active');
                    }
                }
            }
            localLastMessageTimestamp = coupleData.lastMessage?.timestamp;

            if (coupleData.chatMode && coupleData.chatMode !== currentChatMode) {
                setChatMode(coupleData.chatMode === 'secret', false);
            }

            renderMainPage();
            renderSettings();
            renderStreakLove();
        } else {
            signOut(auth);
        }
    });

    const storiesColRef = collection(db, "couples", coupleCode, "stories");
    onSnapshot(query(storiesColRef, orderBy("timestamp", "desc")), (snapshot) => {
        allStories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        updateStoryDisplay();
    });
    
    const eventsColRef = collection(db, "couples", coupleCode, "events");
    unsubscribeEvents = onSnapshot(eventsColRef, (snapshot) => {
        const eventDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderEvents(eventDocs);
    });

    setupChatListeners();
}

// --- RENDER FUNCTIONS ---
function renderMainPage() {
    if (!coupleData) return;
    const startDateDisplay = document.getElementById('start-date-display');
    if (coupleData.startDate) {
        const start = coupleData.startDate.toDate(); startDateDisplay.textContent = start.toLocaleDateString('vi-VN');
        const now = new Date(); const diffTime = Math.abs(now - start); const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let years = now.getFullYear() - start.getFullYear(); let months = now.getMonth() - start.getMonth(); let days = now.getDate() - start.getDate();
        if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
        if (months < 0) { years--; months += 12; }
        document.getElementById('day-counter').textContent = diffDays; document.getElementById('ymd-counter').textContent = `${years} năm ${months} tháng ${days} ngày`;
    } else {
        startDateDisplay.textContent = 'Chưa thiết lập'; document.getElementById('day-counter').textContent = '♡'; document.getElementById('ymd-counter').textContent = 'Hãy vào Cài đặt để chọn ngày bắt đầu nhé!';
    }
    
    const gameScene = document.getElementById('game-scene');
    const backgroundUrl = coupleData.gameBackgroundURL || 'https://i.ibb.co/L1pS1XF/pixel-art-sakura-tree-and-mountain-landscape-for-8bit-game-free-vector.jpg';
    gameScene.style.backgroundImage = `url('${backgroundUrl}')`;

    renderPartnerCharacter('partner-1-char-container', coupleData.partner1);
    renderPartnerCharacter('partner-2-char-container', coupleData.partner2);
}

function renderPartnerCharacter(containerId, partner) {
    const container = document.getElementById(containerId);
    if (!partner) {
        container.innerHTML = '';
        return;
    }

    const expiresAt = partner.feelingExpiresAt?.toDate();
    const hasFeeling = partner.feeling && (!expiresAt || expiresAt > new Date());
    
    let feelingHTML = '';
    if (hasFeeling) {
        feelingHTML = `
            <div class="italic">"${partner.feeling}"</div>
            ${expiresAt ? `<div class="feeling-countdown text-xs text-gray-500 mt-1" data-expires-at="${expiresAt.getTime()}"></div>` : ''}
        `;
    }

    const genderClass = partner.gender === 'male' ? 'male' : 'female';
    const isCurrentUser = partner.userId === userId;

    container.innerHTML = `
        <div class="speech-bubble" style="${hasFeeling ? 'display: block;' : 'display: none;'}">
             ${feelingHTML}
             ${isCurrentUser ? `<button data-partner-id="${partner.userId}" class="edit-feeling-btn absolute top-1 right-2 text-gray-400 hover:text-pink-500 text-sm"><i class="fas fa-pencil-alt"></i></button>` : ''}
        </div>
        <div class="character ${genderClass}" style="background-image: url('${partner.photoURL}')"></div>
        <div class="char-name">${partner.name}</div>
    `;
}

function updateFeelingCountdowns() {
    const countdownElements = document.querySelectorAll('.feeling-countdown');
    countdownElements.forEach(el => {
        const expiresAt = parseInt(el.dataset.expiresAt, 10);
        const now = Date.now();
        const remaining = expiresAt - now;

        if (remaining <= 0) {
            const bubble = el.closest('.speech-bubble');
            if(bubble) bubble.style.display = 'none';
        } else {
            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
            
            el.innerHTML = `<i class="fas fa-clock fa-xs"></i> còn lại ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    });
}

function renderEvents(docs) {
    const list = document.getElementById('event-list');
    list.innerHTML = ''; 
    if (docs.length === 0) {
        list.innerHTML = `<div class="text-center text-gray-500 p-8 bg-white rounded-xl">Chưa có sự kiện nào được thêm.</div>`;
        return;
    }

    docs.sort((a, b) => {
        const now = new Date();
        const nextA = calculateNextOccurrence(a, now);
        const nextB = calculateNextOccurrence(b, now);
        return nextA - nextB;
    });

    docs.forEach(eventData => {
        const event = eventData;
        const now = new Date();
        const nextDate = calculateNextOccurrence(event, now);
        
        const diffTime = nextDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const eventElement = document.createElement('div');
        eventElement.className = 'bg-white rounded-xl shadow-lg p-4 flex items-center space-x-4 relative';
        eventElement.innerHTML = `
            <img src="${event.imageUrl || 'https://placehold.co/100x100/a5b4fc/4338ca?text=Event'}" class="w-20 h-20 rounded-lg object-cover">
            <div class="flex-grow">
                <h4 class="font-bold text-lg text-blue-600">${event.name}</h4>
                <p class="text-sm text-gray-500">${nextDate.toLocaleDateString('vi-VN')}</p>
                <p class="text-sm text-gray-500"><i class="far fa-clock mr-1"></i> Lặp lại: ${getRepeatText(event.repeat, event.intervalDays)}</p>
            </div>
            <div class="text-center">
                <div class="text-3xl font-bold text-blue-500">${diffDays > 0 ? diffDays : 'Hôm nay'}</div>
                <div class="text-sm text-gray-600">${diffDays > 0 ? 'ngày nữa' : ''}</div>
            </div>
            <button class="delete-event-btn absolute top-2 right-2 text-gray-400 hover:text-red-500" data-event-id="${event.id}">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        list.appendChild(eventElement);
    });

    document.querySelectorAll('.delete-event-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const eventId = e.currentTarget.dataset.eventId;
            showConfirm("Bạn có chắc chắn muốn xóa sự kiện này không?", () => {
                deleteEvent(eventId);
            });
        });
    });
}

function calculateNextOccurrence(event, now) {
    const eventDate = event.date.toDate();
    let nextDate = new Date(eventDate);
    nextDate.setHours(0, 0, 0, 0);
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    if (nextDate >= today) return nextDate;

    switch(event.repeat) {
        case 'none': return nextDate; 
        case 'daily':
            nextDate = today;
            if (eventDate.getTime() % (24 * 60 * 60 * 1000) > today.getTime() % (24 * 60 * 60 * 1000)) {
                 nextDate.setDate(nextDate.getDate() + 1);
            }
            break;
        case 'weekly':
            while(nextDate < today) nextDate.setDate(nextDate.getDate() + 7);
            break;
        case 'monthly':
            while(nextDate < today) nextDate.setMonth(nextDate.getMonth() + 1);
            break;
        case 'yearly':
            while(nextDate < today) nextDate.setFullYear(nextDate.getFullYear() + 1);
            break;
        case 'interval':
            while(nextDate < today) nextDate.setDate(nextDate.getDate() + event.intervalDays);
            break;
    }
    return nextDate;
}


async function deleteEvent(eventId) {
    try {
        await deleteDoc(doc(db, "couples", coupleCode, "events", eventId));
        showAlert("Sự kiện đã được xóa thành công.");
    } catch (error) {
        console.error("Lỗi xóa sự kiện:", error);
        showAlert("Đã xảy ra lỗi khi xóa sự kiện.");
    }
}


function getRepeatText(repeatType, interval) {
    const map = {'none': 'Không', 'daily': 'Hàng ngày', 'weekly': 'Hàng tuần', 'monthly': 'Hàng tháng', 'yearly': 'Hàng năm'};
    return repeatType === 'interval' ? `Sau ${interval} ngày` : map[repeatType] || 'Không rõ';
}

function renderSettings() {
    if (!coupleData) return;
    document.getElementById('setting-couple-code').value = coupleCode;
    document.getElementById('setting-start-date').value = coupleData.startDate ? coupleData.startDate.toDate().toISOString().split('T')[0] : '';
    document.getElementById('setting-game-background').value = coupleData.gameBackgroundURL || '';
    
    renderPartnerSettings('settings-partner-1', coupleData.partner1);
    renderPartnerSettings('settings-partner-2', coupleData.partner2);
}

function renderPartnerSettings(elementId, partner) {
    const container = document.getElementById(elementId);
    if (!partner) {
        container.innerHTML = `<p class="text-gray-500">Thông tin nửa kia chưa có.</p>`;
        return;
    }
    container.innerHTML = `
        <h4 class="font-semibold text-lg mb-2">${partner.name} (${partner.gender === 'male' ? 'Nam' : 'Nữ'})</h4>
        <div class="space-y-3">
            <div>
                <label class="text-sm font-medium">Tên</label>
                <input type="text" data-partner-id="${partner.userId}" data-field="name" value="${partner.name}" class="w-full px-4 py-2 border rounded-lg">
            </div>
            <div>
                <label class="text-sm font-medium">Ngày sinh</label>
                <input type="date" data-partner-id="${partner.userId}" data-field="dob" value="${partner.dob}" class="w-full px-4 py-2 border rounded-lg">
            </div>
             <div>
                <label class="text-sm font-medium">URL Ảnh đại diện (Nhân vật)</label>
                <input type="text" data-partner-id="${partner.userId}" data-field="photoURL" value="${partner.photoURL}" class="w-full px-4 py-2 border rounded-lg">
            </div>
        </div>
    `;
}

// --- STORY FILTER & SORT & DELETE ---
toggleFiltersBtn.addEventListener('click', () => {
    const filterControls = document.getElementById('filter-controls');
    filterControls.classList.toggle('active');
    toggleFiltersBtn.querySelector('.fa-chevron-down').classList.toggle('rotate-180');
});

function updateStoryDisplay() {
    if (!coupleData) return;

    if (filterAuthor.options.length <= 1) {
        filterAuthor.innerHTML = '<option value="all">Tất cả</option>';
        if (coupleData.partner1) filterAuthor.innerHTML += `<option value="${coupleData.partner1.userId}">${coupleData.partner1.name}</option>`;
        if (coupleData.partner2) filterAuthor.innerHTML += `<option value="${coupleData.partner2.userId}">${coupleData.partner2.name}</option>`;
    }

    let storiesToDisplay = [...allStories];

    const authorId = filterAuthor.value;
    if (authorId !== 'all') {
        storiesToDisplay = storiesToDisplay.filter(story => story.authorId === authorId);
    }

    const dateStr = filterDate.value;
    if (dateStr) {
        const selectedDate = new Date(dateStr);
        const startOfDay = new Date(selectedDate).setHours(0, 0, 0, 0);
        const endOfDay = new Date(selectedDate).setHours(23, 59, 59, 999);
        storiesToDisplay = storiesToDisplay.filter(story => {
            const storyDate = story.timestamp?.toDate().getTime();
            return storyDate >= startOfDay && storyDate <= endOfDay;
        });
    }
    
    const location = filterLocation.value.trim().toLowerCase();
    if (location) {
        storiesToDisplay = storiesToDisplay.filter(story => 
            story.location && story.location.toLowerCase().includes(location)
        );
    }

    const tag = filterTag.value.trim().toLowerCase();
    if (tag) {
        storiesToDisplay = storiesToDisplay.filter(story => 
            story.tags && story.tags.toLowerCase().includes(tag)
        );
    }
    
    // This sorting is now done in the onSnapshot listener for stories
    // to maintain the order from Firestore initially.
    // The filter function will re-sort if the user changes the sort order.
    const sortOrder = sortStories.value;
    if (sortOrder === 'desc') {
        storiesToDisplay.sort((a, b) => (b.timestamp?.toDate() || 0) - (a.timestamp?.toDate() || 0));
    } else {
        storiesToDisplay.sort((a, b) => (a.timestamp?.toDate() || 0) - (b.timestamp?.toDate() || 0));
    }

    renderStories(storiesToDisplay);
}

[filterAuthor, filterDate, sortStories, filterLocation, filterTag].forEach(el => el.addEventListener('input', updateStoryDisplay));
resetFiltersBtn.addEventListener('click', () => {
    filterAuthor.value = 'all';
    filterDate.value = '';
    filterLocation.value = '';
    filterTag.value = '';
    sortStories.value = 'desc';
    updateStoryDisplay();
});

function renderStories(stories) {
    const feed = document.getElementById('story-feed');
    if (!feed) return;
    if (stories.length === 0) {
        feed.innerHTML = `<div class="text-center text-gray-500 p-8 bg-white rounded-xl">Không tìm thấy story nào phù hợp.</div>`;
        return;
    }

    feed.innerHTML = stories.map(story => {
        const date = story.timestamp?.toDate();
        const partner = story.authorId === coupleData.partner1?.userId ? coupleData.partner1 : coupleData.partner2;
        const tagsHTML = story.tags ? story.tags.split(',').map(tag => `<span class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">${tag.trim()}</span>`).join(' ') : '';
        const isLiked = story.likes?.includes(userId);
        
        const likerNames = (story.likes || []).map(uid => {
            if (coupleData.partner1?.userId === uid) return coupleData.partner1.name;
            if (coupleData.partner2?.userId === uid) return coupleData.partner2.name;
            return 'Một người';
        }).join(', ');
        
        // **Đây là phần logic quan trọng**
        const canDelete = story.authorId === userId;

        return `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden relative" id="story-${story.id}">
                 ${canDelete ? `<button class="delete-story-btn absolute top-3 right-3 text-gray-400 hover:text-red-500" data-story-id="${story.id}"><i class="fas fa-trash-alt"></i></button>` : ''}
                <div class="p-5">
                    <div class="flex items-center mb-3">
                        <img src="${partner?.photoURL || 'https://placehold.co/150x150/fbcfe8/ec4899?text=?'}" class="w-12 h-12 rounded-full mr-4 object-cover">
                        <div>
                            <p class="font-bold text-pink-500">${story.authorName}</p>
                            <p class="text-xs text-gray-400">${date ? date.toLocaleString('vi-VN') : 'Không có ngày'}</p>
                        </div>
                    </div>
                    <h3 class="font-bold text-xl mb-2 text-gray-800">${story.title || ''}</h3>
                    <p class="text-gray-700 whitespace-pre-wrap mb-4">${story.content}</p>
                    <div class="flex justify-between items-center text-sm text-gray-500">
                        <div>
                            ${story.location ? `<i class="fas fa-map-marker-alt mr-1"></i> ${story.location}` : ''}
                        </div>
                        <div class="flex flex-wrap gap-2">
                            ${tagsHTML}
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-5 py-3 border-t">
                    <div class="flex items-center space-x-6 text-gray-600 mb-2">
                        <button class="like-btn ${isLiked ? 'liked' : ''} text-lg" data-story-id="${story.id}">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="message-story-btn text-lg" data-story-title="${story.title || 'bài viết này'}">
                             <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div class="text-sm text-gray-600 like-display">
                        <span class="font-semibold like-count">${story.likes?.length || 0}</span> lượt thích
                        <span class="liker-names-display text-gray-500 ml-1">${likerNames ? `bởi ${likerNames}` : ''}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    attachStoryInteractionListeners();
}

function attachStoryInteractionListeners() {
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.onclick = () => toggleLike(btn.dataset.storyId);
    });
    document.querySelectorAll('.message-story-btn').forEach(btn => {
        btn.onclick = () => {
            const storyTitle = btn.dataset.storyTitle;
            chatInput.value = `Về story "${storyTitle}": `;
            chatPopup.classList.add('active');
            chatInput.focus();
        };
    });
    document.querySelectorAll('.delete-story-btn').forEach(btn => {
        btn.onclick = () => {
            const storyId = btn.dataset.storyId;
            showConfirm("Bạn có chắc chắn muốn xóa story này không?", () => {
                deleteStory(storyId);
            });
        };
    });
}

async function deleteStory(storyId) {
    try {
        await deleteDoc(doc(db, "couples", coupleCode, "stories", storyId));
        showAlert("Story đã được xóa thành công.");
    } catch (error) {
        console.error("Lỗi xóa story:", error);
        showAlert("Đã xảy ra lỗi khi xóa story.");
    }
}

async function toggleLike(storyId) {
    const storyRef = doc(db, "couples", coupleCode, "stories", storyId);
    const storyDoc = await getDoc(storyRef);
    const likes = storyDoc.data().likes || [];
    
    if (likes.includes(userId)) {
        await updateDoc(storyRef, { likes: arrayRemove(userId) });
    } else {
        await updateDoc(storyRef, { likes: arrayUnion(userId) });
    }
}

// --- CHAT POPUP LOGIC ---
function setupChatListeners() {
    if (unsubscribeNormalChat) unsubscribeNormalChat();
    if (unsubscribeSecretChat) unsubscribeSecretChat();

    const normalChatRef = collection(db, "couples", coupleCode, "chat_normal");
    const normalQuery = query(normalChatRef, orderBy("timestamp", "desc"));
    unsubscribeNormalChat = onSnapshot(normalQuery, (snapshot) => {
        if (currentChatMode === 'normal') renderChatMessages(snapshot.docs.map(d => ({id: d.id, ...d.data()})));
    });

    const secretChatRef = collection(db, "couples", coupleCode, "chat_secret");
    const secretQuery = query(secretChatRef, orderBy("timestamp", "desc"));
    unsubscribeSecretChat = onSnapshot(secretQuery, (snapshot) => {
        if (currentChatMode === 'secret') renderChatMessages(snapshot.docs.map(d => ({id: d.id, ...d.data()})));
    });
}

function renderChatMessages(docs) {
    if (!coupleData) return;
    chatMessages.innerHTML = docs.map(msg => {
        const isMe = msg.authorId === userId;
        return `
            <div class="flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'} mb-3 message-container">
                ${isMe && currentChatMode === 'normal' ? `<button class="delete-msg-btn text-gray-400 hover:text-red-500 mb-1" data-message-id="${msg.id}"><i class="fas fa-trash-alt fa-xs"></i></button>` : ''}
                <div class="max-w-xs md:max-w-md">
                    <div class="${isMe ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-2xl px-4 py-2">
                        ${msg.content}
                    </div>
                    <div class="text-xs text-gray-400 mt-1 px-2 ${isMe ? 'text-right' : 'text-left'}">
                        ${msg.timestamp.toDate().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

async function handleChatCommand(command) {
    if (command === '@del-me') {
        showConfirm("Bạn có chắc muốn xóa tất cả tin nhắn của mình không?", async () => {
            const q = query(collection(db, "couples", coupleCode, "chat_normal"), where("authorId", "==", userId));
            const snapshot = await getDocs(q);
            const batch = writeBatch(db);
            snapshot.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            showAlert("Đã xóa tất cả tin nhắn của bạn.");
        });
        return true;
    }
    if (command === '@del-all') {
        showConfirm("Bạn có chắc muốn xóa TOÀN BỘ cuộc trò chuyện không? Hành động này không thể hoàn tác.", async () => {
            const q = query(collection(db, "couples", coupleCode, "chat_normal"));
            const snapshot = await getDocs(q);
            const batch = writeBatch(db);
            snapshot.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            showAlert("Đã xóa toàn bộ cuộc trò chuyện.");
        });
        return true;
    }
    if (command === '@feel') {
        document.getElementById('feeling-modal').classList.remove('hidden');
        return true;
    }
    return false;
}

async function sendMessage() {
    const content = chatInput.value.trim();
    if (!content) return;

    if (currentChatMode === 'normal' && await handleChatCommand(content)) {
        chatInput.value = '';
        return;
    }

    const collectionName = currentChatMode === 'normal' ? 'chat_normal' : 'chat_secret';
    try {
        await addDoc(collection(db, "couples", coupleCode, collectionName), {
            content: content,
            authorId: userId,
            timestamp: Timestamp.now()
        });
        await updateDoc(doc(db, "couples", coupleCode), {
            lastMessage: {
                senderId: userId,
                timestamp: Timestamp.now()
            }
        });
        chatInput.value = '';
    } catch (error) {
        console.error("Lỗi gửi tin nhắn:", error);
        showAlert("Không thể gửi tin nhắn.");
    }
}

async function clearSecretChat() {
    const secretChatRef = collection(db, "couples", coupleCode, "chat_secret");
    const q = query(secretChatRef);
    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty) return;

    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();
    wasInSecretChat = false;
}

chatFab.addEventListener('click', () => {
    chatPopup.classList.toggle('active');
});

closeChatBtn.addEventListener('click', () => {
    chatPopup.classList.remove('active');
    if (wasInSecretChat) {
        showConfirm("Bạn có muốn xóa cuộc trò chuyện bí mật không?", async () => {
            await clearSecretChat();
        });
    }
});

function updateChatModeVisuals(isSecret) {
    chatHeader.classList.toggle('bg-red-200', isSecret);
    toggleChatModeBtn.classList.toggle('bg-red-500', isSecret);
    toggleChatModeBtn.classList.toggle('text-white', isSecret);
    toggleChatModeBtn.classList.toggle('bg-blue-500', !isSecret);
    toggleChatModeBtn.classList.toggle('text-white', !isSecret);
    toggleChatModeBtn.innerHTML = isSecret ? '<i class="fas fa-user-secret mr-2"></i>Bí mật' : '<i class="fas fa-comments mr-2"></i>Bình thường';
}

async function setChatMode(isSecret, shouldUpdateFirestore = true) {
    currentChatMode = isSecret ? 'secret' : 'normal';
    wasInSecretChat = isSecret;
    updateChatModeVisuals(isSecret);
    
    const collectionName = currentChatMode === 'normal' ? 'chat_normal' : 'chat_secret';
    const ref = collection(db, "couples", coupleCode, collectionName);
    const q = query(ref, orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    renderChatMessages(snapshot.docs.map(d => ({id: d.id, ...d.data()})));
    
    if(shouldUpdateFirestore) {
        await updateDoc(doc(db, "couples", coupleCode), { chatMode: currentChatMode });
    }
}

updateChatModeVisuals(false);

toggleChatModeBtn.addEventListener('click', () => {
    const currentModeIsSecret = currentChatMode === 'secret';
    if (currentModeIsSecret) {
        showConfirm("Bạn có muốn xóa cuộc trò chuyện bí mật không?", 
            async () => {
               await clearSecretChat();
               await updateDoc(doc(db, "couples", coupleCode), { chatMode: 'normal' });
            }, 
            async () => {
                await updateDoc(doc(db, "couples", coupleCode), { chatMode: 'normal' });
            }
        );
    } else {
        updateDoc(doc(db, "couples", coupleCode), { chatMode: 'secret' });
    }
});

document.getElementById('chat-send-btn').addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

chatMessages.addEventListener('click', async (e) => {
    const deleteBtn = e.target.closest('.delete-msg-btn');
    if (deleteBtn && currentChatMode === 'normal') {
        const messageId = deleteBtn.dataset.messageId;
        showConfirm("Bạn có chắc muốn xóa tin nhắn này?", async () => {
            await deleteDoc(doc(db, "couples", coupleCode, "chat_normal", messageId));
        });
    }
});

const commandToggleBtn = document.getElementById('command-toggle-btn');
const commandPopup = document.getElementById('command-popup');

commandToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    commandPopup.classList.toggle('hidden');
});

document.querySelectorAll('.command-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        chatInput.value = btn.dataset.command;
        commandPopup.classList.add('hidden');
        chatInput.focus();
    });
});

document.addEventListener('click', (e) => {
    if (!commandPopup.contains(e.target) && e.target !== commandToggleBtn) {
        commandPopup.classList.add('hidden');
    }
});


// --- QUẢN LÝ TAB ---
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        const tabId = link.dataset.tab + '-content';
        tabContents.forEach(content => {
            content.classList.toggle('active', content.id === tabId);
        });

        if (tabId === 'streak-content') {
            checkDailyReset();
        }
    });
});

// --- MODAL STORY ---
const storyModal = document.getElementById('story-modal');
document.getElementById('add-story-btn').addEventListener('click', () => storyModal.classList.remove('hidden'));
document.getElementById('cancel-story-btn').addEventListener('click', () => storyModal.classList.add('hidden'));
document.getElementById('post-story-btn').addEventListener('click', async () => {
    const title = document.getElementById('story-title').value.trim();
    const content = document.getElementById('story-textarea').value.trim();
    const location = document.getElementById('story-location').value.trim();
    const tags = document.getElementById('story-tags').value.trim();

    if (!content) { showAlert('Vui lòng nhập nội dung.'); return; }
    
    const partner = coupleData.partner1.userId === userId ? coupleData.partner1 : coupleData.partner2;

    try {
        await addDoc(collection(db, "couples", coupleCode, "stories"), {
            title: title, content: content, location: location, tags: tags,
            authorId: userId, authorName: partner.name, timestamp: Timestamp.now(),
            likes: []
        });
        document.getElementById('story-title').value = '';
        document.getElementById('story-textarea').value = '';
        document.getElementById('story-location').value = '';
        document.getElementById('story-tags').value = '';
        storyModal.classList.add('hidden');
    } catch (error) { console.error("Lỗi đăng story:", error); showAlert("Không thể đăng story."); }
});

// --- MODAL FEELING ---
const feelingModal = document.getElementById('feeling-modal');
document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.edit-feeling-btn');
    if (btn) {
        const partnerId = btn.dataset.partnerId;
        const partner = coupleData.partner1.userId === partnerId ? coupleData.partner1 : coupleData.partner2;
        document.getElementById('feeling-input').value = partner.feeling || '';
        document.getElementById('feeling-duration').value = 'infinite';
        feelingModal.classList.remove('hidden');
    }
});
document.getElementById('cancel-feeling-btn').addEventListener('click', () => feelingModal.classList.add('hidden'));
document.getElementById('save-feeling-btn').addEventListener('click', async () => {
    const newFeeling = document.getElementById('feeling-input').value.trim();
    const durationInSeconds = document.getElementById('feeling-duration').value;
    const partnerKey = coupleData.partner1.userId === userId ? 'partner1' : 'partner2';
    
    let expiresAt = null;
    if (durationInSeconds !== 'infinite') {
        const seconds = parseInt(durationInSeconds, 10);
        expiresAt = Timestamp.fromMillis(Date.now() + seconds * 1000);
    }

    try {
        const updateData = {
            [`${partnerKey}.feeling`]: newFeeling,
            [`${partnerKey}.feelingExpiresAt`]: expiresAt
        };
        await updateDoc(doc(db, "couples", coupleCode), updateData);
        feelingModal.classList.add('hidden');
    } catch (error) { console.error("Lỗi lưu cảm nhận:", error); showAlert("Không thể lưu cảm nhận."); }
});


// --- EVENT & SETTINGS LOGIC ---
const eventModal = document.getElementById('event-modal');
const eventIntervalInput = document.getElementById('event-interval-days');
document.getElementById('event-repeat').addEventListener('change', (e) => { eventIntervalInput.classList.toggle('hidden', e.target.value !== 'interval'); });
document.getElementById('add-event-btn').addEventListener('click', () => eventModal.classList.remove('hidden'));
document.getElementById('cancel-event-btn').addEventListener('click', () => { eventModal.classList.add('hidden'); document.getElementById('event-name').value = ''; document.getElementById('event-date').value = ''; document.getElementById('event-image-url').value = ''; document.getElementById('event-repeat').value = 'none'; eventIntervalInput.classList.add('hidden'); eventIntervalInput.value = ''; });
document.getElementById('save-event-btn').addEventListener('click', async () => {
    const name = document.getElementById('event-name').value, date = document.getElementById('event-date').value, repeat = document.getElementById('event-repeat').value, intervalDays = document.getElementById('event-interval-days').value;
    if (!name || !date || !repeat || (repeat === 'interval' && !intervalDays)) { showAlert('Vui lòng điền đủ thông tin sự kiện.'); return; }
    try {
        await addDoc(collection(db, "couples", coupleCode, "events"), { name: name, date: Timestamp.fromDate(new Date(date)), imageUrl: document.getElementById('event-image-url').value, repeat: repeat, intervalDays: repeat === 'interval' ? parseInt(intervalDays) : null, createdAt: Timestamp.now() });
        document.getElementById('cancel-event-btn').click();
    } catch (error) { console.error("Lỗi lưu sự kiện:", error); showAlert("Không thể lưu sự kiện."); }
});

document.getElementById('save-settings-btn').addEventListener('click', async () => {
    try {
        loadingOverlay.classList.remove('hidden');
        const startDate = document.getElementById('setting-start-date').value;
        const gameBackgroundURL = document.getElementById('setting-game-background').value.trim();
        let updateData = {};

        if (startDate) {
            updateData.startDate = Timestamp.fromDate(new Date(startDate));
        }

        if (gameBackgroundURL) {
            updateData.gameBackgroundURL = gameBackgroundURL;
        }

        const inputs = document.querySelectorAll('#settings-content input[data-partner-id]');
        let partnerUpdates = {};

        inputs.forEach(input => {
            const partnerId = input.dataset.partnerId;
            const field = input.dataset.field;
            if (!partnerUpdates[partnerId]) {
                 const partnerKey = coupleData.partner1?.userId === partnerId ? 'partner1' : 'partner2';
                 partnerUpdates[partnerId] = { ...coupleData[partnerKey] };
            }
            partnerUpdates[partnerId][field] = input.value;
        });

        if (coupleData.partner1 && partnerUpdates[coupleData.partner1.userId]) {
            updateData.partner1 = partnerUpdates[coupleData.partner1.userId];
        }
        if (coupleData.partner2 && partnerUpdates[coupleData.partner2.userId]) {
            updateData.partner2 = partnerUpdates[coupleData.partner2.userId];
        }
       
        await updateDoc(doc(db, "couples", coupleCode), updateData);
        loadingOverlay.classList.add('hidden');
        showAlert('Đã lưu cài đặt thành công!');
    } catch (error) {
        loadingOverlay.classList.add('hidden');
        console.error("Lỗi lưu cài đặt:", error);
        showAlert('Có lỗi xảy ra khi lưu cài đặt.');
    }
});

document.getElementById('copy-code-btn').addEventListener('click', () => {
    const codeInput = document.getElementById('setting-couple-code');
    codeInput.select();
    codeInput.setSelectionRange(0, 99999);
    try {
        document.execCommand('copy');
        showAlert('Đã sao chép mã!');
    } catch (err) {
        showAlert('Không thể sao chép.');
    }
});

document.getElementById('change-code-btn').addEventListener('click', async () => {
    const newCode = document.getElementById('setting-new-couple-code').value.trim();
    const errorDiv = document.getElementById('change-code-error');
    errorDiv.textContent = '';

    if (!newCode) {
        errorDiv.textContent = 'Vui lòng nhập mã mới.';
        return;
    }
    if (newCode === coupleCode) {
        errorDiv.textContent = 'Mã mới phải khác với mã hiện tại.';
        return;
    }

    loadingText.textContent = "Đang kiểm tra mã mới...";
    loadingOverlay.classList.remove('hidden');
    const newCodeRef = doc(db, "couples", newCode);
    const newCodeSnap = await getDoc(newCodeRef);
    loadingOverlay.classList.add('hidden');

    if (newCodeSnap.exists()) {
        errorDiv.textContent = 'Mã này đã có người sử dụng. Vui lòng chọn mã khác.';
        return;
    }

    showConfirm(`Bạn có chắc muốn đổi mã cặp đôi thành "${newCode}" không? Mã cũ "${coupleCode}" sẽ bị xóa vĩnh viễn.`, async () => {
        try {
            loadingText.textContent = "Đang di chuyển dữ liệu...";
            loadingOverlay.classList.remove('hidden');
            await migrateCoupleData(coupleCode, newCode);
            showAlert('Đổi mã cặp đôi thành công! Ứng dụng sẽ tải lại.');
            setTimeout(() => window.location.reload(), 3000);
        } catch (error) {
            console.error("Lỗi khi đổi mã cặp đôi:", error);
            showAlert(`Đã xảy ra lỗi nghiêm trọng: ${error.message}`);
            loadingOverlay.classList.add('hidden');
        }
    });
});

async function migrateCoupleData(oldCode, newCode) {
    const oldCoupleDocRef = doc(db, "couples", oldCode);
    const oldCoupleSnap = await getDoc(oldCoupleDocRef);
    if (!oldCoupleSnap.exists()) throw new Error("Không tìm thấy dữ liệu cặp đôi cũ.");
    const coupleDataToMigrate = oldCoupleSnap.data();

    const newCoupleDocRef = doc(db, "couples", newCode);
    await setDoc(newCoupleDocRef, coupleDataToMigrate);

    const subcollectionsToMove = ['stories', 'events', 'chat_normal', 'chat_secret'];
    for (const scName of subcollectionsToMove) {
        loadingText.textContent = `Đang chuyển ${scName}...`;
        const oldSubCollectionRef = collection(db, "couples", oldCode, scName);
        const oldDocsSnapshot = await getDocs(oldSubCollectionRef);
        
        if (!oldDocsSnapshot.empty) {
            const batch = writeBatch(db);
            oldDocsSnapshot.forEach(d => {
                const newDocRef = doc(db, "couples", newCode, scName, d.id);
                batch.set(newDocRef, d.data());
                batch.delete(d.ref);
            });
            await batch.commit();
        }
    }

    loadingText.textContent = "Đang cập nhật thông tin người dùng...";
    if (coupleDataToMigrate.partner1) {
        await updateDoc(doc(db, "users", coupleDataToMigrate.partner1.userId), { coupleCode: newCode });
    }
    if (coupleDataToMigrate.partner2) {
        await updateDoc(doc(db, "users", coupleDataToMigrate.partner2.userId), { coupleCode: newCode });
    }

    loadingText.textContent = "Đang dọn dẹp...";
    await deleteDoc(oldCoupleDocRef);
}

// --- STREAK LOVE LOGIC ---
async function checkDailyReset() {
    if (!coupleData || !coupleData.streak) return;

    const today = new Date().toISOString().split('T')[0];
    const lastDate = coupleData.streak.lastDate;

    if (lastDate !== today) {
        const updates = {
            'streak.p1_checked': false,
            'streak.p2_checked': false
        };
        
        if (lastDate) {
            const lastDateTime = new Date(lastDate).getTime();
            const todayTime = new Date(today).getTime();
            const oneDay = 24 * 60 * 60 * 1000;
            if (todayTime - lastDateTime > oneDay) {
                updates['streak.count'] = 0;
            }
        }
        
        await updateDoc(doc(db, "couples", coupleCode), updates);
    }
}

function renderStreakLove() {
    if (!coupleData || !coupleData.streak) {
        streakCount.textContent = '...';
        checkInBtn.disabled = true;
        checkInBtn.textContent = 'Đang tải...';
        return;
    };
    
    const streak = coupleData.streak;
    const streakValue = streak.count || 0;
    streakCount.textContent = streakValue;
    const fireLevel = Math.floor(streakValue / 100);
    streakHeartContainer.className = 'my-6 h-48 flex items-center justify-center text-pink-500 text-9xl';

    if (fireLevel > 0) {
        streakHeartContainer.classList.add('on-fire');
        const displayLevel = Math.min(fireLevel, 3); 
        if (displayLevel > 0) {
            streakHeartContainer.classList.add(`fire-level-${displayLevel}`);
        }
    }
    const partner1 = coupleData.partner1;
    const partner2 = coupleData.partner2;

    if (partner1) {
        partner1CheckinStatus.querySelector('.partner-name').textContent = partner1.name;
        const icon1 = partner1CheckinStatus.querySelector('i');
        icon1.className = streak.p1_checked ? 'fas fa-check-circle text-green-500' : 'fas fa-times-circle text-red-500';
    }
    if (partner2) {
        partner2CheckinStatus.querySelector('.partner-name').textContent = partner2.name;
        const icon2 = partner2CheckinStatus.querySelector('i');
        icon2.className = streak.p2_checked ? 'fas fa-check-circle text-green-500' : 'fas fa-times-circle text-red-500';
    }
    
    const isP1 = userId === partner1?.userId;
    const hasCheckedIn = isP1 ? streak.p1_checked : streak.p2_checked;
    checkInBtn.disabled = hasCheckedIn;
    checkInBtn.textContent = hasCheckedIn ? 'Đã điểm danh hôm nay' : 'Điểm danh hôm nay';
}

checkInBtn.addEventListener('click', async () => {
    if (!coupleData || !coupleData.streak || !coupleData.partner1 || !coupleData.partner2) return;

    const isP1 = userId === coupleData.partner1.userId;
    const today = new Date().toISOString().split('T')[0];
    const updates = {};
    
    updates[isP1 ? 'streak.p1_checked' : 'streak.p2_checked'] = true;

    const otherPartnerChecked = isP1 ? coupleData.streak.p2_checked : coupleData.streak.p1_checked;
    if (otherPartnerChecked) {
        updates['streak.count'] = increment(1);
        updates['streak.lastDate'] = today;
    }

    await updateDoc(doc(db, "couples", coupleCode), updates);
});