const newgame = document.querySelector('.newgame');
const difficulty = document.querySelector('#difficulty');
const map_container = document.querySelector('.map-container');

function generateMap(e) {
    while (map_container.firstChild) {
        map_container.removeChild(map_container.lastChild);
    }
    let bombs = [];
    for (let i = 0; i < 10; i++) {
        let random = 0
        while (bombs.contains(random)) {
           random = Math.floor(81 * Math.random());
        }
        bombs.add(random);
    }
    console.log(random);
    for (let i = 0; i < 81; i++) {
        const element = document.createElement('div');
        if (i == random) element.classList.add('bomb');
        element.classList.add('map-element');

        map_container.appendChild(element);
    }
}

function main() {

}

newgame.addEventListener('click', generateMap);
main();