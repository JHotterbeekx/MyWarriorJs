class Player {

  constructor() {
    this.hasTracedBack = false;
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
        return false;
      }
      this.turnAround();
      return true;
    }
  }

  lookAround() {
    this.vision = this.warrior.look();
  }

  handleVision(index, vision) {
    if (vision.isStairs()) {
      this.warrior.walk();
      return true;
    }
    if (vision.isEmpty()) return false; // Stairs count as empty as well
    if (vision.isWall()) {
      this.turnAround();
      return true;
    }
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
  }

  updateHealth() {
    this.health = this.warrior.health();
  }

  isSomethingThere() {
    return !this.warrior.feel(this.getDirection()).isEmpty();
  }

  isToughEnough() {
    if (this.healingUp) {
      if (this.warrior.health() == 20) this.healingUp = false;
      return !this.healingUp;
    }
    return this.warrior.health() >= 10;
  }

  rest() {
    this.warrior.rest();
    this.healingUp = true;
  }

  isTakingDamage() {
    return this.health > this.warrior.health();
  }

  fallBack() {
    this.warrior.walk('backward');
  }

  turnAround() {
    this.isFacingFoward = !this.isFacingFoward;
    this.warrior.pivot();
  }

  handleFeeling(feel) {
    if (feel.isWall())  {
      this.warrior.think("Turn around!");
      this.direction = 'forward';
      this.hasTracedBack = true;
      this.warrior.walk(this.getDirection());
    } else {
      const unit = feel.getUnit();
      if (unit.isBound()) {
        this.warrior.think("To the rescue!");
        this.warrior.rescue(this.getDirection());
      }  else {
        this.warrior.think("I will take you out!")
        this.warrior.attack(this.getDirection());
      }
    }
  }

  isToughEnoughToRunAndFaceArcher() {
    return this.warrior.health() > 9;
  }

  getDirection() {
    return 'forward';
  }
}


