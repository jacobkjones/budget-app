// Budget Controller
let budgetController = (function() {
  const captureUserInput = (id, description, value) => {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let calculateTotal = type => {
    //let sum = 0;
    //data.allItems[type].forEach(cur => sum += cur.value);
    //data.totals[type] = sum;
    data.totals[type] = data.allItems[type].reduce(
      (accumulator, current) => accumulator + current
    );
  };

  let data = {
    items: [
      { type: "exp", description: "party", value: 7 },
      { type: "inc", description: "beer", value: 6 }
    ],
    inc: {},
    budget: 0,
    percentage: -1
  };

  data.items //[{ type: "exp", description: "party",  value: 7 }, { type: "inc", description: "beer", value: 6}]
    .filter(item => item.type === "exp") //[{ type: "exp", description: "party",  value: 7 }]
    .map(item => item.value) // [7]
    .reduce((a, c) => a + c); // 7

  [].find(item => item.this.that.id === 764);

  let data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  function addItem(type, des, val) {
    let newItem, ID;

    //ID = Last ID + 1
    //create new ID
    if (data.allItems[type].length > 0) {
      ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
    } else {
      ID = 0;
    }

    //create new item based on type inc or exp
    if (type === "exp") {
      newItem = new Expense(ID, des, val);
    } else if (type === "inc") {
      newItem = new Income(ID, des, val);
    } else {
    }
    //Push it into our data structure
    data.allItems[type].push(newItem);
    //return new data element
    return newItem;
  }

  return {
    addItem,

    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal("exp");
      calculateTotal("inc");

      // calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function() {
      let {
        budget,
        percentage,
        totals: { inc: totalInc, exp: totalExp }
      } = data;

      return { budget, totalInc, totalExp, percentagetage };
    },

    testing: () => {
      console.log(data);
    }
  };
})();

//UI Controller
let UIController = (function() {
  let DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list"
  };

  return {
    getinput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    addListItem: function(obj, type) {
      let html, newHtml, element;

      let isIncome = type === "inc";

      // create HTML string with placeholder text

      function getElementId() {
        if (type === "inc") {
          return "income";
        } else {
          return "expense";
        }
      }

      let s = myArray.length > 1 ? "s" : "";

      `Do you want to save ${myArray.lenth} dog${s}?`;

      let html = `<div class="item clearfix" id="${getElementId()}-0">
      <div class="item__description">${obj.description}</div>
        <div class="right clearfix">
          <div class="item__value">${obj.value}</div>
          <div class="item__delete">
            <button class="item__delete--btn">
              <i class="ion-ios-close-outline"></i>
            </button>
          </div>
        </div>
      </div>`;

      if (type === "inc") {
        element = DOMstrings.incomeContainer;

        html =
          '<div class="item clearfix" id="income-0"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;

        html =
          '<div class="item clearfix" id="expense-0"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // replace the placeholder text with some actual data

      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      // insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    clearFields: function() {
      let fields, fieldsArr;
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });
      // put input focus back onto description
      fieldsArr[0].focus();
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

//Global App Controller
let controller = (function(budgetCtrl, UICtrl) {
  let setupEventListeners = function() {
    let DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13) {
        ctrlAddItem();
      }
    });
  };

  let updateBudget = function() {
    // 1. Caclulate budget
    budgetCtrl.calculateBudget();
    // 2. Return the budget
    let budget = budgetCtrl.getBudget();
    // 3. Display the button on the UI
    console.log(budget);
  };

  let ctrlAddItem = function() {
    let input, newItem;
    // 1. Get the field input data
    input = UICtrl.getinput();
    // check for whether or not there is actually a value greater than 0 in the value field and a description has been entered
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add new items to budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // 3. Add new item to UI
      UICtrl.addListItem(newItem, input.type);
      // 4. Clear the Fields
      UICtrl.clearFields();
      // 5. Calculate and Update Budget
      updateBudget();
    }
  };

  return {
    init: function() {
      console.log("Application has started.");
      setupEventListeners();
    }
  };
})(budgetController, UIController);

//initialize application
controller.init();
