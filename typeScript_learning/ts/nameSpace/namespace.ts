namespace NSApp{
    interface Ipost{
        title:string;
        description:string;
    
    }
   export class Post implements Ipost{
        title: string;
        description: string;
        constructor( title:string, description:string)
        {
            this.title=title;
            this.description=description;
        }
    
    }
    
}

