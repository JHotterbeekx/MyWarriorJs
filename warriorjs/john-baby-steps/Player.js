class Player {

  playTurn(warrior) {
    this.setWarrior(warrior);

    if (this.isSomethingThere()) {
      warrior.think('These is somethere here!');
      this.handleUnit(warrior.feel().getUnit());
    }
    else {
      if(this.isTakingDamage()) {
        warrior.think('There is an archer, have to take him out!');
        warrior.walk();
      } else {
        if (!this.isToughEnough()) {
          warrior.think('I\'m feeling a bit weak...');
          warrior.rest();
        } else {
          warrior.think('Taking a walk on the wild side...');
          warrior.walk();
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
    return !this.warrior.feel().isEmpty();
  }

  isToughEnough() {
    return this.warrior.health() > 12;
  }

  isTakingDamage() {
    return this.health > this.warrior.health();
  }

  handleUnit(unit) {
    if (unit.isBound()) {
      this.warrior.think("To the rescue!");
      this.warrior.rescue();
    }  else  {
      this.warrior.think("You shall be destroyed!");
      this.warrior.attack();
    }
  }

  isToughEnoughToRunAndFaceArcher() {
    return this.warrior.health() > 9;
  }
}


