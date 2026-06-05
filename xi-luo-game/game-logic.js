// ==========================================
// 1. 全域常數與遊戲題目設定
// ==========================================
const INITIAL_SECONDS = 180 * 60; 
const levelsData = [
    { 
        id: 1, 
        title: "第一關：森活武樹園區", 
        desc: "謎題：請觀察道具卡2，解出？\n\n請觀察道具卡3，解出#\n\n請觀察道具卡4，找出共通點！\n\n站立？#！，使用道具卡5、6找出最終謎底",
        answer: "頭崁－雙龍取水", 
        hints: [
            "道具卡2警鈴、示警、警察、警報；道具卡3酉+告=酷、穴+告=窖、告+鳥=鵠、告+非=靠。",
            "道具卡4為撲克牌、車牌、門牌、招牌。",
            "在公園尋找警告牌實際的位置並站在此地(可參考森活武樹園區地圖)，將兩張道具卡5、6重疊，方向標北邊朝下，將基準方向對準警告牌救生圈，觀察另一箭頭指向得出答案。"
        ] 
    },
    { 
        id: 2, 
        title: "第二關：金玉成鐘樓", 
        desc: "謎題：阿善師在這條街上尋找最高的古鐘。\n\n330°西北=基準點\n\n東南150°(24小時制)：東北60°、北0°",
        answer: "18:31", 
        hints: [
            "先找到西螺老街上那個最高的鐘並利用道具卡8、道具卡9拼出與其時鐘相同的樣式。",
            "打開手機指南針APP，330°西北=基準點，對照時鐘為12點(可站在時鐘對面的西螺媽祖杆旁將手機面向金玉城商會上的時鐘)。",
            "帶入小時東南150°(24小時制)得出18點；接著帶入分鐘東北60°=3、北0°=1，得出分鐘為31分。"
        ] 
    },
    { 
        id: 3, 
        title: "第三關：西螺大橋", 
        desc: "謎題：請於蝴蝶之眼 (半圓形長椅附近)中對準正中間的鐵杆在準心上轉動45度並重疊上過去與現在。",
        answer: "米", 
        hints: [
            "先找到蝴蝶公園中眼睛的位置，使看過去的大橋正中間鐵杆呈現重疊。",
            "將十字旋轉45度，重疊0度與45度的十字。",
            "三金。"
        ] 
    },
    { 
        id: 4, 
        title: "第四關：醬油工廠", 
        desc: "謎題：以醬油甕為棋，依照規則破除謎題並用鏡子照出答案。",
        answer: "黑豆", 
        hints: [
            "將道具卡10方程式A、B、C、D、E、F、G答案解出，方程式中(道具卡11)，前面數字代表X，後面數字代表Y，[範例1+(-2)=-1，(X，Y)=(1，-2)]，所有XY座標皆無重複。",
            "次方座標範例A2+A=12，(X，Y)=(9，3)，在棋盤中(道具卡10)找到所有座標並塗黑。",
            "塗黑格子為答案對稱的一半，利用鏡子成像組成完整的字(可到醬油工廠中臥室的鏡子)，即可得出答案。"
        ] 
    },
    { 
        id: 5, 
        title: "第五關：蝴蝶公園", 
        desc: "謎題：蝴蝶不只是一幅圖，翅膀中也藏著一條路徑與一個英文單字。\n\n全圖共有 9 個黑點，其中 7 個黑點對應實地裝置藝術，另外 2 個黑點是路線提示點。請從最右側星號起點出發，依照箭頭方向前進，推理消失黑點的位置，找出完整路線。\n\n走訪每一處裝置藝術時，請讀取旁邊的羅馬數字，並將它轉換成一般數字。\n\n解碼規則：A 到 Z 可視為一組等差數列，A 為首項，首項值為 1，公差為 1。請依照此數列，將數字轉換成對應字母。",
        answer: "VEGETABLE", 
        hints: [
            "請從最右側的星號開始，不要隨意亂走，路線是逆時針方向前進。",
            "請依照箭頭方向，將「XX、XII、V」依序帶入缺少的裝置藝術位置，補完整條路線。",
            "每個裝置旁的羅馬數字要先轉成一般數字，再依照「A 是等差數列的首項，首項值為 1，公差為 1」的規則，解出來就是A=1、B=2、C=3…..Z=26，再依據箭頭順序把對應的字母拼起來。"
        ] 
    },
    { 
        id: 6, 
        title: "第六關：福興宮", 
        desc: "謎題：請參考-道具卡1\n\n♀=3之10→♂=「?」\n\n4之9後裔射太陽，兩個漁夫鬧不合，一個漁夫被砍頭\n\n參拜順序：1F、3F、1F、3F？",
        answer: "1717", 
        hints: [
            "3之10代表第三根柱子、第十個字，4之9同理。",
            "後裔射太陽(日)，兩個漁夫鬧不合(留下一個「夫」字)，一個漁夫被砍頭，得到「天」字。",
            "請在廟裡尋找參拜順序圖找出天公爐代表數字1、7，將天公爐代表數字帶入樓層得出四位數字即為答案。"
        ] 
    },
    { 
        id: 7, 
        title: "第七關：東市場", 
        desc: "謎題：\n1：←↓→↓←\n\n2：利用道具卡12觀察並參考特色景點地圖，找出其中的共通點。\n\n3：1+8=E，4+E+L=?(道具卡13)\n\n4：☾+I",
        answer: "物盡其用", 
        hints: [
            "依箭頭方向畫出筆畫最終可得出數字。",
            "道具卡12為注音組成表格(上：聲母、中：介音、下：韻母、右：聲調)，將數字帶入特色景點地圖得出地點，把地點注音符號寫出分別看聲母、介音、韻母、聲調兩組地點的共通點。範例：右：聲調，地點4「長(三聲)老(三聲)教(四聲)會(四聲)」、地點24 「振(四聲)興(一聲)宮(一聲)」 共同聲調：四聲。",
            "4、E、L轉為電子表形式，並放在一起將重疊的部分刪掉得出數字「7」；月+ I =「用」；諧音5=「物」，7=「其」"
        ] 
    },
    { 
        id: 8, 
        title: "隱藏關：小彩蛋", 
        desc: "謎題：一半藏於線中，一半藏於格中；另一字藏於部首之間。\n\n將小彩蛋道具卡 2 對照小彩蛋道具卡 3 的雲林特產名稱連線，得上半部圖形。；將小彩蛋道具卡 1 依「醬油工廠」玩法帶入道具卡 10，得下半部圖形。上下相合，得第一字。\n\n破解位置線索，求出 X、Y、Z。對照小彩蛋道具卡 4，取出對應部首。三部首合一 nudge，得第二字。\n\n位置線索：\n3 : 2 = X : 2\n5 : 3 = Y+2 : 6\n4 : 7 = 12 : 2Z-1",
        answer: "西螺",
        hints: [] 
    }
];

// ==========================================
// 2. 遊戲核心狀態變數 (防鎖屏修正版)
// ==========================================
let playerName = "";
let totalPenaltyMinutes = 0;
let completedLevels = [];      
let wrongAnswersTracker = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0 };
let unlockedHints = {};        
let levelUsedSeconds = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0 };
let currentLevel = null;

let isTimeUp = false;
let isMainGameFinished = false;
let isHiddenLevelUnlocked = false;

// 🛡️ 核心防作弊時間戳記
let mainStartTimeStamp = null;   // 主線任務開始時間戳記 (毫秒)
let hiddenStartTimeStamp = null; // 隱藏彩蛋開始時間戳記 (毫秒)
let mainFrozenUsedSeconds = 0;   // 主線結束時凍結的花費總秒數
let mainActualUsedSeconds = 0;   // 最終結算使用的實際主線秒數
let hiddenLevelSeconds = 0;      // 隱藏關累積秒數
let remainingSeconds = INITIAL_SECONDS;

// ⏱️ 單關耗時追蹤防線變數
let levelStartTime = 0;          // 點進該關卡時的 remainingSeconds 或正計時秒數

let timerInterval = null;
let hiddenLevelInterval = null;

// ==========================================
// 3. 本地存檔回復機制與初始化 (無提示、自動回復且消除卡頓優化版)
// ==========================================
window.onload = function() {
    if (localStorage.getItem('xi_luo_treasure_save')) {
        try {
            const save = JSON.parse(localStorage.getItem('xi_luo_treasure_save'));
            
            // 基礎資料讀取
            playerName = save.playerName || "";
            totalPenaltyMinutes = save.totalPenaltyMinutes || 0;
            completedLevels = save.completedLevels || [];
            wrongAnswersTracker = save.wrongAnswersTracker || wrongAnswersTracker;
            unlockedHints = save.unlockedHints || {};
            levelUsedSeconds = save.levelUsedSeconds || levelUsedSeconds;
            isTimeUp = save.isTimeUp || false;
            isMainGameFinished = save.isMainGameFinished || false;
            isHiddenLevelUnlocked = save.isHiddenLevelUnlocked || false;
            
            // 時間戳記安全回復
            mainStartTimeStamp = save.mainStartTimeStamp || null;
            hiddenStartTimeStamp = save.hiddenStartTimeStamp || null;
            mainFrozenUsedSeconds = save.mainFrozenUsedSeconds || 0;
            mainActualUsedSeconds = save.mainActualUsedSeconds || 0;
            hiddenLevelSeconds = save.hiddenLevelSeconds || 0;
            remainingSeconds = save.remainingSeconds || INITIAL_SECONDS;

            if (playerName) {
                // 1. 同步與鎖定輸入框
                const nameInput = document.getElementById('player-name-input');
                if (nameInput) {
                    nameInput.value = playerName;
                    nameInput.disabled = true; 
                }

                document.getElementById('display-player-name').innerText = playerName;
                document.getElementById('player-hud').style.display = 'flex';
                document.getElementById('reset-game-btn').style.display = 'inline-block';
                
                // 2. 狀態重啟 (直接執行，拿掉任何 alert 提示)
                if (isTimeUp) {
                    handleTimeUp();
                } else if (isMainGameFinished) {
                    const scoreBtn = document.getElementById('floating-score-btn');
                    if (scoreBtn) scoreBtn.style.display = 'block';
                    startHiddenTimer();
                } else {
                    startTimer();
                }
                
                // 3. 瞬間更新一次介面，消滅切換時的 1 秒閃爍卡頓
                if (isMainGameFinished) {
                    updateHiddenTimerDisplay();
                } else {
                    updateTimerDisplay();
                }
                
                // 4. 直接切換回關卡大廳
                if (typeof switchView === 'function') switchView('levels-view');
            }
        } catch (e) {
            console.error("存檔解讀錯誤，自動重設暫存：", e);
            localStorage.removeItem('xi_luo_treasure_save');
        }
    }
};

// ==========================================
// 4. 計時器防線系統 (TimeStamp 系統) - 零卡頓優化版
// ==========================================
function startAdventure() {
    // 如果本來就已經有名字了，代表是大廳「回首頁」後再度點擊按鈕，直接切換畫面即可
    if (playerName) {
        if (typeof switchView === 'function') switchView('levels-view');
        return;
    }

    const nameInput = document.getElementById('player-name-input');
    const nameValue = nameInput ? nameInput.value.trim() : "";

    if (nameValue === "") {
        alert("⚠️ 請輸入您的名字或隊伍名稱，才能開啟尋寶之旅喔！");
        if (nameInput) nameInput.focus();
        return;
    }
    
    playerName = nameValue;
    if (nameInput) nameInput.disabled = true; // 🌟【安全鎖定】開始遊戲時，立刻禁用輸入框，防中途篡改

    document.getElementById('display-player-name').innerText = playerName;
    document.getElementById('player-hud').style.display = 'flex';
    document.getElementById('reset-game-btn').style.display = 'inline-block';
    
    alert(`⏰ 西螺城市尋寶正式開始！\n\n【冒險規則與計分準則】\n1. 總測驗倒數：180 分鐘（主線任務）。\n2. 答錯免罰空間：每關「前 3 次答錯」安全不扣分，第 4 次（含）起每次累積加罰主大會時間 3 分鐘！\n3. 索取線索提示：解鎖未解鎖提示將一次加罰主時間 10 分鐘，解鎖後重複看免費。\n4. 終極任務：完成前 7 關後主線時間立刻停止凍結！第 8 關彩蛋獨立正計時，不扣大會總成績！\n\n祝 ${playerName} 通關順利，出發！`);
    
    mainStartTimeStamp = Date.now();
    
    startTimer();
    if (typeof switchView === 'function') switchView('levels-view');
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    // 🌟【關鍵優化】在定時器啟動前，搶先同步計算並更新一次時間畫面，消滅卡頓空窗
    const initialElapsed = Math.floor((Date.now() - mainStartTimeStamp) / 1000);
    remainingSeconds = INITIAL_SECONDS - initialElapsed;
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        if (isMainGameFinished || isTimeUp) {
            clearInterval(timerInterval);
            return;
        }

        const realElapsedSeconds = Math.floor((Date.now() - mainStartTimeStamp) / 1000);
        remainingSeconds = INITIAL_SECONDS - realElapsedSeconds;

        if (remainingSeconds <= 0) {
            handleTimeUp();
            return;
        }
        
        updateTimerDisplay();
        saveToLocalStorage(); 
    }, 1000);
}

function startHiddenTimer() {
    if (timerInterval) clearInterval(timerInterval);
    if (hiddenLevelInterval) clearInterval(hiddenLevelInterval);

    if (!hiddenStartTimeStamp) {
        hiddenStartTimeStamp = Date.now();
    }

    if (typeof applyHiddenTimerStyle === 'function') applyHiddenTimerStyle();
    
    // 🌟【關鍵優化】彩蛋關也同步在第 0 秒即時刷新
    hiddenLevelSeconds = Math.floor((Date.now() - hiddenStartTimeStamp) / 1000);
    updateHiddenTimerDisplay();
    
    hiddenLevelInterval = setInterval(() => {
        if (isTimeUp) {
            clearInterval(hiddenLevelInterval);
            return;
        }

        hiddenLevelSeconds = Math.floor((Date.now() - hiddenStartTimeStamp) / 1000);
        
        updateHiddenTimerDisplay();
        saveToLocalStorage(); 
    }, 1000);
}

function updateHiddenTimerDisplay() {
    const timerElement = document.getElementById('game-timer');
    if (timerElement && typeof formatSecondsToHMS === 'function') {
        timerElement.innerText = formatSecondsToHMS(hiddenLevelSeconds);
    }
}

function handleTimeUp() {
    clearInterval(timerInterval);
    if (hiddenLevelInterval) clearInterval(hiddenLevelInterval);
    isTimeUp = true;
    remainingSeconds = 0;
    
    if (typeof applyTimeUpStyle === 'function') applyTimeUpStyle();
    saveToLocalStorage();
    if (currentLevel && typeof openQuiz === 'function') openQuiz(currentLevel.id); 
}

function updateTimerDisplay() {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    
    const timerElement = document.getElementById('game-timer');
    if (timerElement) {
        timerElement.innerText = 
            String(hours).padStart(2, '0') + ":" + String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
    }
    const penaltyElement = document.getElementById('penalty-minutes');
    if (penaltyElement) {
        penaltyElement.innerText = `+${totalPenaltyMinutes} 分`;
    }
}

function accumulateCurrentLevelTime() {
    if (!currentLevel) return;
    const cid = currentLevel.id;
    if (completedLevels.includes(cid)) return;

    if (cid === 8) {
        const delta = hiddenLevelSeconds - levelStartTime;
        if (delta > 0) {
            levelUsedSeconds[8] += delta;
        }
        levelStartTime = hiddenLevelSeconds;
    } else {
        const delta = levelStartTime - remainingSeconds;
        if (delta > 0) {
            levelUsedSeconds[cid] += delta;
        }
        levelStartTime = remainingSeconds;
    }
}

function checkAnswer() {
    if (isTimeUp) return;
    if (completedLevels.includes(currentLevel.id)) return;

    let userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
    let correctAnswer = currentLevel.answer.trim().toLowerCase();
    
    userAnswer = userAnswer.replace(/[-─]/g, '－').replace(/：/g, ':');
    correctAnswer = correctAnswer.replace(/[-─]/g, '－').replace(/：/g, ':');

    if (userAnswer === correctAnswer) {
        accumulateCurrentLevelTime();

        if (typeof applyQuizFeedback === 'function') applyQuizFeedback(true, "🎉 太強了！密碼完全解開！");
        alert("🎉 回答正確！成功解除密碼安全鎖！");

        if (!completedLevels.includes(currentLevel.id)) completedLevels.push(currentLevel.id);
        
        const mainFinishedNow = [1, 2, 3, 4, 5, 6, 7].every(id => completedLevels.includes(id));

        if (currentLevel.id === 8) {
            if (hiddenLevelInterval) clearInterval(hiddenLevelInterval);
            levelUsedSeconds[8] = hiddenLevelSeconds; 
            saveToLocalStorage();
            if (typeof handleHiddenGameComplete === 'function') setTimeout(() => { handleHiddenGameComplete(); }, 1200);
        } else {
            if (mainFinishedNow) {
                isMainGameFinished = true;
                clearInterval(timerInterval);
                mainFrozenUsedSeconds = INITIAL_SECONDS - remainingSeconds;
                mainActualUsedSeconds = mainFrozenUsedSeconds;
            }
            saveToLocalStorage();
            if (typeof switchView === 'function') setTimeout(() => { switchView('levels-view'); }, 1400);
        }
    } else if (userAnswer === "") {
        if (typeof applyQuizFeedback === 'function') applyQuizFeedback(false, "⚠️ 空白無效，請務必先輸入內容再行提交。", 'amber');
        alert("⚠️ 請輸入答案！");
    } else {
        wrongAnswersTracker[currentLevel.id] += 1;
        const currentWrongCount = wrongAnswersTracker[currentLevel.id];
        document.getElementById('quiz-wrong-count').innerText = `❌ 本關已答錯：${currentWrongCount} 次`;

        if (currentLevel.id === 8) {
            if (typeof applyQuizFeedback === 'function') applyQuizFeedback(false, "❌ 驗證碼錯誤！本關不設提示與加罰懲罰，換個切入點試試！", 'red');
            alert(`❌ 密碼不太對喔！\n\n💡 別氣餒，彩蛋隱藏關不扣除大會成績，再冷靜算算看！`);
            saveToLocalStorage();
            return;
        }

        if (currentWrongCount > 3) {
            totalPenaltyMinutes += 3;
            mainStartTimeStamp -= (3 * 60 * 1000); 
            levelStartTime -= (3 * 60);

            updateTimerDisplay(); 
            if (typeof applyQuizFeedback === 'function') applyQuizFeedback(false, `❌ 答錯累計達 ${currentWrongCount} 次！已觸發加罰，大會成績即刻追加加罰 3 分鐘！`, 'red-heavy');
            alert(`🚨 答案錯誤！\n\n❌ 本關已累計答錯超額【 ${currentWrongCount} 】次！\n⚠️ 由於答錯超過 3 次安全邊界，本次送出已累積扣罰加罰時間「 3 分鐘 」！`);
        } else {
            if (typeof applyQuizFeedback === 'function') applyQuizFeedback(false, `❌ 答案與現場碑文線索不符，重新核對看看！（剩餘 ${3 - currentWrongCount} 次免罰扣時機會）`, 'red');
        }
        saveToLocalStorage();
    }
}

function triggerResetProgress() {
    if (confirm('🚨 【終極警告】\n確定要清除全隊所有追蹤進度、加罰紀錄、提示解鎖狀態並重新開始嗎？\n一旦重製，大會時間將回歸 180 分鐘，且無法復原！')) { 
        const adminPassword = prompt("🔒 請輸入重製大會防護密碼 (4碼數字)：");
        if (adminPassword === "0214") {
            if (timerInterval) clearInterval(timerInterval);
            if (hiddenLevelInterval) clearInterval(hiddenLevelInterval);
            
            localStorage.removeItem('xi_luo_treasure_save'); 
            
            playerName = ""; 
            
            // 🌟【解除鎖定】管理員清除檔案重新啟動時，將輸入框放開並清空
            const nameInput = document.getElementById('player-name-input');
            if (nameInput) {
                nameInput.value = "";
                nameInput.disabled = false;
            }

            totalPenaltyMinutes = 0;
            completedLevels = [];
            wrongAnswersTracker = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0 };
            unlockedHints = {};
            levelUsedSeconds = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0 };
            mainStartTimeStamp = null;
            hiddenStartTimeStamp = null;
            mainFrozenUsedSeconds = 0;
            mainActualUsedSeconds = 0;
            hiddenLevelSeconds = 0;
            remainingSeconds = INITIAL_SECONDS;
            
            alert("✅ 密碼驗證成功！遊戲進度已完全歸零，即將重啟系統。");
            location.reload(); 
        } else if (adminPassword === null) {
            alert("😮 已取消重製操作，進度完好無損。");
        } else {
            alert("❌ 密碼錯誤！安全機制已封鎖重製請求。請向大會工作人員確認密碼。");
        }
    }
}

// ==========================================
// 8. 📱 手機虛擬鍵盤擋住視線優化機制
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const answerInput = document.getElementById('answer-input');
    if (answerInput) {
        // 當玩家點擊輸入框準備打字時
        answerInput.addEventListener('focus', () => {
            setTimeout(() => {
                // 自動將輸入框平滑捲動到手機螢幕正中央
                answerInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300); // 延遲 300 毫秒等手機鍵盤完全彈出
        });
    }
}); // 🌟【修正點】補上正確的右大括號與括號，語法結構恢復正常！

// ==========================================
// 9. 💾 本地存檔核心寫入防線
// ==========================================
function saveToLocalStorage() {
    const saveState = {
        playerName,
        totalPenaltyMinutes,
        completedLevels,
        wrongAnswersTracker,
        unlockedHints,
        levelUsedSeconds,
        isTimeUp,
        isMainGameFinished,
        isHiddenLevelUnlocked,
        mainStartTimeStamp,
        hiddenStartTimeStamp,
        mainFrozenUsedSeconds,
        mainActualUsedSeconds,
        hiddenLevelSeconds,
        remainingSeconds
    };
    // 將所有變數打包成 JSON 字串，安全存入手機/瀏覽器暫存中
    localStorage.setItem('xi_luo_treasure_save', JSON.stringify(saveState));
}