// Budget Controller
var budgetController = (function() {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };



    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID; 

            //ID = Last ID + 1
            //create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            //create new item based on type inc or exp
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            } else {

            }
            //Push it into our data structure
            data.allItems[type].push(newItem);
            //return new data element
            return newItem;

        },

        testing: function() {
            console.log(data);
        }
    };


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

        addListItem: function(obj, type) {
            // create HTML string with placeholder text


            // replace the placeholder text with some actual data

            
            // insert the HTML into the DOM
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();

//Global App Controller 
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event) {
    
            if (event.keyCode === 13) {
                ctrlAddItem();
            }
        
        });
    
    };


    var ctrlAddItem = function () {
        var input, newItem;
         // 1. Get the field input data
        input = UICtrl.getinput();

        // 2. Add new items to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // 3. Add new item to UI

        // 4. Caclulate budget

        // 5. Display the button on the UI
    };

    return {
        init: function () {
        console.log('Application has started.');
        setupEventListeners();
        }
    };
 
})(budgetController, UIController);

//initialize application
controller.init();