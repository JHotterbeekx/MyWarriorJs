class Player {
  playTurn(warrior) {
    // Cool code goes here.
    if (!warrior.feel().isEmpty()) warrior.attack();
    else warrior.walk();
  }
}
