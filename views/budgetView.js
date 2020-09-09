import { elements } from "./base.js";

export const displayTotalInc = (totalInc) => {
  elements.incomeLabel.innerText = "+ " + totalInc;
};

export const displayTotalExp = (totalExp) => {
  elements.expensesLabel.innerText = "- " + totalExp;
};

export const displayBudget = (budget) => {
  const budgetElement = elements.budgetLabel;
  if (budget === 0) {
    budgetElement.innerText = "0";
  } else if (budget > 0) {
    budgetElement.innerText = "+ " + budget;
  } else {
    budgetElement.innerText = "" + budget;
  }
};

export const displayDate = (date) => {
  elements.dateLabel.innerText = date;
};

export const displayTotalPercentage = (percentage) => {
  elements.percentageLabel.innerText = isNaN(percentage)
    ? "0%"
    : "-" + percentage + "%";
};
