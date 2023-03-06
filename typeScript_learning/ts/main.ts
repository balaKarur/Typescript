let input1 = <HTMLInputElement> document.querySelector("#number1") ;
let input2 = document.querySelector("#number2") as HTMLInputElement;
let result1 = document.querySelector("#result") as HTMLInputElement;
let button = document.querySelector("#button") as HTMLInputElement;
let result = 0;
const add = (input1: number , input2: number) =>{
    result = input1 + input2;
    return  result;
}
function btnClicked(message:string){
    result1.value  = ""+add(+input1.value , +input2.value);
}
button.addEventListener("click", btnClicked.bind(this,"sss"));
// button.addEventListener("click", function () {
//     result1.value  = ""+add(+input1.value , +input2.value);
// });
enum ROLES {
    ADMIN="ADMIN",
    AUTHOR="AUTHOR",
    GUEST="GUEST"
}
enum TYPES{
    STRING="STRING",
    NUMBER="NUMBER"
}
//Tuple
 let roleT:[number,string];
 
let person:{name:string;age:number;hobbies:string[];
            role:string,roletype:[number,string]} ={
    name:"Bala",
    age:20,
    hobbies:["learning","cooking"],
    role:ROLES.ADMIN,
    roletype:[0,"ADMIN"]

}
if(person.role == ROLES.ADMIN)
{
    console.log("User is ADMIN");
}
else{
    console.log("User is not ADMIN");
}
console.log(person.name);
//Array Types
let favorites:string[];
favorites=["test"];
for(let hobbie of person.hobbies){
console.log("hobbie : "+ hobbie);

}
//any type
let arr: any[]=[];
arr.push("bala");
arr.push(20);
//union Type
let mark:string | number = "100";
mark=100;
type arrType =(string | number)[];
let arr1: arrType;
arr1=[1,"22"]
arr1.push("true");
type async=true|false|"text";
type combine = number| string
//literal type
let resultType:'as-number'|'as-string';
function combineApi(input1:combine,input2:combine,async:async):undefined{
    return undefined;
}
//function
function add1(n1:number,n2:number):number{
    return n1 + n2 ;
}
function printResult(value:number){
    console.log("printResult : "+value);
}
let combineValues:Function;//just mentining combineValues type is function 
combineValues = printResult;
console.log(combineValues(1));
//even if we need to mention what kind of param and return type this function will take 
//as shown below as combineValues function should take 2 number param and return as number type
let combineValues1:(a:number,b:number) => number;//-> defining the  structure of teh function
combineValues = add1;
console.log("combineValues by 2 param : "+combineValues(1,2));

//unknown type
let ut:unknown;
let at;
let kt:string;
kt="bala"
//cant assign unknown type to know type 
// if need to assigne unknow type , then need to type convertion or type-assertions
kt=<string> ut;
ut=kt;
at=ut;
ut=at;
//Never type

function generateError(message:string,code:number):never{
    console.log(message);
    
    throw {message,code}
}
function generate():void{
    console.log("generate api");
    return 
}

console.log(generate());
try{
    let res = generateError("Invalid page",500);
    console.log(res);
}catch(ex){
    console.log("generateError done...");//control wont come here 
}
//any type
let aa=10;

function msg(data:string,data1:string){
    //let aa=10;
    console.log("msg data : "+ data);
}
//noImplicitReturns

function cal(n1:number,n2:number){
    if(n1>1){ 
        return "n1 is > 1"
    }
    return;//explicitly need to return if we enable noImplicitReturns
}





