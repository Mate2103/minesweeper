const newgame = document.querySelector('.newgame');
const difficulty = document.querySelector('#difficulty');
const map_container = document.querySelector('.map-container');
let bombs = [];
let tiles = [,];
let random = 0;
let random2 = 0;

function generateMap(e) {
    bombs = [];
    tiles = [,];
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
    console.log(bombs);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const element = document.createElement('div');
            map_container.appendChild(element);
            element.classList.add('map-element');

            let k = bombs.some(function (item) { return item[0] == i })
            let m = bombs.some(function (item) { return item[1] == j })
            if (k && m) {
                element.classList.add('bomb');
                element.innerHTML = "&#128163;";
            }
            element.addEventListener('click', tileClick);
            tiles[i, j] = element;
        }
    }
    console.log(tiles);
    for (let i = 0; i < 9 * 9; i++) {
        if (i + 9 > 80) {
            if (i - 1 <= 80 - 9) {
                for (let j = 0; j < 3; j++) {

                }
            }
        }
    }
}

function tileClick(e) { e.target.classList.add('taken'); }

function main() {

}

newgame.addEventListener('click', generateMap);
console.log(tiles);
main();