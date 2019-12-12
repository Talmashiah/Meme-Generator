'use strict'

let gMeme;
let gId = 1;
let gImgs;
let initialFontSize = 50;
let initialTxt = 'Add text here';
let initialAlign = 'center';
let initialColor = 'white';

initgMeme();

function getMemeData(){
    return {
        selectedImgId: 1,
        selectedTxtIdx: 0,
        txts: [
            createTxtObj(250, 60),
            createTxtObj(250, 480)
        ]
    }
}

function createTxtObj(locationX, locationY){
    return {
        line: initialTxt,
        size: initialFontSize,
        locationX,
        locationY,
        align: initialAlign,
        color: initialColor
    };
}

function loadData() {
    createImgs();
}

function createImgs() {
    gImgs = [];
    gImgs.push(createimg('imgs/1.jpg', ['happy']));
    gImgs.push(createimg('imgs/2.jpg', ['sad']));
    gImgs.push(createimg('imgs/3.jpg', ['happy']));
    gImgs.push(createimg('imgs/4.jpg', ['sad']));
    gImgs.push(createimg('imgs/5.jpg', ['happy']));
    gImgs.push(createimg('imgs/6.jpg', ['sad']));
    gImgs.push(createimg('imgs/7.jpg', ['happy']));
    gImgs.push(createimg('imgs/8.jpg', ['sad']));
    gImgs.push(createimg('imgs/9.jpg', ['happy']));
    gImgs.push(createimg('imgs/10.jpg', ['sad']));
    gImgs.push(createimg('imgs/11.jpg', ['happy']));
    gImgs.push(createimg('imgs/12.jpg', ['sad']));
    gImgs.push(createimg('imgs/13.jpg', ['happy']));
    gImgs.push(createimg('imgs/14.jpg', ['sad']));
    gImgs.push(createimg('imgs/15.jpg', ['happy']));
    gImgs.push(createimg('imgs/16.jpg', ['sad']));
    gImgs.push(createimg('imgs/17.jpg', ['happy']));
    gImgs.push(createimg('imgs/18.jpg', ['sad']));
}

function createimg(url, keywords) {
    return {
        id: gId++,
        url,
        keywords,
    }
}

function initgMeme(){
    gMeme = getMemeData();
}

function deleteLine() {
    gMeme.txts.splice(gMeme.selectedTxtIdx, 1);
}

function addLine() {
    gMeme.txts.push(createTxtObj(250, 250));
    gMeme.selectedTxtIdx = gMeme.txts.length-1;
}

function getCurrTxtObj(){
    return gMeme.txts[gMeme.selectedTxtIdx];
}

function getgMeme() {
    return gMeme;
}

function getInitialFontSize(){
    return initialFontSize;
}

function getInitialtxt(){
    return initialTxt;
}

function getImgsToRender() {
    return gImgs;
}

function getImgUrl() {
    let img = getImgByID(gMeme.selectedImgId);
    return img;
}


function getImgByID(Id) {
    return gImgs.find(function (img) {
        return img.id === Id;
    })
}

function increaseLineLocation() {
    let currTxt = gMeme.txts[gMeme.selectedTxtIdx];
    if (currTxt) {
        currTxt.locationY--;
    }
}

function decreaseLineLocation() {
    let currTxt = gMeme.txts[gMeme.selectedTxtIdx];
    if (currTxt) {
        currTxt.locationY++;
    }
}

function increaseFontSize() {
    let currTxt = gMeme.txts[gMeme.selectedTxtIdx];
    if (currTxt) {
        currTxt.size++;
    }
}

function decreaseFontSize() {
    let currTxt = gMeme.txts[gMeme.selectedTxtIdx];
    if (currTxt) {
        currTxt.size--;
    }
}

function switchLine() {
    if (gMeme.selectedTxtIdx < gMeme.txts.length - 1) {
        gMeme.selectedTxtIdx++
    } else {
        gMeme.selectedTxtIdx = 0;
    }
}


function setTxtColor(value) {
    let currTxt = gMeme.txts[gMeme.selectedTxtIdx];
    if (currTxt) {
        currTxt.color = value;
    }
}

function setgMemeTxt(value) {
    let currTxt = gMeme.txts[gMeme.selectedTxtIdx];
    if (currTxt) {
        currTxt.line = value;
    }
}


function setgMemeId(elImg) {
    let imgId = +elImg.dataset.id;
    let img = getImgByID(imgId)
    gMeme.selectedImgId = img.id;
}
