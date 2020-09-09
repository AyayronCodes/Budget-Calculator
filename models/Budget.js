export default class Budget {
  constructor(incTotal, expTotal, budget) {
    this.incTotal = incTotal;
    this.expTotal = expTotal;
    this.budget = budget;
  }

  getDate() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const index = new Date().getMonth();
    const year = new Date().getFullYear();
    this.date = months[index] + ", " + year;
    return this.date;
  }

  // method to add percentage prop to expense item
  getTotalPercentage() {
    this.totalPercentage =
      Math.round((this.expTotal / this.incTotal) * 10000) / 100;
    return this.totalPercentage;
  }
}
