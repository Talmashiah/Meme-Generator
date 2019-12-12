
function init() {
    loadData();
    renderImgs()
}

function renderImgs() {
    var imgs = getImgsToRender();
    var memes = imgs.map(function (img) {
        return `<img src="${img.url}" alt="meme" data-id="${img.id}" onclick="onImgClick(this)">`
    })

    document.querySelector('.images-container').innerHTML = memes.join('');
}

function renderCanvas() {
    let meme = getgMeme();
    let memeId = meme.selectedImgId;
    let memeTexts = meme.txts;
    let elArr = document.querySelectorAll(`[data-id='${memeId}']`);
    if (!elArr || elArr.length === 0) {
        return;
    }
    let elImg = elArr[0];
    clearCanvas();
    drawImg(elImg);
    drawTexts(memeTexts);
}

function onGoToGallery(){
    let elCanvasContainer = document.querySelector('.canvas-container');
    elCanvasContainer.classList.add('hidden');
    let elImgsContainer = document.querySelector('.images-container');
    elImgsContainer.classList.remove('hidden')
    let elSearchBar = document.querySelector('.search-bar')
    elSearchBar.classList.remove('hidden');
    elSearchBar.classList.add('flex');
    let elAbout = document.querySelector('.about')
    elAbout.classList.remove('hidden');
}

function onDownloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.png'
}

function onDeleteLine() {
    deleteLine();
    switchLine();
    renderCanvas();
}

function onAddLine() {
    addLine();
    renderCanvas();
}

function onChangeColor(value) {
    setTxtColor(value);
    renderCanvas();
}


function onSwitchLine() {
    switchLine();
    renderCanvas();
}

function onLineDown() {
    decreaseLineLocation()
    renderCanvas();
}

function onLineUp() {
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

function drawTexts(txts) {
    for (let i = 0; i < txts.length; i++) {
        const txt = txts[i];
        gCtx.fillStyle = txt.color;
        gCtx.lineWidth = 2;
        gCtx.shadowBlur = 1;
        gCtx.shadowColor = "black";
        gCtx.font = `${txt.size}px impact`
        gCtx.textAlign = "center"; 
        gCtx.fillText(txt.line, txt.locationX, txt.locationY);
        gCtx.strokeText(txt.line, txt.locationX, txt.locationY);
    }
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function onImgClick(elImg) {
    setCanvas();
    moveToGenerator();
    setgMemeId(elImg);
    renderCanvas();
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
    let elAbout = document.querySelector('.about')
    elImgsContainer.classList.add('hidden');
    elSearchBar.classList.add('hidden');
    elSearchBar.classList.remove('flex');
    elAbout.classList.add('hidden');
}

