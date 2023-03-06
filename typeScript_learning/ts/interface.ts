type addFn1 = (a:number,b:number)=>number
interface addFn {
   (a:number,b:number):number;
}
var addO: addFn = (a:number,b:number):number =>
{
   return a+b;
}
interface IName{
    readonly name:string;
}
interface IPerson extends IName{
    msg(m:string):void;
    status?:string;//optional properrty
}
//age? mean optional paramater
class Person implements  IPerson {
    constructor(public name:string,private age?:string){
    }
    msg(m:string):void{
        console.log(`${m} ${this.name} ${this.age}`);
        
    }
    
}

let p1:Person = new Person("Bala");
p1.msg("Welcome");
