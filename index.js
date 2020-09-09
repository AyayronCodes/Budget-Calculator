import Input from "./models/Input.js";
import Item from "./models/Item.js";
import Budget from "./models/Budget.js";
import * as inputView from "./views/inputView.js";
import * as itemView from "./views/itemView.js";
import * as budgetView from "./views/budgetView.js";
import { elements, adjustValue } from "./views/base.js";

// place to keep all current data
const data = {
  input: null,
  inc: [],
  exp: [],
  totalInc: 0,
  totalExp: 0,
  budget: 0,
};

// way to keep checking data object
// DELETE WHEN DONEEE
window.currentData = data;

/**
 * INPUT CONTROLLER
 */
const inputController = function () {
  // run if check button clicked or enter pressed
  // get input values
  const userInput = inputView.getInput();
  // create new Input object and store the values
  const newInput = new Input(
    userInput.type,
    userInput.description,
    adjustValue(parseFloat(userInput.value))
  );

  // carry on only if proper inputs given
  if (newInput.checkIfProper()) {
    // save the input in data
    data.input = newInput;
    // clear/refresh input fields
    inputView.clearFields();
  } else {
    // empty out input in data
    data.input = null;
    // clear/refresh input fields
    inputView.clearFields();
    // alert user to reenter proper inputs
    alert("Please enter info again...");
  }
};

/**
 * ITEM CONTROLLER
 */
const itemController = (event) => {
  // helper function that updates id's when an element gets deleted
  const updateIds = (arr) => {
    arr.forEach(function (el, index) {
      arr[index].id = index;
    });
  };

  // check if there was a proper input
  if (
    !event.target.classList.contains("item__delete--btn") &&
    data.input !== null
  ) {
    // get input obj
    const inputObj = data.input;
    // generate appropriate id
    const id = data[inputObj.type].length;
    // create a new item obj and store values
    const newItem = new Item(
      id,
      inputObj.type,
      inputObj.description,
      inputObj.value
    );
    // add percentage property if newItem is an expense
    newItem.type === "exp" ? newItem.addPercentage(data.totalInc) : false;
    // push into appropriate array
    data[inputObj.type].push(newItem);
    // display new item object
    itemView.displayItem(newItem);
  } else {
    // get properties of the clicked item by accessing the id
    const id = event.target.parentNode.parentNode.parentNode.id.toString();
    let [delType, delId] = id.split("-");
    delId = Number(delId);
    // delete item with matching id from data
    data[delType].splice(delId, 1);
    // delete item from UI
    itemView.removeItem(id);
    // update ID's of the impacted array
    updateIds(data[delType]);
    // update ID's of UI elements
    itemView.updateUIIds(delType);
  }
};

/**
 * BUDGET CONTROLLER
 */
const budgetController = () => {
  // helper function that adds up all values in array
  const addUpElements = (arr) => {
    return arr.reduce((acc, cur) => acc + cur, 0);
  };

  // calc new budget's properties
  const incSum = addUpElements(data.inc.map((el) => el.value));
  const expSum = addUpElements(data.exp.map((el) => el.value));
  const budget = incSum - expSum;
  // save in data
  data.totalInc = incSum;
  data.totalExp = expSum;
  data.budget = budget;
  // create new budget object
  const newBudget = new Budget(incSum, expSum, budget);
  // add & get date property from budget object
  const date = newBudget.getDate();
  // add & get total expense percentage
  const totalPercentage = newBudget.getTotalPercentage();

  // display new budget infos
  budgetView.displayTotalInc(newBudget.incTotal);
  budgetView.displayTotalExp(newBudget.expTotal);
  budgetView.displayBudget(newBudget.budget);
  budgetView.displayDate(date);
  budgetView.displayTotalPercentage(totalPercentage);
};

/**
 * EVENT LISTENERS
 */
// add a click event listener to check button and enter keyboard key
elements.inputBtn.addEventListener("click", () => {
  inputController();
  itemController();
  budgetController();
});

window.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    inputController();
    itemController(event);
    budgetController();
  }
});

elements.container.addEventListener("click", (event) => {
  if (event.target.classList.contains("item__delete--btn")) {
    itemController(event);
    budgetController();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  data.totalInc = 0;
  data.totalExp = 0;
  data.budget = 0;
  budgetController();
});
