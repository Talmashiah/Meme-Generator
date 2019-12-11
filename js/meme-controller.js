
function init() {
    loadData();
    renderImgs()
}

function renderImgs() {
    var imgs = getImgsToRender();
    var memes = imgs.map(function (img) {
        return `<img src="${img.url}" alt="meme" id="${img.id}" data-id="${img.id}" onclick="onImgClick(this)">`
    })

    document.querySelector('.images-container').innerHTML = memes.join('');
}

function renderCanvas() {
    let meme = getgMeme();
    let elImg = document.getElementById(meme.selectedImgId)
    let fontSize = getFontSize();
    let memeTxt = getgMemeTxt();
    let y = getLineLocation()
    clearCanvas();
    drawImg(elImg);
    drawText(memeTxt, 15, y, fontSize);
}


function onSwitchLine(){
    switchLine();
    renderCanvas();
}

function onLineDown(){
    decreaseLineLocation()
    renderCanvas();
}

function onLineUp(){
    increaseLineLocation();
    renderCanvas();
}

function onIncreaseFont() {
    increaseFontSize();
    renderCanvas();
}

function onDecreaseFont() {
    decreaseFontSize();
    renderCanvas();
}

function ontypeTxt(value) {
    setgMemeTxt(value);
    renderCanvas();
}

function drawText(txt, x, y, fontSize) {
    gCtx.fillStyle = 'white'
    gCtx.font = `${fontSize}px impact`
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function onImgClick(elImg) {
    setCanvas();
    moveToGenerator();
    setgMemeId(elImg);
    drawImg(elImg);
}

function setCanvas() {
    elCanvasContainer = document.querySelector('.canvas-container');
    elCanvasContainer.classList.remove('hidden');
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
}

function drawImg(elImg) {
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function moveToGenerator() {
    let elImgsContainer = document.querySelector('.images-container')
    let elSearchBar = document.querySelector('.search-bar')
    elImgsContainer.classList.add('hidden');
    elSearchBar.classList.add('hidden');
}

