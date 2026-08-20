// ==============================
// Countdown V2
// ==============================


// 目标时间
// 2026年8月23日 20:00
// UTC+8 北京时间

const targetDate =
    new Date("2026-08-23T20:00:00+08:00");


// 用于计算进度
// 这里使用网页第一次打开的时间
const startDate = new Date();


// ==============================
// 获取 HTML 元素
// ==============================

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");

const currentTimeElement =
    document.getElementById("current-time");

const progressFill =
    document.getElementById("progress-fill");

const progressPercent =
    document.getElementById("progress-percent");

const countdownElement =
    document.getElementById("countdown");


// ==============================
// 两位数
// ==============================

function formatNumber(number) {

    return String(number).padStart(2, "0");

}


// ==============================
// 更新当前时间
// ==============================

function updateCurrentTime() {

    const now = new Date();

    const hours =
        formatNumber(now.getHours());

    const minutes =
        formatNumber(now.getMinutes());

    const seconds =
        formatNumber(now.getSeconds());

    currentTimeElement.textContent =
        `${hours}:${minutes}:${seconds}`;

}


// ==============================
// 数字变化动画
// ==============================

function animateNumber(element) {

    element.style.transform =
        "translateY(-4px)";

    element.style.opacity =
        "0.5";

    setTimeout(() => {

        element.style.transform =
            "translateY(0)";

        element.style.opacity =
            "1";

    }, 120);

}


// ==============================
// 更新倒计时
// ==============================

function updateCountdown() {

    const now = new Date();

    const difference =
        targetDate - now;


    // ==========================
    // 倒计时结束
    // ==========================

    if (difference <= 0) {

        countdownElement.innerHTML =
            '<div class="finished">TIME\'S UP</div>';

        progressFill.style.width =
            "100%";

        progressPercent.textContent =
            "100%";

        return;
    }


    // ==========================
    // 时间计算
    // ==========================

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
            (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
            (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    // ==========================
    // 更新数字
    // ==========================

    const newDays =
        formatNumber(days);

    const newHours =
        formatNumber(hours);

    const newMinutes =
        formatNumber(minutes);

    const newSeconds =
        formatNumber(seconds);


    if (daysElement.textContent !== newDays) {

        animateNumber(daysElement);

    }

    if (hoursElement.textContent !== newHours) {

        animateNumber(hoursElement);

    }

    if (minutesElement.textContent !== newMinutes) {

        animateNumber(minutesElement);

    }

    if (secondsElement.textContent !== newSeconds) {

        animateNumber(secondsElement);

    }


    daysElement.textContent =
        newDays;

    hoursElement.textContent =
        newHours;

    minutesElement.textContent =
        newMinutes;

    secondsElement.textContent =
        newSeconds;


    // ==========================
    // 进度条
    // ==========================

    const totalDuration =
        targetDate - startDate;

    const elapsed =
        now - startDate;

    let progress =
        (elapsed / totalDuration) * 100;


    progress =
        Math.max(
            0,
            Math.min(100, progress)
        );


    progressFill.style.width =
        `${progress}%`;

    progressPercent.textContent =
        `${progress.toFixed(1)}%`;
}


// ==============================
// 鼠标移动背景效果
// ==============================

document.addEventListener(
    "mousemove",
    (event) => {

        const x =
            event.clientX /
            window.innerWidth;

        const y =
            event.clientY /
            window.innerHeight;


        const ambient1 =
            document.querySelector(".ambient-1");

        const ambient2 =
            document.querySelector(".ambient-2");


        ambient1.style.transform =
            `translate(${x * 40}px, ${y * 40}px)`;


        ambient2.style.transform =
            `translate(${-x * 30}px, ${-y * 30}px)`;

    }
);


// ==============================
// 初始化
// ==============================

updateCountdown();

updateCurrentTime();


// ==============================
// 每秒更新
// ==============================

setInterval(
    updateCountdown,
    1000
);

setInterval(
    updateCurrentTime,
    1000
);
