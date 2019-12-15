'use strict'

let gMeme;
let gId = 1;
let gImgs;

const gDefaultValues = {
    fontSize: 50,
    txt: 'Add text here',
    align: 'center',
    color: 'white',
    fontFamily: 'impact',
    locationX: 0,
    firstLocationY: 0,
    lastLocationY: 0,
    middleLocationY: 0
}

let gKeywords;
let gFilterdImgs;

initgMeme();

function setMemeTxtLocation(canvasWidth, canvasHeight) {
    gDefaultValues.locationX = canvasWidth / 2
    gDefaultValues.firstLocationY = 60;
    gDefaultValues.lastLocationY = canvasHeight - 20;
    gDefaultValues.middleLocationY = canvasHeight / 2;
    gMeme.txts.push(createTxtObj(gDefaultValues.locationX, gDefaultValues.firstLocationY));
    gMeme.txts.push(createTxtObj(gDefaultValues.locationX, gDefaultValues.lastLocationY));
}

function getMemeData() {
    return {
        selectedImgId: 1,
        selectedTxtIdx: 0,
        txts: []
    }
}

function createTxtObj(locationX, locationY) {
    return {
        line: gDefaultValues.txt,
        size: gDefaultValues.fontSize,
        locationX,
        locationY,
        align: gDefaultValues.align,
        color: gDefaultValues.color
    };
}


function loadMemeData() {
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
    gImgs.push(createImg('imgs/10.jpg', ['funny', 'serious']));
    gImgs.push(createImg('imgs/11.jpg', ['stoned', 'funny']));
    gImgs.push(createImg('imgs/12.jpg', ['funny', 'happy']));
    gImgs.push(createImg('imgs/13.jpg', ['happy', 'funny']));
    gImgs.push(createImg('imgs/14.jpg', ['gay']));
    gImgs.push(createImg('imgs/15.jpg', ['serious']));
    gImgs.push(createImg('imgs/16.jpg', ['funny']));
    gImgs.push(createImg('imgs/17.jpg', ['politics', 'serious']));
    gImgs.push(createImg('imgs/18.jpg', ['movie', 'happy', 'sad']));
    gImgs.push(createImg('imgs/19.jpg', ['gay', 'happy', 'funny']));
    gImgs.push(createImg('imgs/20.jpg', ['gay', 'animals', 'cute']));
    gImgs.push(createImg('imgs/21.jpg', ['gay', 'serious', 'sad', 'funny']));
    gImgs.push(createImg('imgs/22.jpg', ['happy', 'gay']));
    gImgs.push(createImg('imgs/23.jpg', ['serious', 'cartoon']));
    gImgs.push(createImg('imgs/24.jpg', ['funny', 'cartoon']));
    gImgs.push(createImg('imgs/25.jpg', ['funny']));
    gImgs.push(createImg('imgs/26.jpg', ['evil']));
    gImgs.push(createImg('imgs/27.jpg', ['cartoon', 'suspicious']));
    gImgs.push(createImg('imgs/28.jpg', ['suspicious']));
    gImgs.push(createImg('imgs/29.jpg', ['stoned', 'serious']));
    gImgs.push(createImg('imgs/30.jpg', ['funny']));
    gImgs.push(createImg('imgs/31.jpg', ['gay']));
    gImgs.push(createImg('imgs/32.jpg', ['funny']));
    gImgs.push(createImg('imgs/33.jpg', ['funny']));
    gImgs.push(createImg('imgs/34.jpg', ['cartoon']));
    gImgs.push(createImg('imgs/35.jpg', ['cartoon']));
    gImgs.push(createImg('imgs/36.jpg', ['movie']));
    gImgs.push(createImg('imgs/37.jpg', ['serious']));
    gImgs.push(createImg('imgs/38.jpg', ['funny', 'happy']));
    gImgs.push(createImg('imgs/39.jpg', ['mad', 'serious']));
    gImgs.push(createImg('imgs/40.jpg', ['mad', 'serious', 'funny']));
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
            if (keyword.includes(searchInput)) {
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

function setgKeywords() {
    gKeywords = [];
    let keywords = concatAllKeywards();

    for (let i = 0; i < keywords.length; i++) {
        let KeywordObj = gKeywords.find(function (obj) {
            return obj.name === keywords[i];
        });
        if (KeywordObj) {
            KeywordObj.count++;
        }
        else {
            gKeywords.push({ name: keywords[i], count: 1 });
        }
    }
    gKeywords.sort((a, b) => (a.count < b.count) ? 1 : -1);
}

function setInitialFontFamily(fontFamily) {
    gDefaultValues.fontFamily = fontFamily;
}

function getInitialFontFamily() {
    return gDefaultValues.fontFamily;
}

function setAlignment(alignment, canvasWidth) {
    let currTxt = gMeme.txts[gMeme.selectedTxtIdx];
    switch (alignment) {
        case 'center':
            if (currTxt) {
                currTxt.locationX = canvasWidth / 2;
                currTxt.align = 'center'
            }
            break;

        case 'start':
            if (currTxt) {
                currTxt.locationX = 15;
                currTxt.align = 'start'
            }
            break;
        case 'end':
            if (currTxt) {
                currTxt.locationX = canvasWidth - 15;
                currTxt.align = 'end'
            }
            break;
        default:
            break;
    }
}


function deleteLine() {
    gMeme.txts.splice(gMeme.selectedTxtIdx, 1);
}

function addLine() {
    gMeme.txts.push(createTxtObj(gDefaultValues.locationX, gDefaultValues.middleLocationY));
    gMeme.selectedTxtIdx = gMeme.txts.length - 1;
}

function getCurrTxtObj() {
    return gMeme.txts[gMeme.selectedTxtIdx];
}

function getgMeme() {
    return gMeme;
}

function getInitialtxt() {
    return gDefaultValues.txt;
}

function getKeywordsToRender() {
    let keywords = gKeywords.slice(0, 5);
    return keywords.sort(() => 0.5 - Math.random());
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


function setgMemeId(imgId) {
    let img = getImgByID(imgId)
    gMeme.selectedImgId = img.id;
}
