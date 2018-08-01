class Player {
  playTurn(warrior) {
    if (this.isFacingEnemy(warrior)) {
      warrior.attack();
    }
    else {
      if (!this.isToughEnough(warrior)) {
        warrior.rest();
      } else {
        warrior.walk();
      }
    }
  }

  isFacingEnemy(warrior) {
    return !warrior.feel().isEmpty();
  }

  isToughEnough(warrior) {
    return warrior.health() > 6;
  }
}

