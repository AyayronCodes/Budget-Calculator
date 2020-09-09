// BUDGET CONTROLLER
var budgetController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  var calculatePercentage = function (value) {
    return Math.round((value / data.totals.inc) * 10000) / 100;
  };

  return {
    addItem: function (type, description, value) {
      // create id
      var id, newItem;

      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      if (type === "exp") {
        newItem = new Expense(id, description, value);
      } else {
        newItem = new Income(id, description, value);
      }

      data.allItems[type].push(newItem);

      return newItem;
    },

    deleteItem: function (type, id) {
      var index = data.allItems[type].findIndex((el) => el.id === parseInt(id));
      return data.allItems[type].splice(index, 1);
    },

    calculateBudget: function () {
      data.totals.exp = data.allItems.exp
        .map((el) => el.value)
        .reduce((prev, cur) => {
          return prev + cur;
        }, 0);

      data.totals.inc = data.allItems.inc
        .map((el) => el.value)
        .reduce((prev, cur) => {
          return prev + cur;
        }, 0);

      data.budget = data.totals.inc - data.totals.exp;
    },

    getBudget: function () {
      return {
        budget: data.budget,
        incTotal: data.totals.inc,
        expTotal: data.totals.exp,
      };
    },

    getPercentages: function () {
      data.percentage = data.allItems.exp.map((el) => {
        return calculatePercentage(el.value);
      });

      return {
        totalPercentage: calculatePercentage(data.totals.exp),
        percentages: data.percentage,
      };
    },

    showData: function () {
      console.log(data);
    },
  };
})();

// UI CONTROLLER
var UIController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPercLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };

  var formatNumber = function (number, type) {
    var [num, dec] = number.toString().split(".");
    if (dec === undefined) {
      dec = "00";
    }
    return type === "exp" ? "- " + num + "." + dec : "+ " + num + "." + dec;
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    addListItem: function (obj, type) {
      var html, newHtml, element;
      if (type === "exp") {
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%percentage%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        element = DOMstrings.expensesContainer;
      } else if (type === "inc") {
        html =
          '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        element = DOMstrings.incomeContainer;
      }

      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    deleteListItem: function (id) {
      var element = document.getElementById(id);
      element.parentNode.removeChild(element);
    },

    displayBudget: function (data) {
      document.querySelector(DOMstrings.budgetLabel).innerText =
        data.budget > 0 ? formatNumber(data.budget, "inc") : 0;
      document.querySelector(DOMstrings.incomeLabel).innerText =
        data.incTotal > 0 ? formatNumber(data.incTotal, "inc") : 0;
      document.querySelector(DOMstrings.expensesLabel).innerText =
        data.expTotal > 0 ? formatNumber(data.expTotal, "exp") : 0;
    },

    displayPercentages: function (percentagesData) {
      var expensesArray = Array.from(
        document.querySelectorAll(DOMstrings.expensesPercLabel)
      );
      expensesArray.forEach((el, index) => {
        el.innerText =
          formatNumber(percentagesData.percentages[index], "exp") + "%";
      });

      document.querySelector(DOMstrings.percentageLabel).innerText =
        formatNumber(percentagesData.totalPercentage, "exp") + "%";
    },

    clearFields: function () {
      var fields, fieldsArr;

      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach((el) => (el.value = ""));

      fieldsArr[0].focus();
    },

    displayMonth: function () {
      var months = [
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
      document.querySelector(DOMstrings.dateLabel).innerText =
        months[new Date().getMonth()] + ", " + new Date().getFullYear();
    },

    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
  var setUpEventListeners = function () {
    // get DOMstrings
    const DOM = UICtrl.getDOMstrings();
    // if btn clicked or enter pressed
    document.querySelector(DOM.inputBtn).addEventListener("click", () => {
      ctrlAddItem();
    });
    window.addEventListener("keypress", (e) => {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);
  };

  var ctrlAddItem = function () {
    // 1. Get the field input data
    var input = UICtrl.getInput();

    if (input.description.length > 0 && input.value > 0) {
      // 2. Add the item to the budget controller
      var newItem = budgetCtrl.addItem(
        input.type,
        input.description,
        input.value
      );
      // 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);
      // 4. Clear the fields
      UICtrl.clearFields();
      // 5. Calculate and update budget
      budgetCtrl.calculateBudget();
      var budget = budgetCtrl.getBudget();
      UICtrl.displayBudget(budget);
      // 6. Calculate and update percentages
      var percentagesData = budgetCtrl.getPercentages();
      // UICtrl.displayPercentages();
      UICtrl.displayPercentages(percentagesData);
    } else {
      alert("Something went wrong... Please enter info again");
      UICtrl.clearFields();
    }
  };

  var ctrlDeleteItem = function (event) {
    // get type and id
    var fullId = event.target.parentNode.parentNode.parentNode.parentNode.id;
    var [type, id] = fullId.split("-");
    if (type && id) {
      // delete from budget data
      var deletedItem = budgetCtrl.deleteItem(type, id);
      // redo totals data, budget data, percentages data
      budgetCtrl.calculateBudget();
      var budgetData = budgetCtrl.getBudget();
      var percentagesData = budgetCtrl.getPercentages();
      // remove element from bottom part
      UICtrl.deleteListItem(fullId);
      // show updated budget, totals, percentage data
      UICtrl.displayBudget(budgetData);
      UICtrl.displayPercentages(percentagesData);
    }
  };

  //
  return {
    init: function () {
      console.log("Application has started.");
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
      UICtrl.displayPercentages({
        totalPercentage: 0,
        percentages: 0,
      });
      setUpEventListeners();
    },
  };
})(budgetController, UIController);

controller.init();
