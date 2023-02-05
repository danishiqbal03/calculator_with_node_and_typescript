interface CalcKey{
    key: string;
    action?: string;
}

class Calculator {
    private display: HTMLDivElement;
    private display_op: HTMLDivElement;
    private keys: NodeListOf<HTMLDivElement>;
    private operation_arr:Array<string> = [];
    private res: number = 0;
    constructor() {
        this.display=document.querySelector(".calc_main") as HTMLDivElement;
        this.display_op=document.querySelector(".calc_func") as HTMLDivElement;
        this.keys=document.querySelectorAll(".calculator-key") as NodeListOf<HTMLDivElement>;
        this.initCalc(this.keys);
        
    }

    private initCalc(keys:NodeListOf<HTMLDivElement>):void {
        keys.forEach((key) => {
            key.addEventListener('click',()=>{
                this.handleClick(key);
            });
        });
    }

    private handleClick(key:HTMLDivElement):void {
        const keyVal:CalcKey = {
            key:key.textContent ? key.textContent : '',
            action:key.dataset.action,
        }
        if(keyVal.action){
            console.log(keyVal.action);
        }
        
        this.processKey(keyVal);
    }

    private processKey(keyValue: CalcKey): void {
        const { key, action } = keyValue;
        console.log("The res 1: ",this.res.toString() )
        if(this.res){
            console.log("The res 2: ",this.res.toString() )
            this.display.textContent = '0';
            this.res = 0;
        }
        const displayedNum: string = this.display.textContent ? this.display.textContent : '0';
        
        interface ActionRelation {
            [k: string]: string;
          }
          
        let action_obj: ActionRelation = {
            'add':'+',
            'minus':'-',
            'times':'*',
            'divide':'/'
        }

        let specialActions:Array<string> = ["equal",'clear','backspace'];
        
        if(action && specialActions.indexOf(action) === -1){
            console.log("The action is: ", action)
            console.log("The action_rel is: ", action_obj[action])
            if(this.operation_arr[this.operation_arr.length - 1] != action_obj[action] ){
                this.operation_arr.push(action_obj[action]);
            }
            

            
        } else if(!action) {
            console.log("The key is: ", key)
            this.operation_arr.push(key)
        }
        console.log("The Op Arr: ",this.operation_arr);
        if (!action) {
          this.display.textContent = displayedNum === '0' ? key : displayedNum + key;
        } else {
            
            if(action == 'equal'){
                console.log("The Op Arr: ",this.operation_arr);
                this.display_op.style.display = 'none';
                this.res = eval(this.operation_arr.join(''));
                console.log("The Res: ",this.res);
                this.operation_arr=[];
                this.display.textContent = this.res.toString();
            } else {
                this.display.textContent = this.operation_arr.join('');

                this.display_op.textContent = action;
                this.display_op.style.display = 'block';
            }
        }
        
    }

}

const calculator = new Calculator();
