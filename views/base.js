export const elements = {
  inputType: document.querySelector(".add__type"),
  inputDescription: document.querySelector(".add__description"),
  inputValue: document.querySelector(".add__value"),
  inputBtn: document.querySelector(".add__btn"),
  incomeContainer: document.querySelector(".income__list"),
  expensesContainer: document.querySelector(".expenses__list"),
  budgetLabel: document.querySelector(".budget__value"),
  incomeLabel: document.querySelector(".budget__income--value"),
  expensesLabel: document.querySelector(".budget__expenses--value"),
  percentageLabel: document.querySelector(".budget__expenses--percentage"),
  container: document.querySelector(".container"),
  expensesPercLabel: document.querySelector(".item__percentage"),
  dateLabel: document.querySelector(".budget__title--month"),
};

// method to adjust value to a number with two decimal places, returns string
export const adjustValue = (value) => {
  return Number(value.toFixed(2));
};
