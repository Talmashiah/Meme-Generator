'use strict'



let gId = 1;
let gImgs;

let gMeme = {
    selectedImgId: 1,
    selectedTxtIdx: 0,
    txts: [
        {
            line: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
};

function loadData(){
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
} 

function createimg(url, keywords) {
    return {
        id: gId++,
        url,
        keywords,
    }
}

function setgMemeTxt(value) {
    gMeme.txts[gMeme.selectedTxtIdx].line = value;
}

function getgMemeTxt() {
    return gMeme.txts[gMeme.selectedTxtIdx].line;
}

function setgMemeId(elImg) {
    let imgId = +elImg.dataset.id;
    let img = getImgByID(imgId)
    gMeme.selectedImgId = img.id;
}

function getgMeme () {
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

