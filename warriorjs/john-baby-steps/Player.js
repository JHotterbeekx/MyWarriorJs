class Player {

  constructor() {
    this.hasTracedBack = false;
    this.hasHitWall = false;
    this.isFacingFoward = true;
    this.healingUp = false;
    this.vision = [];
  }

  playTurn(warrior) {
    this.setWarrior(warrior);

    if (this.faceTheCorrectStartingPosition()) return;
    this.lookAround();
    
    for(let i = 0; i < this.vision.length; i++) {
      if (this.handleVision(i, this.vision[i])) return;
    }

    this.warrior.walk(); // Nothing to do, just walk
    this.updateHealth();
  }

  setWarrior(warrior) {
    this.warrior = warrior;
  }

  faceTheCorrectStartingPosition() {
    if (!this.hasTracedBack && this.isFacingFoward) {
      if (this.warrior.feel('backward').isWall()) {
        this.hasTracedBack = true;
        this.hasHitWall = true;
        return false;
      }
      this.turnAround();
      this.hasTracedBack = true;
      return true;
    }
  }

  lookAround() {
    this.vision = this.warrior.look();
  }

  handleVision(index, vision) {
    if (vision.isUnit()) {
      const unit = vision.getUnit();
      if (unit.isBound()) {
        if (index > 0) {
          this.warrior.walk();
          return true;
        }
        this.warrior.rescue();
        return true;
      }

      this.warrior.shoot();
      return true;
    }
    if (vision.isStairs()) {
      if (!this.hasHitWall) {
        this.turnAround();
        return true;
      }
      this.warrior.walk();
      return true;
    }
    if (vision.isEmpty()) return false; // Stairs count as empty as well
    if (vision.isWall()) {
      this.turnAround();
      this.hasHitWall = true;
      return true;
    }
  }

  updateHealth() {
    this.health = this.warrior.health();
  }

  turnAround() {
    this.isFacingFoward = !this.isFacingFoward;
    this.warrior.pivot();
  }
}


