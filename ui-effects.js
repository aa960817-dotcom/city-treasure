// ==========================================
// 1. 路由切換與畫面調度效果
// ==========================================

function formatSecondsToHMS(totalSeconds) {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return String(hrs).padStart(2, '0') + ":" + String(mins).padStart(2, '0') + ":" + String(secs).padStart(2, '0');
}

function switchView(viewId) {
    if (viewId === 'levels-view' && typeof currentLevel !== 'undefined' && currentLevel && !completedLevels.includes(currentLevel.id)) {
        if (typeof accumulateCurrentLevelTime === 'function') accumulateCurrentLevelTime();
    }
    
    // 配合 Tailwind 4，全面改用 classList 來管理隱藏狀態
    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('levels-view').classList.add('hidden');
    document.getElementById('quiz-view').classList.add('hidden');
    
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.remove('hidden');
    }
    
    // 導航 HUD 與顯示模式聯動控管
    if (viewId === 'home-view') {
        document.getElementById('player-hud').style.display = 'none';
    } else {
        if (viewId === 'levels-view') {
            renderLevelsGrid();
            document.activeElement.blur(); // 🌟 防呆：返回地圖時讓手機輸入框自動失焦
        }
        if (playerName) {
            document.getElementById('player-hud').style.display = 'flex';
        }
    }
    if (typeof saveToLocalStorage === 'function') saveToLocalStorage();
}

// ==========================================
// 2. 關卡大廳與作答輸入框渲染
// ==========================================
function renderLevelsGrid() {
    const grid = document.getElementById('levels-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    const completedNormalCount = completedLevels.filter(id => id >= 1 && id <= 7).length;
    
    if (completedNormalCount === 7 && !isHiddenLevelUnlocked) {
        isHiddenLevelUnlocked = true;
        if (timerInterval) clearInterval(timerInterval);
        isMainGameFinished = true;
        mainActualUsedSeconds = INITIAL_SECONDS - remainingSeconds;
        document.getElementById('floating-score-btn').style.display = 'block';
        if (typeof saveToLocalStorage === 'function') saveToLocalStorage();
        showMainGameCompleteModal();
        document.getElementById('levels-subtitle').innerHTML = "✨ <span class='text-amber-400 font-extrabold animate-pulse'>時空裂縫已開啟！最終隱藏彩蛋關卡降臨！</span> ✨";
    }

    // 當主線通關後，強置在大廳秀出最終結算按鈕
    if (isMainGameFinished) {
        const scoreBtn = document.getElementById('floating-score-btn');
        if (scoreBtn) scoreBtn.style.display = 'block';
    }

    levelsData.forEach(level => {
        if (level.id === 8 && !isHiddenLevelUnlocked) return;

        const isDone = completedLevels.includes(level.id);
        const titleText = isDone ? `${level.title} <span class="text-green-400 text-xs font-bold ml-1">(✓ 已破解)</span>` : level.title;
        
        let borderClass = isDone ? 'border-green-600/60 hover:border-green-400 shadow-glow-green/20' : 'border-slate-800 hover:border-amber-500/50';
        let badgeClass = isDone ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30';
        let hiddenCardGlow = (level.id === 8 && !isDone) ? "shadow-glow-gold border-amber-500 bg-amber-950/10 animate-pulse" : "";

        const card = document.createElement('div');
        card.className = `bg-slate-900/80 rounded-2xl p-5 border ${borderClass} ${hiddenCardGlow} cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col justify-between`;
        card.setAttribute('onclick', `openQuiz(${level.id})`);
        card.innerHTML = `
            <div>
                <div class="w-8 h-8 rounded-full ${badgeClass} flex items-center justify-center font-bold mb-3 border text-xs font-mono">
                    ${level.id === 8 ? '★' : String(level.id).padStart(2, '0')}
                </div>
                <h3 class="text-base font-bold text-white mb-1.5 tracking-wide">${titleText}</h3>
                <p class="text-xs text-slate-500 font-medium">${isDone ? `⏱️ 破解耗時：${formatSecondsToHMS(levelUsedSeconds[level.id])}` : (level.id === 8 ? '🔥 終極時空魔王關卡' : '📍 現場搜查中，點擊挑戰...')}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ==========================================
// 3. 輸入框與按鈕狀態控管動效 (包含超時與通關鎖死)
// ==========================================
function updateQuizUIState(isDone) {
    const inputField = document.getElementById('answer-input');
    const submitBtn = document.getElementById('submit-btn');
    const feedback = document.getElementById('feedback-message');

    if (isTimeUp) { 
        inputField.value = ''; 
        inputField.disabled = true;
        inputField.className = "w-full px-4 py-3 bg-red-950/20 border border-red-900 rounded-xl text-red-400 cursor-not-allowed outline-none font-medium text-center";
        submitBtn.disabled = true; 
        submitBtn.innerText = "挑戰時間已全面結束";
        submitBtn.className = "w-full bg-slate-800 text-slate-500 font-bold py-3 rounded-xl shadow-md cursor-not-allowed";
        feedback.style.display = 'block';
        feedback.className = "bg-red-950/40 text-red-400 border border-red-900/50 p-3 rounded-xl text-center font-bold text-xs";
        feedback.innerText = "⏰ 180 分鐘倒數已歸零！大會競賽已畫下句點，彩蛋關亦停止作答。";
    } else if (isDone) {
        inputField.value = currentLevel.answer; 
        inputField.disabled = true;
        inputField.className = "w-full px-4 py-3 bg-slate-950 border border-green-800 rounded-xl text-green-400 cursor-not-allowed outline-none font-extrabold text-center tracking-wider";
        submitBtn.disabled = true; 
        submitBtn.innerText = "此關卡已成功破譯";
        submitBtn.className = "w-full bg-slate-800 text-slate-400 font-bold py-3 rounded-xl cursor-not-allowed";
        feedback.style.display = 'block';
        feedback.className = "bg-green-950/40 text-green-400 border border-green-800/50 p-3 rounded-xl text-center font-bold text-xs";
        feedback.innerText = "✨ 本題答案正確！玩家可自由檢索此處線索紀錄。";
    } else {
        inputField.value = ''; 
        inputField.disabled = false;
        inputField.className = "w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition font-medium placeholder-slate-600";
        submitBtn.disabled = false; 
        submitBtn.innerText = "提交答案";
        submitBtn.className = "w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3 rounded-xl shadow-md cursor-pointer transition transform active:scale-99";
        feedback.style.display = 'none';
    }
}

function applyQuizFeedback(isCorrect, message, type = 'green') {
    const feedback = document.getElementById('feedback-message');
    feedback.style.display = 'block';
    feedback.innerText = message;
    if (isCorrect) {
        feedback.className = "bg-green-900/40 text-green-300 border border-green-700/60 p-3 rounded-xl text-center font-bold text-xs animate-pulse";
    } else if (type === 'amber') {
        feedback.className = "bg-amber-900/40 text-amber-300 border border-amber-700/50 p-3 rounded-xl text-center font-bold text-xs";
    } else if (type === 'red-heavy') {
        feedback.className = "bg-red-950 text-red-400 border border-red-600 p-3 rounded-xl text-center font-bold text-xs shadow-lg";
    } else {
        feedback.className = "bg-red-900/40 text-red-300 border border-red-700/50 p-3 rounded-xl text-center font-bold text-xs";
    }
}

function applyHiddenTimerStyle() {
    const timerBox = document.getElementById('timer-box');
    if (timerBox) {
        timerBox.className = "bg-slate-900/95 backdrop-blur border border-amber-400 px-4 py-1.5 rounded-xl flex items-center space-x-3 shadow-glow-gold";
    }
    document.getElementById('timer-label').innerText = "✨ 彩蛋耗時";
    document.getElementById('penalty-box').style.display = 'none'; 
}

function applyTimeUpStyle() {
    const timerBox = document.getElementById('timer-box');
    if (timerBox) {
        timerBox.className = "bg-red-950/95 backdrop-blur border border-red-500 px-4 py-1.5 rounded-xl flex items-center space-x-3";
    }
    document.getElementById('timer-label').innerText = "⏰ 狀態";
    document.getElementById('game-timer').innerText = "時間到！結束作答";
    document.getElementById('game-timer').className = "text-sm font-bold text-red-200 tracking-wide";
}

// ==========================================
// 4. 提示確認彈出視窗 UI 控制
// ==========================================
function updateHintButtonsStyle() {
    if (!currentLevel || currentLevel.id === 8) return;
    for (let i = 1; i <= 3; i++) {
        const btn = document.getElementById(`hint-btn-${i}`);
        if (!btn) continue;
        const hintKey = `${currentLevel.id}_${i}`;
        if (unlockedHints[hintKey]) {
            btn.className = "w-full bg-emerald-700 border border-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs text-center transition";
            btn.innerHTML = `🔓 提示${i} (已看)`;
        } else {
            btn.className = "w-full bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 py-2.5 rounded-xl text-xs text-center transition cursor-pointer font-semibold";
            btn.innerHTML = `💡 提示${i}`;
        }
    }
}

function askForHint(hintNumber) {
    if (isTimeUp) return;
    const hintKey = `${currentLevel.id}_${hintNumber}`;
    const modal = document.getElementById('hint-modal');
    const contentDiv = document.getElementById('modal-hint-content');
    const confirmBtn = document.getElementById('modal-confirm-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const warningText = document.getElementById('modal-hint-warning');

    if (unlockedHints[hintKey]) {
        document.getElementById('modal-hint-title').innerText = `🔓 檢閱線索提示 ${hintNumber}`;
        warningText.innerHTML = "✨ 本項目先前已成功付費，重複翻閱完全免費。";
        contentDiv.innerText = currentLevel.hints[hintNumber - 1];
        contentDiv.style.display = 'block';
        cancelBtn.style.display = 'none';
        confirmBtn.innerText = "關閉視窗";
        confirmBtn.className = "w-full bg-slate-800 text-slate-300 hover:bg-slate-700 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition";
        confirmBtn.onclick = function() { closeHint(); };
        modal.style.display = 'flex';
        return;
    }

    document.getElementById('modal-hint-title').innerText = `🚨 解鎖提示 ${hintNumber} ？`;
    warningText.innerHTML = "這是您首次翻開此線索。\n大會官方將從最終競賽總成績內<span class='text-red-400 font-extrabold mx-0.5 bg-red-950/40 px-1 rounded'>加罰 10 分鐘</span>！";
    contentDiv.style.display = 'none';
    cancelBtn.style.display = 'block';
    confirmBtn.innerText = "確定解鎖 (+10分鐘)";
    confirmBtn.className = "w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-2.5 rounded-xl text-sm font-extrabold cursor-pointer transition shadow-md";
    
    confirmBtn.onclick = function() {
        totalPenaltyMinutes += 10;
        unlockedHints[hintKey] = true; 
        updateTimerDisplay(); 
        updateHintButtonsStyle();
        if (typeof saveToLocalStorage === 'function') saveToLocalStorage();
        
        contentDiv.innerText = currentLevel.hints[hintNumber - 1];
        contentDiv.style.display = 'block';
        cancelBtn.style.display = 'none';
        warningText.innerHTML = "✨ 點扣完成！線索已成功投射，解鎖後翻閱終身免開銷。";
        confirmBtn.innerText = "收下提示線索";
        confirmBtn.className = "w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl text-sm font-bold cursor-pointer transition";
        confirmBtn.onclick = function() { closeHint(); };
    };
    modal.style.display = 'flex';
}

function closeHint() { 
    document.getElementById('hint-modal').style.display = 'none'; 
}

// ==========================================
// 5. 大會官方成績單模組彈窗渲染
// ==========================================
function generateLevelTimeDetailsHTML() {
    let html = `<div class="mt-3 border-t border-slate-800 pt-2.5"><div class="text-xs text-amber-400 font-bold mb-1.5 flex items-center">📊 歷史搜查關卡耗時分佈：</div>`;
    for (let i = 1; i <= 7; i++) {
        const isDone = completedLevels.includes(i);
        html += `<div class="flex justify-between text-xs text-slate-400 py-0.5"><span>關卡 0${i}：${levelsData[i-1].title.split('：')[1]}</span><span class="font-mono font-medium">${isDone ? formatSecondsToHMS(levelUsedSeconds[i]) : '未解開'}</span></div>`;
    }
    return html + `</div>`;
}

function openScoreBoard() {
    if (typeof accumulateCurrentLevelTime === 'function') accumulateCurrentLevelTime();
    if (completedLevels.includes(8)) buildHiddenGameCompleteMarkup(); else buildMainGameCompleteMarkup();
    document.getElementById('finish-modal').style.display = 'flex';
}

function buildMainGameCompleteMarkup() {
    const mainTotalSeconds = mainActualUsedSeconds + (totalPenaltyMinutes * 60);
    document.getElementById('finish-results-box').innerHTML = `
        <div class="text-amber-400 font-bold mb-1 text-sm">探險隊伍：${playerName}</div>
        <div class="flex justify-between py-0.5"><span>實地解謎實際耗時：</span><span class="font-mono">${formatSecondsToHMS(mainActualUsedSeconds)}</span></div>
        <div class="flex justify-between text-red-400 py-0.5"><span>大會懲罰扣加罰時間：</span><span class="font-mono">+${totalPenaltyMinutes} 分鐘</span></div>
        <div class="border-t border-slate-800 mt-2 pt-2 flex justify-between font-extrabold text-green-400 text-base"><span>🏆 大會競賽最終計分：</span><span class="font-mono">${formatSecondsToHMS(mainTotalSeconds)}</span></div>
        ${generateLevelTimeDetailsHTML()}
    `;
}

function buildHiddenGameCompleteMarkup() {
    const mainTotalSeconds = mainActualUsedSeconds + (totalPenaltyMinutes * 60);
    document.getElementById('finish-results-box').innerHTML = `
        <div class="text-amber-400 font-extrabold mb-1 text-sm">👑 完美稱霸：${playerName}</div>
        <div class="flex justify-between py-0.5"><span>大會主線競賽終端總分：</span><span class="font-mono text-green-400 font-bold">${formatSecondsToHMS(mainTotalSeconds)}</span></div>
        <div class="flex justify-between border-t border-slate-800 mt-2 pt-2 text-amber-300 font-bold py-0.5"><span>✨ 彩蛋隱藏關獨立耗時：</span><span class="font-mono">${formatSecondsToHMS(hiddenLevelSeconds)}</span></div>
        ${generateLevelTimeDetailsHTML()}
    `;
}

function showMainGameCompleteModal() { openScoreBoard(); }
            
function handleHiddenGameComplete() { 
    if (hiddenLevelInterval) clearInterval(hiddenLevelInterval); 
    openScoreBoard(); 
}

function closeFinishModal() { 
    document.getElementById('finish-modal').style.display = 'none'; 
    switchView('levels-view');
}

function openQuiz(levelId) {
    const targetLevel = levelsData.find(l => l.id === levelId);
    if (!targetLevel) return;

    currentLevel = targetLevel;
    
    if (typeof remainingSeconds !== 'undefined') {
        levelStartTime = remainingSeconds;
    }

    if (levelId === 8) {
        if (typeof startHiddenTimer === 'function') {
            startHiddenTimer(); 
        }
    }

    document.getElementById('quiz-id').innerText = levelId === 8 ? "BONUS LEVEL" : `LEVEL ${String(levelId).padStart(2, '0')}`;
    document.getElementById('quiz-title').innerText = targetLevel.title;
    document.getElementById('quiz-description').innerText = targetLevel.desc;

    const wrongCount = wrongAnswersTracker[levelId] || 0;
    document.getElementById('quiz-wrong-count').innerText = `❌ 本關已答錯：${wrongCount} 次`;

    const isDone = completedLevels.includes(levelId);
    
    const hintSectionTitle = document.getElementById('hint-section-title');
    const hintNotice = document.getElementById('hint-penalty-notice');
    const hintContainer = document.getElementById('hint-buttons-container');
    
    if (levelId === 8) {
        if (hintSectionTitle) hintSectionTitle.style.display = 'none';
        if (hintNotice) hintNotice.style.display = 'none';
        if (hintContainer) hintContainer.style.display = 'none';
    } else {
        if (hintSectionTitle) hintSectionTitle.style.display = 'block';
        if (hintNotice) hintNotice.style.display = 'block';
        if (hintContainer) hintContainer.style.display = 'grid';
        updateHintButtonsStyle();
    }

    updateQuizUIState(isDone);
    switchView('quiz-view');
}

// ==========================================
// 6. 綁定鍵盤 Enter 鍵送出答案功能
// ==========================================
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const answerInput = document.getElementById('answer-input');
        if (answerInput && document.activeElement === answerInput) {
            event.preventDefault(); 
            if (typeof checkAnswer === 'function') {
                checkAnswer();
            }
        }
    }
});