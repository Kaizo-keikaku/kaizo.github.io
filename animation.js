document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------
    // 1. オープニングアニメーション（新規追加）
    // --------------------------------------------------
    const openingTextElement = document.getElementById('opening-text');
    const openingOverlay = document.getElementById('opening-overlay');
    const siteBody = document.body;
    
    // タイピングと漢字変換のシーケンス
    const typingSequence = [
        { text: "k", delay: 100 },
        { text: "か", delay: 100 },
        { text: "かい", delay: 100 },
        { text: "かいz", delay: 100 },
        { text: "かいぞ", delay: 100 },
        { text: "かいぞう", delay: 100 },
        { text: "改造", delay: 200 }, // 漢字変換のポーズ
        { text: "解像", delay: 200 }, // 漢字変換のポーズ
        { text: "海象", delay: 300 }, // 最終変換
        { text: "海象k", delay: 100 },
        { text: "海象け", delay: 100 },
        { text: "海象けい", delay: 100 },
        { text: "海象けいk", delay: 100 },
        { text: "海象けいか", delay: 100 },
        { text: "海象けいかk", delay: 100 },
        { text: "海象けいかく", delay: 100 },
        { text: "海象計画", delay: 500 } // 最後の文字で少し待つ
    ];

    let sequenceIndex = 0;

    function typeEffect() {
        if (sequenceIndex < typingSequence.length) {
            const step = typingSequence[sequenceIndex];
            openingTextElement.textContent = step.text;
            sequenceIndex++;
            setTimeout(typeEffect, step.delay);
        } else {
            // タイピング終了後、2秒間表示を維持してからフェードアウト
            setTimeout(() => {
                openingOverlay.style.opacity = '0'; // オーバーレイをフェードアウト
                // サイト本体を表示
                siteBody.style.opacity = '1';

                setTimeout(() => {
                    openingOverlay.style.display = 'none'; // フェードアウト後に非表示にする
                    // スクロール連動フェードインの監視を開始
                    startScrollFadeIn();
                }, 500); // フェードアウトの時間に合わせる (0.5秒)
            }, 2000); // 2秒間表示
        }
    }

    // アニメーション開始
    typeEffect();


    // --------------------------------------------------
    // 2. スクロール連動フェードイン
    // --------------------------------------------------
    // オープニングアニメーション完了後に呼び出される
    function startScrollFadeIn() {
        const fadeElements = document.querySelectorAll('.fade-up');
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        });
        fadeElements.forEach(el => scrollObserver.observe(el));
    }


    // --------------------------------------------------
    // 3. ポップアップ制御
    // --------------------------------------------------
    const triggers = document.querySelectorAll('.work-trigger');
    const closeBtns = document.querySelectorAll('.close-modal-btn');
    const body = document.body;

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-target');
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.classList.add('active');
                body.classList.add('no-scroll');
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            modal.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });
});
