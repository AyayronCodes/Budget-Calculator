export default class Input {
  constructor(type, description, value) {
    this.type = type;
    this.description = description;
    this.value = value;
  }

  // method to check if description and value are properly inputted
  checkIfProper() {
    return this.description.length > 0 && this.value > 0;
  }
}
