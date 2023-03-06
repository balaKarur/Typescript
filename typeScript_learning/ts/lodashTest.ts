import { random } from "lodash"; 
export function getRandom():number{
    let rvalue = random(10,20);
    console.log("rvalue : "+rvalue); 
    return rvalue;
}

