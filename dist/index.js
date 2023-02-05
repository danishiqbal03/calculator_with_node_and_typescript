"use strict";
var Calculator = /** @class */ (function () {
    function Calculator() {
        this.operation_arr = [];
        this.res = 0;
        this.display = document.querySelector(".calc_main");
        this.display_op = document.querySelector(".calc_func");
        this.keys = document.querySelectorAll(".calculator-key");
        this.initCalc(this.keys);
    }
    Calculator.prototype.initCalc = function (keys) {
        var _this = this;
        keys.forEach(function (key) {
            key.addEventListener('click', function () {
                _this.handleClick(key);
            });
        });
    };
    Calculator.prototype.handleClick = function (key) {
        var keyVal = {
            key: key.textContent ? key.textContent : '',
            action: key.dataset.action,
        };
        if (keyVal.action) {
            console.log(keyVal.action);
        }
        this.processKey(keyVal);
    };
    Calculator.prototype.processKey = function (keyValue) {
        var key = keyValue.key, action = keyValue.action;
        console.log("The res 1: ", this.res.toString());
        if (this.res) {
            console.log("The res 2: ", this.res.toString());
            this.display.textContent = '0';
            this.res = 0;
        }
        var displayedNum = this.display.textContent ? this.display.textContent : '0';
        var action_obj = {
            'add': '+',
            'minus': '-',
            'times': '*',
            'divide': '/'
        };
        var specialActions = ["equal", 'clear', 'backspace'];
        if (action && specialActions.indexOf(action) === -1) {
            console.log("The action is: ", action);
            console.log("The action_rel is: ", action_obj[action]);
            if (this.operation_arr[this.operation_arr.length - 1] != action_obj[action]) {
                this.operation_arr.push(action_obj[action]);
            }
        }
        else if (!action) {
            console.log("The key is: ", key);
            this.operation_arr.push(key);
        }
        console.log("The Op Arr: ", this.operation_arr);
        if (!action) {
            this.display.textContent = displayedNum === '0' ? key : displayedNum + key;
        }
        else {
            if (action == 'equal') {
                console.log("The Op Arr: ", this.operation_arr);
                this.display_op.style.display = 'none';
                this.res = eval(this.operation_arr.join(''));
                console.log("The Res: ", this.res);
                this.operation_arr = [];
                this.display.textContent = this.res.toString();
            }
            else {
                this.display.textContent = this.operation_arr.join('');
                this.display_op.textContent = action;
                this.display_op.style.display = 'block';
            }
        }
    };
    return Calculator;
}());
var calculator = new Calculator();
