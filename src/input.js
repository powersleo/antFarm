export class InputHandler {
    constructor(unitManager) {
        this.unitManager = unitManager;
        this.dragStart = null;
        this.isDragging = false;
    }

    mousePressed(p5) {
        this.dragStart = { x: p5.mouseX, y: p5.mouseY };
        this.isDragging = true;
        
        if (!p5.keyIsDown(p5.SHIFT)) {
            this.unitManager.selectedUnits.clear();
        }
    }

    mouseDragged() {
        this.isDragging = true;
    }

    mouseReleased(p5) {
        if (this.isDragging) {
            let x1 = Math.min(this.dragStart.x, p5.mouseX);
            let x2 = Math.max(this.dragStart.x, p5.mouseX);
            let y1 = Math.min(this.dragStart.y, p5.mouseY);
            let y2 = Math.max(this.dragStart.y, p5.mouseY);
            
            if (Math.abs(x1 - x2) < 5 && Math.abs(y1 - y2) < 5) {
                this.handleClick(p5);
            } else {
                this.handleDragSelection(x1, x2, y1, y2);
            }
        }
        
        this.isDragging = false;
        this.dragStart = null;
    }

    handleClick(p5) {
        let clickedUnit = this.unitManager.units.findIndex(unit => {
            let dx = unit.screenX - p5.mouseX;
            let dy = unit.screenY - p5.mouseY;
            return Math.sqrt(dx * dx + dy * dy) < 10;
        });
        
        if (clickedUnit !== -1) {
            this.unitManager.selectedUnits.add(clickedUnit);
        } else if (this.unitManager.selectedUnits.size > 0) {
            let offsetX = 0;
            this.unitManager.selectedUnits.forEach(unitIndex => {
                let unit = this.unitManager.units[unitIndex];
                unit.targetScreenX = p5.mouseX + offsetX;
                unit.targetScreenY = p5.mouseY;
                offsetX += 30;
            });
        }
    }

    handleDragSelection(x1, x2, y1, y2) {
        this.unitManager.units.forEach((unit, index) => {
            if (unit.screenX >= x1 && unit.screenX <= x2 &&
                unit.screenY >= y1 && unit.screenY <= y2) {
                this.unitManager.selectedUnits.add(index);
            }
        });
    }

    drawSelectionBox(p5) {
        if (this.isDragging) {
            p5.noFill();
            p5.stroke(255);
            p5.strokeWeight(1);
            p5.rect(this.dragStart.x, this.dragStart.y, 
                    p5.mouseX - this.dragStart.x, 
                    p5.mouseY - this.dragStart.y);
        }
    }
} 