class Player {

  constructor() {
    this.hasTracedBack = false;
    this.isFacingFoward = true;
    this.healingUp = false;
  }

  playTurn(warrior) {
    this.setWarrior(warrior);

    if (!this.hasTracedBack && this.isFacingFoward) {
      this.turnAround();
      return;
    }

    if (this.isSomethingThere()) {
      warrior.think('These is somethere here!');
      this.handleFeeling(warrior.feel(this.getDirection()));
    }
    else {
      if(this.isTakingDamage()) {
        warrior.think('There is an archer!');
        if (!this.isToughEnough()) {
          this.fallBack();
        } else {
          warrior.walk(this.getDirection());
        }
      } else {
        if (!this.isToughEnough()) {
          warrior.think('I\'m feeling a bit weak...');
          this.rest();
        } else {
          warrior.think('Taking a walk on the wild side...');
          warrior.walk(this.getDirection());
        }
      }
    }
    this.updateHealth();
  }

  setWarrior(warrior) {
    this.warrior = warrior;
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


