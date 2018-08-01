class Player {
  playTurn(warrior) {
    this.setWarrior(warrior);

    if (this.isFacingEnemy()) {
      warrior.think('Die you bastard!');
      warrior.attack();
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

  isFacingEnemy() {
    return !this.warrior.feel().isEmpty();
  }

  isToughEnough() {
    return this.warrior.health() > 12;
  }

  isTakingDamage() {
    return this.health > this.warrior.health();
  }

  isToughEnoughToRunAndFaceArcher() {
    return this.warrior.health() > 9;
  }
}


