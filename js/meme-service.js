'use strict'

let gId = 1;
let gImgs;

let gMeme = {
    selectedImgId: 1,
    selectedTxtIdx: 0,
    txts: [
        {
            line: 'Add text here',
            size: 50,
            locationY: 50,
            locationX: 250,
            align: 'left',
            color: 'white'
        },
        {
            line: 'Add text here',
            size: 50,
            locationY: 490,
            locationX: 250,
            align: 'left',
            color: 'white'
        }
    ]
};

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

function deleteLine() {
    gMeme.txts.splice(gMeme.selectedTxtIdx, 1);
}

function addLine() {
    gMeme.txts.push({
        line: 'Add text here',
        size: 50,
        locationY: 250,
        locationX: 250,
        align: 'left',
        color: 'white'
    })
}

function setgMemeTxt(value) {
    gMeme.txts[gMeme.selectedTxtIdx].line = value;
}


function setgMemeId(elImg) {
    let imgId = +elImg.dataset.id;
    let img = getImgByID(imgId)
    gMeme.selectedImgId = img.id;
}

function getgMeme() {
    return gMeme;
}

function getImgsToRender() {
    return gImgs;
}

function getImgUrl() {
    let img = getImgByID(gMeme.selectedImgId);
    return img
}


function getImgByID(Id) {
    return gImgs.find(function (img) {
        return img.id === Id;
    })
}

function increaseLineLocation() {
    gMeme.txts[gMeme.selectedTxtIdx].locationY--
}

function decreaseLineLocation() {
    gMeme.txts[gMeme.selectedTxtIdx].locationY++
}

function increaseFontSize() {
    gMeme.txts[gMeme.selectedTxtIdx].size++
}

function decreaseFontSize() {
    gMeme.txts[gMeme.selectedTxtIdx].size--
}

function switchLine() {
    if (gMeme.selectedTxtIdx < gMeme.txts.length - 1) {
        gMeme.selectedTxtIdx++
    } else {
        gMeme.selectedTxtIdx = 0;
    }
}


function setTxtColor(value) {
    gMeme.txts[gMeme.selectedTxtIdx].color = value;
}