const newgame = document.querySelector('.newgame');
const difficulty = document.querySelector('#difficulty');
const map_container = document.querySelector('.map-container');
const target = document.querySelector('.picktile');
const flag = document.querySelector('.flag');
const flagsremained = document.querySelector('.flags-remained');
let bombs = [];
let bombcountgenerate = 0;
let tiles = [];
let random = 0;
let random2 = 0;
let died = false;
let flagorpick = false; //false - pick, true - flag
let colors = {
    1: 'blue',
    2: 'green',
    3: 'red',
    4: 'dark-blue',
    5: 'dark-red',
    6: 'cyan',
    7: 'black',
    8: 'gray'
};
let takenTiles = 0;
let numberofflags = 0;

//bomba: easy: 1:7 medium: 1:6 hard: 1:5

function generateMap(e) {
    onSelectChange();
    takenTiles = 0;
    died = false;
    bombs = [];
    tiles = [];
    while (map_container.firstChild) {
        map_container.removeChild(map_container.lastChild);
    }
    let coordinates = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            coordinates.push([i, j]);
        }
    }
    for (let i = coordinates.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = coordinates[i];
        coordinates[i] = coordinates[j];
        coordinates[j] = temp;
    }
    for (let i = 0; i < bombcountgenerate; i++) {
        bombs.push(coordinates[i]);
    }
    numberofflags = bombcountgenerate
    flagsremained.innerHTML = numberofflags;
    let k = 0;
    for (let i = 0; i < 9; i++) {
        tiles[i] = [];
        for (let j = 0; j < 9; j++) {
            const element = document.createElement('div');
            map_container.appendChild(element);
            element.classList.add('map-element');

            bombs.forEach(bomb => {
                if (bomb[0] == i && bomb[1] == j) {
                    element.classList.add('bomb');
                    element.innerHTML = '<img src="./imgs/mine.png" alt="mine" class="bomb-image">';
                }
            });
            element.addEventListener('click', tileClick);
            tiles[i][j] = element;
        }
    }
    //kill me
    let bombcount = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            //optimaliz??l??si ??tlet: dupla for looppal helyettes??teni a sok if-et
            bombcount = 0;
            if (!(i - 1 < 0) && !(j - 1 < 0)) if (tiles[i - 1][j - 1].classList.contains('bomb')) bombcount++;
            if (!(i - 1 < 0) && !(j + 1 > 8)) if (tiles[i - 1][j + 1].classList.contains('bomb')) bombcount++;
            if (!(i + 1 > 8) && !(j - 1 < 0)) if (tiles[i + 1][j - 1].classList.contains('bomb')) bombcount++;
            if (!(i + 1 > 8) && !(j + 1 > 8)) if (tiles[i + 1][j + 1].classList.contains('bomb')) bombcount++;

            if (!(j + 1 > 8)) if (tiles[i][j + 1].classList.contains('bomb')) bombcount++;
            if (!(j - 1 < 0)) if (tiles[i][j - 1].classList.contains('bomb')) bombcount++;
            if (!(i + 1 > 8)) if (tiles[i + 1][j].classList.contains('bomb')) bombcount++;
            if (!(i - 1 < 0)) if (tiles[i - 1][j].classList.contains('bomb')) bombcount++;

            if (bombcount > 0 && !(tiles[i][j].classList.contains('bomb'))) {
                tiles[i][j].innerHTML = bombcount;
                tiles[i][j].classList.add(colors[bombcount]);
            }
        }
    }

}

function tileClick(e) {
    if (died) return;
    if (e.target.classList.contains('taken')) return;
    if (flagorpick) {
        if (numberofflags > 0 && !e.target.classList.contains('flagged')) {
            e.target.classList.add('flagged');
            numberofflags--;
            flagsremained.innerHTML = numberofflags;
            return;
        }
        if (e.target.classList.contains('flagged')) {
            e.target.classList.remove('flagged');
            numberofflags++;
            flagsremained.innerHTML = numberofflags;
        }
    } else {
        if ( e.target.classList.contains('flagged')) return;
        e.target.classList.add('taken');
        checkForWin();
        if (e.target.classList.contains('bomb')) {
            e.target.classList.add('taken');
            died = true;
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (tiles[i][j].classList.contains('bomb')) tiles[i][j].classList.add('taken');
                }
            }
        }
        if (e.target.innerHTML.length == 0) {
            let i = tiles.findIndex(arr => arr.includes(e.target));
            let j = tiles[i].indexOf(e.target);
            revealTile(i, j);
        }
    }
}

function revealTile(i, j) {
    if (tiles[i][j].classList.contains('emptytaken') 
        || tiles[i][j].classList.contains('flagged')) return;
    tiles[i][j].classList.add('taken');
    if (tiles[i][j].classList.length > 2) return;
    tiles[i][j].classList.add('emptytaken');
    //ide is j??hetne valami jobb, de ez van egyel??re
    if (!(i - 1 < 0) && !(j - 1 < 0)) revealTile(i - 1, j - 1);
    if (!(i - 1 < 0) && !(j + 1 > 8)) revealTile(i - 1, j + 1);
    if (!(i + 1 > 8) && !(j - 1 < 0)) revealTile(i + 1, j - 1);
    if (!(i + 1 > 8) && !(j + 1 > 8)) revealTile(i + 1, j + 1);

    if (!(j + 1 > 8)) revealTile(i, j + 1);
    if (!(j - 1 < 0)) revealTile(i, j - 1);
    if (!(i + 1 > 8)) revealTile(i + 1, j);
    if (!(i - 1 < 0)) revealTile(i - 1, j);
}

function onSelectChange() {
    switch (difficulty.value) {
        case 'easy':
            bombcountgenerate = 10;
            break;
        case 'medium':
            bombcountgenerate = 12;
            break;
        case 'hard':
            bombcountgenerate = 14;
            break;
    }
}
function flagSelected(e) {
    if (!flagorpick) {
        flagorpick = true;
        flag.classList.toggle('selected-button');
        target.classList.toggle('selected-button');
    }
}
function targetSelected(e) {
    if (flagorpick) {
        flagorpick = false;
        flag.classList.toggle('selected-button');
        target.classList.toggle('selected-button');
    }
}
function checkForWin() {
    let takens = 0;
    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles.length; j++) {
            if (tiles[i][j].classList.contains('taken')) takens++;
        }
    }
    if (9*9-bombcountgenerate == takens) Win();
    console.log(takens);
}
function Win() {
    let win = document.createElement('p');
    win.innerHTML = "You won!";
    win.classList.add('win');
    document.body.appendChild(win);
}

newgame.addEventListener('click', generateMap);
difficulty.addEventListener('change', generateMap);
flag.addEventListener('click', flagSelected);
target.addEventListener('click', targetSelected);

generateMap();