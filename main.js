const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

const ui = {
    selectedTab: 0
};

const tabs = ["Home", "Jogos", "Apps", "Loja"];

const keys = {
    left: false,
    right: false
};

window.addEventListener("keydown", function(e) {
    if (e.key === "ArrowLeft") keys.left = true;
    if (e.key === "ArrowRight") keys.right = true;
});

window.addEventListener("keyup", function(e) {
    if (e.key === "ArrowLeft") keys.left = false;
    if (e.key === "ArrowRight") keys.right = false;
});

let canMove = true;

function readInput() {

    if (canMove) {

        if (keys.right) {
            ui.selectedTab++;

            if (ui.selectedTab >= tabs.length) {
                ui.selectedTab = 0;
            }

            canMove = false;
        }

        if (keys.left) {
            ui.selectedTab--;

            if (ui.selectedTab < 0) {
                ui.selectedTab = tabs.length - 1;
            }

            canMove = false;
        }
    }

    if (!keys.left && !keys.right) {
        canMove = true;
    }
}

function roundRect(x, y, w, h, r) {

    ctx.beginPath();

    ctx.moveTo(x + r, y);

    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);

    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);

    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);

    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);

    ctx.closePath();
}

function drawBackground() {
    ctx.fillStyle = "#181818";
    ctx.fillRect(0, 0, 640, 448);
}

function drawTopBar() {

    const startX = 28;
    const y = 18;
    const spacing = 112;

    ctx.font = "18px Arial";

    for (let i = 0; i < tabs.length; i++) {

        const x = startX + i * spacing;

        if (i === ui.selectedTab) {

            ctx.fillStyle = "#ffffff";

            roundRect(
                x - 12,
                y - 7,
                92,
                30,
                15
            );

            ctx.fill();

            ctx.fillStyle = "#000000";
        }
        else {
            ctx.fillStyle = "#ffffff";
        }

        ctx.fillText(tabs[i], x, y + 12);
    }
}

function drawHeader() {

    ctx.fillStyle = "#ffffff";
    ctx.font = "34px Arial";
    ctx.fillText("NicDevOS", 30, 92);

    ctx.fillStyle = "#bdbdbd";
    ctx.font = "15px Arial";
    ctx.fillText("Sistema moderno para PlayStation 2", 30, 122);

    ctx.fillStyle = "#888888";
    ctx.fillText("Recentes   Armazenamento   Midia", 30, 146);
}

function drawCards() {

    const startX = 30;
    const y = 250;
    const w = 96;
    const h = 56;
    const gap = 12;

    for (let i = 0; i < 5; i++) {

        const x = startX + i * (w + gap);

        ctx.fillStyle = "#505050";

        roundRect(x, y, w, h, 10);

        ctx.fill();
    }
}

function loop() {

    readInput();

    drawBackground();
    drawTopBar();
    drawHeader();
    drawCards();

    requestAnimationFrame(loop);
}

loop();