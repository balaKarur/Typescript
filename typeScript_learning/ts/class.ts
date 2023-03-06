abstract class Department{
    //public name:string;
    //private id:string;
    //private employee:string[]=[];
    protected employee:string[]=[];
    static financialYear = 2022;
    constructor(public name:string,protected readonly id:string){
        //this.name=name;
    }
    //abstract describe(this:Department):void;
    addEmployee(empName:string){
        this.employee.push(empName);
    }
    static getDepartmentYear()
    {
        //Department.employee;
        return Department.financialYear;
    }
}
// let dep = new Department("Salse","1 ");
// console.log(dep);
// dep.describe();
// let depCopy = {"name":"Sales1",describe:dep.describe};
// console.log("New dep");

// //depCopy.describe.bind(dep)();
// dep.addEmployee("Bala");
// dep.addEmployee("mani");
// //dep.employee.push("Raj")//private member cant access by object  

class ItDepartment extends Department{
    private static instance:ItDepartment;
    private constructor(private admins:string[],private dname:string,private did:string)
     {
         super(dname,did);
         console.log(this.dname);
         
     }
     //singlton design pattern
    static getInstance(name:string, id:string){
          if(ItDepartment.instance){
              return this.instance; //or ItDepartment.instance
          }
          else{
              ItDepartment.instance = new ItDepartment([],name,id);
              return this.instance;
          }
    }
     describe()
     {
        console.log("Department is :"+this.name +" "+ this.did);
     }
     addEmployee(name:string){
       if(name != "Bala")
       {
        //this.employee.push(name) ;//private variable cant access in child class  
        this.employee.push(name+"_protected") ;//protected variable can access in child class 
        super.addEmployee(name);//to access parent class api
       }
       else{
           console.error(name + "name cant add to IT department");
           
       }
     }
     addAdmin(name:string){
        this.admins.push(name);
     }
     printAdmin(){
         console.log(this.admins);
     }

}
class SalseDepartment extends Department{
    private lastRecord:string;
    constructor(private readonly reports:string[])
    {
        super("SalseDepartment","02");
       this. lastRecord="";
    }
    describe()
     {
        console.log("Department is :"+this.name +" "+ this.id);
     }
    addReport(name:string)
    {
        this.reports.push(name);
    }
    
    getRecentReport(){
        return this.reports[this.reports.length-1];
    }
    
    //getter 
    get recentReport(){
        if(this.lastRecord)
        {
            throw new Error("No report found");
        }
        //return this.getRecentReport();
        return this.lastRecord;
    }
    //setter
    set recentReport(value:string){
        if(
            this.lastRecord)
        {
            throw new Error("Report can not be inserted...")
        }
        this.lastRecord = value;
        this.addReport(value);
    }
    printReport(){
        console.log(this.reports);
        
    }
}

//let it = new ItDepartment(["dev"]);
let it = ItDepartment.getInstance("IT Dep","101")
it.addAdmin("Mani");
it.addEmployee("Bala");
it.addEmployee("Mani");
it.addEmployee("Ram");
it.printAdmin();
console.log(it);
console.log("Sal Data");
it.describe();
//let sd = new SalseDepartment(["sal Doc"]);
let sd = new SalseDepartment([]);
try{
    console.log("Error :"+sd.recentReport);
}catch(ex){
    console.log(ex);
    
}

sd.addReport("con Doc");
sd.addEmployee("Bala");
sd.addEmployee("Mani1");
sd.addEmployee("Ram1");
sd.printReport();
sd.describe();
sd.recentReport = "final Doc";
try{
    console.log("recentReport : "+sd.recentReport);
    console.log("getRecentReport : "+sd.getRecentReport());
    
}
catch(ex){
    console.log(ex);
    
}
console.log(sd);
console.log("static Var : "+Department.getDepartmentYear());


