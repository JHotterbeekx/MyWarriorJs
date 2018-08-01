class Player {

  constructor() {
    this.direction = 'backward';
    this.healingUp = false;
  }

  playTurn(warrior) {
    this.setWarrior(warrior);

    if (this.isSomethingThere()) {
      warrior.think('These is somethere here!');
      this.handleFeeling(warrior.feel(this.direction));
    }
    else {
      if(this.isTakingDamage()) {
        warrior.think('There is an archer!');
        if (!this.isToughEnough()) {
          this.goBack();
        } else {
          warrior.walk(this.direction);
        }
      } else {
        if (!this.isToughEnough()) {
          warrior.think('I\'m feeling a bit weak...');
          this.rest();
        } else {
          warrior.think('Taking a walk on the wild side...');
          warrior.walk(this.direction);
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
    return !this.warrior.feel(this.direction).isEmpty();
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

  goBack() {
    this.warrior.walk('backward');
  }

  handleFeeling(feel) {
    if (feel.isWall())  {
      this.warrior.think("Turn around!");
      this.direction = 'forward';
      this.warrior.walk(this.direction);
    } else {
      const unit = feel.getUnit();
      if (unit.isBound()) {
        this.warrior.think("To the rescue!");
        this.warrior.rescue(this.direction);
      }  else {
        this.warrior.think("I will take you out!")
        this.warrior.attack(this.direction);
      }
    }
  }

  isToughEnoughToRunAndFaceArcher() {
    return this.warrior.health() > 9;
  }
}


