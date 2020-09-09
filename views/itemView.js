import { elements } from "./base.js";

export const displayItem = (obj) => {
  let html, container;
  if (obj.type === "inc") {
    html =
      '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    container = elements.incomeContainer;
  } else {
    html =
      '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">-%percentage%%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    container = elements.expensesContainer;
  }

  let newHtml = html.replace("%id%", obj.id);
  newHtml = newHtml.replace("%description%", obj.description);
  newHtml = newHtml.replace("%value%", obj.value);
  newHtml = newHtml.includes("%percentage%")
    ? newHtml.replace("%percentage%", obj.percentage)
    : newHtml;
  container.insertAdjacentHTML("beforeend", newHtml);
};

export const removeItem = (id) => {
  const element = document.getElementById(id);
  element.parentNode.removeChild(element);
};

export const updateUIIds = (type) => {
  if (type === "inc") {
    Array.from(elements.incomeContainer.children).forEach(function (el, index) {
      elements.incomeContainer.children[index].id = type + "-" + index;
    });
  } else {
    Array.from(elements.expensesContainer.children).forEach(function (
      el,
      index
    ) {
      elements.expensesContainer.children[index].id = type + "-" + index;
    });
  }
};
