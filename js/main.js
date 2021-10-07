const initApp = () => {
  const currentValueElem = document.querySelector(".currentvalue");
  const previousValueElem = document.querySelector(".previousvalue");
  let itemArray = [];
  const equationArray = [];
  let newNumberFlag = false;

  const inputButtons = document.querySelectorAll(".number");
  inputButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const newInput = event.target.textContent;
      if (newNumberFlag) {
        currentValueElem.value = newInput;
        newNumberFlag = false;
      } else {
        currentValueElem.value =
          currentValueElem.value == 0
            ? newInput
            : `${currentValueElem.value}${newInput}`;
      }
    });
  });

  const operatorButtons = document.querySelectorAll(".operator");
  operatorButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (newNumberFlag) {
        previousValueElem.textContent = "";
        itemArray = [];
      }

      const newOperator = event.target.textContent;
      const currentVal = currentValueElem.value;

      if (!itemArray.length && currentVal == 0) return;

      if (!itemArray.length) {
        itemArray.push(currentVal, newOperator);
        previousValueElem.textContent = `${currentVal} 
             ${newOperator}`;
        return (newNumberFlag = true);
      }

      if (itemArray.length) {
        itemArray.push(currentVal);

        const equationObject = {
          num1: parseFloat(itemArray[0]),
          num2: parseFloat(currentVal),
          op: itemArray[1],
        };

        equationArray.push(equationObject);
        const equationString = `${equationObject["num1"]} ${equationObject["op"]} ${equationObject["num2"]}`;

        const newValue = calculate(equationString, currentValueElem);

        previousValueElem.textContent = `${newValue} ${newOperator}`;

        itemArray = [newValue, newOperator];
        newNumberFlag = true;
        console.log(equationArray);
      }
    });
  });

  const equalsButton = document.querySelector(".equals");
  equalsButton.addEventListener("click", () => {
    const currentVal = currentValueElem.value;
    let equationObject;

    if (!itemArray.length && equationArray.length) {
      const lastEquation = equationArray[equationArray.length - 1];
      equationObject = {
        num1: parseFloat(currentVal),
        num2: lastEquation.num2,
        op: lastEquation.op,
      };
    } else if (!itemArray) {
      return currentVal;
    } else {
      itemArray.push(currentVal);
      equationObject = {
        num1: parseFloat(itemArray[0]),
        num2: parseFloat(currentVal),
        op: itemArray[1],
      };
    }

    equationArray.push(equationObject);
    const equationString = `${equationObject["num1"]} ${equationObject["op"]} ${equationObject["num2"]}`;

    calculate(equationString, currentValueElem);

    previousValueElem.textContent = `${equationString} =`;

    newNumberFlag = true;
    itemArray = [];
    console.log(equationArray);
  });

  const clearButtons = document.querySelectorAll(".clear, .clearEntry");
  clearButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      currentValueElem.value = 0;
      if (event.target.classList.contains("clear")) {
        previousValueElem.textContent = "";
        itemArray = [];
      }
    });
  });

  const deleteButton = document.querySelector(".delete");
  deleteButton.addEventListener("click", () => {
    currentValueElem.value = currentValueElem.value.slice(0, -1);
  });

  const signChangeButton = document.querySelector(".signChange");
  signChangeButton.addEventListener("click", () => {
    currentValueElem.value = parseFloat(currentValueElem.value) * -1;
  });

  const button1 = document.querySelector(".theme1");
  button1.addEventListener("click", (event) => {
    let main1 = document.getElementById("themes");

    main1.style.backgroundColor = "#FF7F7F";

    let mainA = document.getElementById("body");
    mainA.style.background = "linear-gradient(#e66465, #9198e5)";

    console.log(document);
  });

  const button2 = document.querySelector(".theme2");
  button2.addEventListener("click", (event) => {
    let main2 = document.getElementById("themes");

    main2.style.backgroundColor = "aqua";

    let mainB = document.getElementById("body");
    mainB.style.background =
      "linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)";
  });
};

document.addEventListener("DOMContentLoaded", initApp);

const calculate = (equation, currentValueElem) => {
  const regex = /(^[*/=])|(\s)/g;
  equation.replace(regex, "");
  const divByZero = /(\/0)/.test(equation);
  if (divByZero) return (currentValueElem.value = 0);
  return (currentValueElem.value = eval(equation));
};
