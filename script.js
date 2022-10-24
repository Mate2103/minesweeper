const newgame = document.querySelector('.newgame');
const difficulty = document.querySelector('#difficulty');
const map_container = document.querySelector('.map-container');
let bombs = [];
let tiles = [];
let random = 0;
let random2 = 0;

function generateMap(e) {
    bombs = [];
    tiles = [];
    while (map_container.firstChild) {
        map_container.removeChild(map_container.lastChild);
    }
    let t = [random, random2];
    for (let i = 0; i < 10; i++) {
        random = Math.floor(8 * Math.random());
        random2 = Math.floor(8 * Math.random());
        t = [random, random2]
        bombs.push(t);
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
    console.log(tiles);
    //kill me
    let bombcount = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            bombcount = 0;
            if (i - 1 < 0) continue;
            if (j - 1 < 0) continue;
            if (i + 1 > 8) continue;
            if (j + 1 > 8) continue;
            if (!(i - 1 < 0 && j - 1 < 0)) if (tiles[i - 1][j - 1].classList.contains('bomb')) bombcount++;
            if (!(j + 1 > 8)) if (tiles[i][j + 1].classList.contains('bomb')) bombcount++;
            if (!(i + 1 > 8 && j + 1 > 8)) if (tiles[i + 1][j + 1].classList.contains('bomb')) bombcount++;
            if (!(i - 1<0 && j + 1 > 8)) if (tiles[i - 1][j + 1].classList.contains('bomb')) bombcount++;
            if (!(i + 1 > 8 && j-1<0)) if (tiles[i + 1][j - 1].classList.contains('bomb')) bombcount++;

           if (!(i+1)) if (tiles[i + 1][j].classList.contains('bomb')) bombcount++;
            if (tiles[i - 1][j].classList.contains('bomb')) bombcount++;

            if (bombcount > 0 && !(tiles[i][j].classList.contains('bomb'))) tiles[i][j].innerHTML = bombcount;
        }
    }

}

function tileClick(e) { e.target.classList.add('taken'); }

function main() {

}

newgame.addEventListener('click', generateMap);
main();