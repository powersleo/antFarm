export const GRID_SIZE = 10;
export const TILE_WIDTH = 100;
export const TILE_HEIGHT = 50;
export const MAX_HEIGHT = 80;

// Add these utility functions for coordinate conversion
export function screenToGrid(screenX, screenY, x_start, y_start) {
    // Convert screen coordinates to grid coordinates
    let relX = screenX - x_start;
    let relY = screenY - y_start;
    
    // Inverse isometric transformation
    let gridX = Math.floor((relX / (TILE_WIDTH/2) + relY / (TILE_HEIGHT/2)) / 2);
    let gridY = Math.floor((relY / (TILE_HEIGHT/2) - relX / (TILE_WIDTH/2)) / 2);
    
    return { x: gridX, y: gridY };
}

export function gridToScreen(gridX, gridY, x_start, y_start) {
    // Convert grid coordinates to screen coordinates
    let screenX = x_start + (gridX - gridY) * (TILE_WIDTH/2);
    let screenY = y_start + (gridX + gridY) * (TILE_HEIGHT/2);
    
    return { x: screenX, y: screenY };
} 