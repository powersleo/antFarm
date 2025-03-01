export class Unit {
    constructor(screenX, screenY, speed = 5) {
        this.screenX = screenX;
        this.screenY = screenY;
        this.targetScreenX = screenX;
        this.targetScreenY = screenY;
        this.speed = speed;
    }

    update() {
        if (this.screenX !== this.targetScreenX || this.screenY !== this.targetScreenY) {
            let dx = this.targetScreenX - this.screenX;
            let dy = this.targetScreenY - this.screenY;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.speed) {
                this.screenX = this.targetScreenX;
                this.screenY = this.targetScreenY;
            } else {
                this.screenX += (dx / distance) * this.speed;
                this.screenY += (dy / distance) * this.speed;
            }
        }
    }

    draw(p5, isSelected) {
        if (isSelected) {
            p5.stroke(255);
            p5.strokeWeight(2);
        } else {
            p5.noStroke();
        }
        
        p5.fill(255, 0, 0);
        p5.circle(this.screenX, this.screenY, 20);
    }
}

export class UnitManager {
    constructor() {
        this.units = [
            new Unit(400, 200),
            new Unit(300, 300),
            new Unit(500, 300)
        ];
        this.selectedUnits = new Set();
    }

    update() {
        this.units.forEach(unit => unit.update());
    }

    draw(p5) {
        this.units.forEach((unit, index) => {
            unit.draw(p5, this.selectedUnits.has(index));
        });
    }
} 