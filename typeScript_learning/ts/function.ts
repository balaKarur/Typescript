//defining return type for function by 
//overloading teh function
type combination = string | number;
function getAdd(a:string,b:string):string;
function getAdd(a:number,b:number):number;
function getAdd(a:string,b:number):string;
function getAdd(a:number,b:string):string;
function getAdd(a:combination,b:combination){
    if(typeof a === "string" || typeof b === "string"){
        return a.toString() + b.toString();
    }
    return a + b;
}
const restult = getAdd('10',' 4');
restult.split(" ");
const userData = {
    name:"bala",
    job:{title:"CEO"}
}
console.log(userData?.job?.title);


/*export type APIAccessSubscribeCallbackProvider = <T>(
    subscribeEventTopic: string,
    eventMessageType: new () => T
) => Promise<APIAccessSubscribeEventCallback<T>>;

export function apiAccessSubscribeCallbackProvider(provider: APIAccessProvider): APIAccessSubscribeCallbackProvider {
    return async (topic, type) => {
        const apiAccess = await provider.createPubSubAPIAccess();
        return new APIAccessSubscribeEventCallback(apiAccess, topic, type);
    };
}*/

type Add =<T extends number>(a:string,b:T)=>number;
function addN():Add{
    return (a,b) => {

        return 1;
    }
}