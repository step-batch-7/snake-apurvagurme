class Snake {
  #positions;
  #direction;
  #type;
  #previousTail;
  constructor(positions, direction, type) {
    this.#positions = positions.slice();
    this.#direction = direction;
    this.#type = type;
    this.#previousTail = [0, 0];
  }

  get status() {
    const previousTail = this.#previousTail;
    const direction = this.#direction;
    const type = this.#type;
    const positions = this.#positions;
    return { previousTail, positions, type, direction };
  }

  get head() {
    return this.#positions[this.#positions.length - 1];
  }

  get species() {
    return this.#type;
  }

  turnLeft() {
    this.#direction.turnLeft();
  }

  move() {
    const [headX, headY] = this.#positions[this.#positions.length - 1];
    this.#previousTail = this.#positions.shift();
    const [deltaX, deltaY] = this.#direction.delta;
    this.#positions.push([headX + deltaX, headY + deltaY]);
  }

  increaseLength(food) {
    this.#positions.unshift(food);
  }

  hasTouchedWall(verticalLine, horizontalLine) {
    const isLeftWallTouch = this.head[1] < verticalLine[0];
    const isRightWallTouch = this.head[0] >= verticalLine[1];
    const isTopTouch = this.head[0] < horizontalLine[0];
    const isBottomTouch = this.head[1] >= horizontalLine[1];
    return isTopTouch || isLeftWallTouch || isBottomTouch || isRightWallTouch;
  }

  hasTouchedItself() {
    const bodyParts = this.#positions.slice(0, -1);
    let equalPositions = 0;
    bodyParts.forEach(part => {
      if (part[0] == this.head[0] && part[1] == this.head[1]) {
        equalPositions++;
      }
    });
    if (equalPositions > 0) {
      return true;
    }
  }

  tailAndSpecies() {
    let [colId, rowId] = this.#previousTail;
    const cell = getCell(colId, rowId);
    const species = this.species;
    return { cell, species };
  }

  tailAndSpeciesOfGhost() {
    let [colId, rowId] = this.#previousTail;
    const cell1 = getCell(colId, rowId);
    const species1 = this.species;
    return { cell1, species1 };
  }
}
