'use strict'

let gMeme;
let gId = 1;
let gImgs;
let initialFontSize = 50;
let initialTxt = 'Add text here';
let initialAlign = 'center';
let initialColor = 'white';
let initialFontFamily = 'impact';
let gKeywords;
let gFilterdImgs;

initgMeme();

function getMemeData() {
    return {
        selectedImgId: 1,
        selectedTxtIdx: 0,
        txts: [
            createTxtObj(250, 60),
            createTxtObj(250, 480)
        ]
    }
}

function createTxtObj(locationX, locationY) {
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
    setgKeywords();
}

function createImgs() {
    gImgs = [];
    gImgs.push(createImg('imgs/1.jpg', ['movie', 'serious']));
    gImgs.push(createImg('imgs/2.jpg', ['movie', 'funny', 'happy']));
    gImgs.push(createImg('imgs/3.jpg', ['mad', 'politics']));
    gImgs.push(createImg('imgs/4.jpg', ['animals', 'cute']));
    gImgs.push(createImg('imgs/5.jpg', ['cute']));
    gImgs.push(createImg('imgs/6.jpg', ['serious', 'success']));
    gImgs.push(createImg('imgs/7.jpg', ['animals', 'sleep']));
    gImgs.push(createImg('imgs/8.jpg', ['sarcasm', 'funny']));
    gImgs.push(createImg('imgs/9.jpg', ['evil', 'funny']));
    gImgs.push(createImg('imgs/10.jpg', ['funny', 'derious']));
    gImgs.push(createImg('imgs/11.jpg', ['stoned','funny']));
    gImgs.push(createImg('imgs/12.jpg', ['funny','happy']));
    gImgs.push(createImg('imgs/13.jpg', ['happy','funny']));
    gImgs.push(createImg('imgs/14.jpg', ['gay']));
    gImgs.push(createImg('imgs/15.jpg', ['serious']));
    gImgs.push(createImg('imgs/16.jpg', ['funny']));
    gImgs.push(createImg('imgs/17.jpg', ['politics', 'serious']));
    gImgs.push(createImg('imgs/18.jpg', ['movie', 'happy', 'sad']));
    gImgs.push(createImg('imgs/19.jpg', ['gay', 'happy', 'funny']));
    gImgs.push(createImg('imgs/20.jpg', ['gay', 'animals', 'cute']));
    gImgs.push(createImg('imgs/21.jpg', ['gay', 'serious', 'sad','funny']));
}

function createImg(url, keywords) {
    return {
        id: gId++,
        url,
        keywords,
    }
}

function initgMeme() {
    gMeme = getMemeData();
}

function filterImgsBySearch(value) {
    gFilterdImgs = [];
    let searchInput = value.toLowerCase();
    gImgs.forEach(img => {
        img.keywords.forEach(keyword => {
            if(keyword.includes(searchInput)){
                gFilterdImgs.push(img);
            }
        });
    });

}


function filterImgsByKeyword(keyword) {
    gFilterdImgs = gImgs.filter(img => img.keywords.includes(keyword));
}

function getFilterImgsToRender() {
    return gFilterdImgs;
}

function getImgsToRender() {
    return gImgs;
}

function concatAllKeywards() {
    var imgsKeywords = [];
    for (var i = 0; i < gImgs.length; i++) {
        imgsKeywords = imgsKeywords.concat(gImgs[i].keywords);
    }
    return imgsKeywords;
}

function setgKeywords(){
    gKeywords = [];
    let keywords = concatAllKeywards();

    for (let i = 0; i < keywords.length; i++) {
        let KeywordObj = gKeywords.find(function (obj) {
            return obj.name === keywords[i];
        });
        if(KeywordObj){
            KeywordObj.count++;
        }
        else{
            gKeywords.push({name:keywords[i],count:1});
        }
    }
    gKeywords.sort((a, b) => (a.count < b.count) ? 1 : -1);
}

function setInitialFontFamily(fontFamily) {
    initialFontFamily = fontFamily;
}

function getInitialFontFamily() {
    return initialFontFamily;
}

function setAlignEnd() {
    let currTxt = gMeme.txts[gMeme.selectedTxtIdx];
    if (currTxt) {
        currTxt.locationX = 485;
        currTxt.align = 'end'
    }
}

function setAlignCenter() {
    let currTxt = gMeme.txts[gMeme.selectedTxtIdx];
    if (currTxt) {
        currTxt.locationX = 250;
        currTxt.align = 'center'
    }
}

function setAlignStart() {
    let currTxt = gMeme.txts[gMeme.selectedTxtIdx];
    if (currTxt) {
        currTxt.locationX = 15;
        currTxt.align = 'start'
    }
}


function deleteLine() {
    gMeme.txts.splice(gMeme.selectedTxtIdx, 1);
}

function addLine() {
    gMeme.txts.push(createTxtObj(250, 250));
    gMeme.selectedTxtIdx = gMeme.txts.length - 1;
}

function getCurrTxtObj() {
    return gMeme.txts[gMeme.selectedTxtIdx];
}

function getgMeme() {
    return gMeme;
}

function getInitialtxt() {
    return initialTxt;
}

function getKeywordsToRender() {
    return gKeywords;
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
        currTxt.locationY -= 5;
    }
}

function decreaseLineLocation() {
    let currTxt = gMeme.txts[gMeme.selectedTxtIdx];
    if (currTxt) {
        currTxt.locationY += 5;
    }
}

function increaseFontSize() {
    let currTxt = gMeme.txts[gMeme.selectedTxtIdx];
    if (currTxt) {
        currTxt.size += 2;
    }
}

function decreaseFontSize() {
    let currTxt = gMeme.txts[gMeme.selectedTxtIdx];
    if (currTxt) {
        currTxt.size -= 2;
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
