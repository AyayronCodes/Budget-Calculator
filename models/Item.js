export default class Item {
  constructor(id, type, description, value) {
    this.id = id;
    this.type = type;
    this.description = description;
    this.value = value;
  }

  // method to add percentage prop to expense item
  addPercentage(totalInc) {
    this.percentage = Math.round((this.value / totalInc) * 10000) / 100;
  }
}
