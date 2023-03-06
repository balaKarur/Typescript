//let names1:Array<string> =[];
//or
//let name1:string[]=[];
//Build in generics Promise<string> and Array<string>
let promise:Promise<string> = new Promise((resolve,reject) => {
    setTimeout(()=>{
        resolve("This is promise")
    },100)

});

promise.then( (data) => {
     data.split(" ");
})

function merge<T extends object,B extends object> (objA: T,objb: B){
    return  Object.assign(objA,objb);
}

const data = merge({name:"bala"},{age:12});
console.log(data.age);

type lengthy = {
    length:number;
}
function getCountAndDEscription<T extends lengthy,B extends string>(a:T):[T,string]
{
   let text = "Got no element";
   if(a.length === 1)
   {
       text = `Got ${a.length} element`;
   }
   else if(a.length > 1 )
   {
    text = `Got ${a.length} elements`;
   }
   return [a,text];
}

getCountAndDEscription("bala");

function extractKeyFormObject<T extends object ,B extends keyof T>(obj : T,key : B){
     return obj[key];
}
extractKeyFormObject({name:"bala",age:20},"name");

class DataStore<T>
{
    public store:Array<T> = [];
    addItem(item:T){
        this.store.push(item);
    }
    deleteItem(item:T){
       this. store.splice(this.store.indexOf(item),1);
    }
    getItem(){
        return [...this.store];
    }
}
console.log("String STore");

const sStore = new DataStore<string>();
sStore.addItem("Bala");
sStore.addItem("mani");
sStore.deleteItem("mani");
console.log("sStore : "+sStore.getItem());

console.log("Object STore");
const objStore = new DataStore<object>();
let uobj1 = {"name":"Bala"};
objStore.addItem(uobj1);
objStore.addItem({"name":"mani"});
objStore.deleteItem(uobj1);
console.log("objStore : "+JSON.stringify(objStore.getItem()));

//let name1s : Readonly<string[]> = ["Bala","mani"];
//name1s.push("Ram");//This cant be done

export class SuccessServerResult {
  constructor (public httpCode: number, public resultObject:Object) {}
}

export class ErrorServerResult {
  constructor (public httpCode: number, public message:string) {}
}


export function getResult(result: SuccessServerResult | ErrorServerResult | null) {
    if (result!.httpCode === 200 && result instanceof SuccessServerResult) {
      return result.resultObject;
    }
    // else if (result instanceof ErrorServerResult) 
    else if("message" in  result!)
    {
      return result.message;
    }
    return null;
  }