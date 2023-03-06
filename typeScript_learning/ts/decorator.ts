//decorator mean , its a function 
/*function Logger(constructor:Function){
    console.log("Logging Data");
    console.log(constructor);
    
    
}
@Logger
export class MyPerson {
    name = "Bala";
    constructor(){
        console.log("Creating Obj...");
        
    }
}*/
function Logger(input:string){
    console.log("Logger dec");
    
    return function (constructor:Function){
        console.log("Logger dec fun" );
        console.log("Logging Data :"+ input);
        console.log(constructor);
    }
}
function component(template:string,hookId:string){
    console.log("component dec");
    
    return  function(constructor:any){
        console.log("component dec function");
        let parentEle = document.getElementById(hookId);
        if(parentEle){
            parentEle.innerHTML = template;
             const con = new constructor();
             document.querySelector("h2")!.textContent = con.name;
        }
    }
}
@Logger("data")//class decorator
@component("<h2>Hai</h2>","app")
export class MyPerson1{
    name = "Bala";
    constructor(){
        console.log("Creating Obj...");
        
    }
}
@Logger("data")
export class MyPerson {
    name = "Bala";
    constructor(){
        console.log("Creating Obj...");
        
    }
}
console.log("Property decorator....");

function log(target:any,propertyName:string){
     console.log(target);
     console.log(propertyName);
}
class Product{
    @log//->property decorator
    title:string;
    private _price:number
    constructor(title:string,price:number){
        this.title = title;
        this._price = price;
    }
    set price(value:number){
        if(value)
        {
            this._price = value
        }else{
           throw new Error("Please provuce value")
        }
        
    }
    getpriceWithtax(){
        return this._price+10;
    }
}
const pp1 = new Product("Pen",10);
console.log(pp1);

