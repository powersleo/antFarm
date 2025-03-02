import { GRID_SIZE, TILE_WIDTH, TILE_HEIGHT, MAX_HEIGHT } from './constants.js';
import { UnitManager } from './unit.js';
import { InputHandler } from './input.js';

let tile_images = [];
let x_start = 0;
let y_start = 0;
let unitManager;
let inputHandler;
let grid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

window.setup = function() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i <= 34; i++) {
        tile_images.push(loadImage("./tiles/tile-" + i + ".png"));
    }
    unitManager = new UnitManager();
    inputHandler = new InputHandler(unitManager);
}

window.draw = function() {
    background("black");
    draw_grid();
    
    unitManager.update();
    unitManager.draw(window);
    inputHandler.drawSelectionBox(window);
}

window.mousePressed = function() {
    inputHandler.mousePressed(window);
}

window.mouseDragged = function() {
    inputHandler.mouseDragged();
}

window.mouseReleased = function() {
    inputHandler.mouseReleased(window);
}

function draw_grid() {
    x_start = width/2 - TILE_WIDTH/2;
    y_start = 50;
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            draw_tile((tile_images[grid[j][i]]), i, j);
        }
    }
}

function draw_tile(img, x, y) {
    let x_screen = x_start + (x - y) * TILE_WIDTH/2;
    let y_screen = y_start + (x + y) * TILE_HEIGHT/2;
    let z_offset = MAX_HEIGHT - img.height;
    image(img, x_screen, y_screen + z_offset);
} 