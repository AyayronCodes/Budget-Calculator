import { elements } from "./base.js";

export const getInput = () => {
  return {
    type: elements.inputType.value,
    description: elements.inputDescription.value,
    value: elements.inputValue.value,
  };
};

export const clearFields = () => {
  elements.inputDescription.value = "";
  elements.inputValue.value = "";

  elements.inputDescription.focus();
};
