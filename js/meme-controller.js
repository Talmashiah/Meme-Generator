
let gCanvas;
let gCtx;

function init() {
    loadData();
    renderImgs();
    renderKeywords();
}

function renderImgs(isFlitered = false) {
    if(!isFlitered){
        var imgs = getImgsToRender();
    } else {
        var imgs = getFilterImgsToRender();
    }
    var memes = imgs.map(function (img) {
        return `<img src="${img.url}" alt="meme" data-id="${img.id}" onclick="onImgClick(this)">`
    })

    document.querySelector('.images-container').innerHTML = memes.join('');
}

function renderKeywords() {
    strHtml = '';
    let keywords = getKeywordsToRender().slice(0, 5);
    keywords.sort(()=> 0.5 - Math.random());
    for (let i = 0; i < 5; i++) {
        const keyword = keywords[i];
        strHtml+=`<span class="keyword" style="font-size:${keyword.count*4}px" onclick="onKeywordClick('${keyword.name}')">${keyword.name} </span>`;
    }
    document.querySelector('.keywords-container').innerHTML = strHtml;
}

function renderCanvas(drawBorder = true) {
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
    drawTexts(memeTexts, meme.selectedTxtIdx);
    if (drawBorder) drawBorderOnTxt();
}

function onSearchImgs(value){
    filterImgsBySearch(value);
    if(value){
        renderImgs(true);
    } else {
        renderImgs();
    }
}

function drawBorderOnTxt() {
    let txtObj = getCurrTxtObj();
    let txtWidth = gCtx.measureText(txtObj.line).width + 20;
    if (!txtObj) return;
    if (txtObj.line.length === 0) return;
    let txtHeight = txtObj.size + 10;
    gCtx.save();
    gCtx.beginPath();
    gCtx.lineWidth = "1";
    gCtx.strokeStyle = "black";
    gCtx.fillStyle = "#0019ff14";
    if(txtObj.align === 'start'){
        gCtx.rect(txtObj.locationX - 10, txtObj.locationY - txtHeight + 10, txtWidth, txtHeight);
    } else if (txtObj.align === 'center'){
        gCtx.rect(txtObj.locationX - txtWidth / 2, txtObj.locationY - txtHeight + 10, txtWidth, txtHeight);
    } else{
        gCtx.rect(txtObj.locationX - txtWidth + 10, txtObj.locationY - txtHeight + 10, txtWidth, txtHeight);
    }
    gCtx.fill();
    gCtx.stroke();
    gCtx.restore();
}

function onGoToGallery() {
    let elCanvasContainer = document.querySelector('.canvas-container');
    elCanvasContainer.classList.add('hidden');
    let elImgsContainer = document.querySelector('.images-container');
    elImgsContainer.classList.remove('hidden')
    let elSearchBar = document.querySelector('.search-bar')
    elSearchBar.classList.remove('hidden');
    elSearchBar.classList.add('flex');
    let elAbout = document.querySelector('.about')
    elAbout.classList.remove('hidden');
    renderImgs();
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function onDownloadCanvas(elLink) {
    renderCanvas(false);
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.png';
    drawBorderOnTxt();
}

function onKeywordClick(keyword){
    filterImgsByKeyword(keyword);
    renderImgs(true);
}

function onFontChange(fontFamily){
    setInitialFontFamily(fontFamily);
    renderCanvas();
}

function onAlignEnd(){
    setAlignEnd();
    renderCanvas();
}

function onAlignCenter(){
    setAlignCenter();
    renderCanvas();
}

function onAlignStart(){
    setAlignStart();
    renderCanvas();
}

function onDeleteLine() {
    deleteLine();
    switchLine();
    renderCanvas();
}

function onAddLine() {
    addLine();
    renderCanvas();
    clearTextInput();
}

function onChangeColor(value) {
    setTxtColor(value);
    renderCanvas();
}


function onSwitchLine() {
    switchLine();
    let initialtxt = getInitialtxt();
    let txtObj = getCurrTxtObj();
    if (!txtObj) return;
    if (initialtxt !== txtObj.line) {
        document.querySelector('.toolbar-text').value = txtObj.line;
    } else {
        clearTextInput();
    }
    renderCanvas();
}

function onLineDown() {
    decreaseLineLocation();
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

function drawTexts(txts, currentTxtId) {
    for (let i = 0; i < txts.length; i++) {
        if (i !== currentTxtId) {
            drawText(txts[i]);
        }
    }
    drawText(txts[currentTxtId]);
}

function drawText(txt) {
    let fontFamily = getInitialFontFamily();
    gCtx.fillStyle = txt.color;
    if(fontFamily === 'impact'){
        gCtx.lineWidth = 2;
    } else {
        gCtx.lineWidth = 1;
    }
    gCtx.shadowBlur = 1;
    gCtx.shadowColor = "black";
    gCtx.font = `${txt.size}px ${fontFamily}`
    gCtx.textAlign = txt.align;
    gCtx.fillText(txt.line, txt.locationX, txt.locationY);
    gCtx.strokeText(txt.line, txt.locationX, txt.locationY);
}

function clearTextInput() {
    document.querySelector('.toolbar-text').value = '';
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function onImgClick(elImg) {
    clearTextInput();
    initgMeme();
    setCanvas();
    moveToGenerator();
    setgMemeId(elImg);
    renderCanvas();
}

function setCanvas() {
    let elCanvasContainer = document.querySelector('.canvas-container');
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

