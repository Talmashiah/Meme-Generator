
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

function renderCanvas(){
    let currMeme = getgMeme();
    let elImg = document.getElementById(currMeme.selectedImgId)
    clearCanvas();
    drawImg(elImg);
    drawText(getgMemeTxt(), 15, 50);
}

function ontypeTxt(value){
    setgMemeTxt(value);
    renderCanvas();
}

function drawText(txt, x, y) { 
    gCtx.fillStyle = 'red'
    gCtx.font = '50px impact'
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function onImgClick(elImg){
    setCanvas();
    moveToGenerator();
    setgMemeId(elImg);
    drawImg(elImg);
}

function setCanvas(){
    elCanvasContainer = document.querySelector('.canvas-container');
    elCanvasContainer.classList.remove('hidden');
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
}

function drawImg(elImg) {
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
    //    if (gImg)
    //         gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
    //     else {
    //         gImg = new Image()
    //         gImg.onload = () => {
    //             gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
    //         };
    //         gImg.src = 'imgs/meme1.jpg'
    //     }
    // NOTE: the proportion of the image - should be as the canvas,
    // otherwise the image gets distorted
}

function moveToGenerator(){
    let elImgsContainer = document.querySelector('.images-container')
    let elSearchBar = document.querySelector('.search-bar')
    elImgsContainer.classList.add('hidden');
    elSearchBar.classList.add('hidden');
}

