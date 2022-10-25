const newgame = document.querySelector('.newgame');
const difficulty = document.querySelector('#difficulty');
const map_container = document.querySelector('.map-container');
let bombs = [];
let bombcountgenerate = 0;
let tiles = [];
let random = 0;
let random2 = 0;
let died = false;
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
                    element.innerHTML = "&#128163;";
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
            //optimalizálási ötlet: dupla for looppal helyettesíteni a sok if-et
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
    e.target.classList.add('taken');
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

function revealTile(i, j) {
    if (tiles[i][j].classList.contains('emptytaken')) return;
    tiles[i][j].classList.add('taken');
    if (tiles[i][j].classList.length > 2) return;
    tiles[i][j].classList.add('emptytaken');
    //ide is jöhetne valami jobb, de ez van
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

function addFlag(e) {
 alert('fasz');
}
newgame.addEventListener('click', generateMap);
difficulty.addEventListener('change', generateMap);
generateMap();