// Budget Controller
var budgetController = (function() {
    
  
})();

//UI Controller 
var UIController = (function() {
    
var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'

}

    return {
        getinput: function() {

            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value, 
                value: document.querySelector(DOMstrings.inputValue).value
            }
            
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();

//Global App Controller 
var controller = (function(budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDOMstrings();
    var ctrlAddItem = function () {
         // 1. Get the field input data
        var input = UICtrl.getinput();
        console.log(input);

        // 2. Add new items to budget controller

        // 3. Add new item to UI

        // 4. Caclulate budget

        // 5. Display the button on the UI
        console.log('yes');
    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);


    document.addEventListener('keypress', function(event) {

        if (event.keyCode === 13) {
            ctrlAddItem();
        }
    
    });

})(budgetController, UIController);


