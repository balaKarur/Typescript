// interface pro {
//   public id:string;
//      title: string;
//      description: string;
//      people: number;
//      status: string
// }

function autobind(target: any, name: string, descriptor: PropertyDescriptor) {
  const orginalMethod = descriptor.value;
  const newDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      return orginalMethod.bind(this);
    },
  };
  return newDescriptor;
}

interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndEHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dragleaveHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
}
enum ProjectStatus {
  ACTIVE,
  FINISHED,
}
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
type Listerner<T> = (projects: T[]) => void;
class state<T> {
  protected listerners: Listerner<T>[] = [];
  addListener(listerner: Listerner<T>) {
    this.listerners.push(listerner);
  }
}
class ProjectState extends state<Project> {
  private static ins: ProjectState;
  private projects: Project[] = [];

  constructor() {
    super();
  }

  static getInstance(): ProjectState {
    if (this.ins) {
      return this.ins;
    }
    this.ins = new ProjectState();
    return this.ins;
  }
  public addProject(
    title: string,
    description: string,
    people: number,
    pstatus: number
  ) {
    const id = Math.random().toString();
    const pObj = new Project(id, title, description, people, pstatus);
    this.projects.push(pObj);
    this.updateListner();
  }
  public getProjects() {
    return this.projects;
  }
  public moveProject(projectId: string, newStatus: ProjectStatus): void {
    var draggedProject = this.projects.find(
      (project) => project.id == projectId
    );
    if (draggedProject && draggedProject.status != newStatus) {
      draggedProject.status = newStatus;
      this.updateListner();
    }
  }

  updateListner() {
    for (const listernerFn of this.listerners) {
      listernerFn(this.projects);
    }
  }
}
const projectState: ProjectState = ProjectState.getInstance();

class ProjectInput {
  FormEl: HTMLFormElement;
  titleEl: HTMLInputElement;
  descriptionEl: HTMLInputElement;
  peopleEl: HTMLInputElement;
  constructor() {
    this.FormEl = document.querySelector("form") as HTMLFormElement;
    this.titleEl = document.getElementById("title") as HTMLInputElement;
    this.descriptionEl = document.getElementById(
      "description"
    ) as HTMLInputElement;
    this.peopleEl = document.getElementById("people") as HTMLInputElement;
    this.configure();
  }
  private configure() {
    //this.FormEl.addEventListener("submit",this.submitHandler.bind(this))
    this.FormEl.addEventListener("submit", this.submitHandler);
  }
  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      this.clearInput();
      projectState.addProject(title, description, people, ProjectStatus.ACTIVE);
    }
  }
  private clearInput() {
    this.titleEl.value = "";
    this.descriptionEl.value = "";
    this.peopleEl.value = "";
  }
  private gatherUserInput(): [string, string, number] {
    const title = this.titleEl.value;
    const description = this.descriptionEl.value;
    const people = +this.peopleEl.value;
    return [title, description, people];
  }
}

class ProjectList implements DragTarget {
  assignedProjects: Project[] = [];
  listEl: HTMLUListElement;
  constructor(private projectStatus: string) {
    this.listEl = document.getElementById(
      `${this.projectStatus}` + "-project-list"
    ) as HTMLUListElement;

    projectState.addListener((projects: Project[]) => {
      const releventProject = projects.filter((project) => {
        if (this.projectStatus === "active") {
          return project.status === ProjectStatus.ACTIVE;
        }
        return project.status === ProjectStatus.FINISHED;
      });
      this.assignedProjects = releventProject;
      this.renderProjects();
    });
    this.configure();
  }
  configure() {
    this.listEl.addEventListener("dragover", this.dragOverHandler);
    this.listEl.addEventListener("dragleave", this.dragleaveHandler);
    this.listEl.addEventListener("drop", this.dropHandler);
  }
  @autobind
  dragOverHandler(event: DragEvent): void {
    event.preventDefault();
    console.log("dragOverHandler");
    this.listEl.classList.add("droppable");
  }
  @autobind
  dragleaveHandler(event: DragEvent): void {
    console.log("dragleaveHandler");
    this.listEl.classList.remove("droppable");
  }
  @autobind
  dropHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      const projectId: string = event.dataTransfer.getData(
        "text/plain"
      ) as string;
      projectState.moveProject(
        projectId,
        this.projectStatus === "active"
          ? ProjectStatus.ACTIVE
          : ProjectStatus.FINISHED
      );
    }
    this.listEl.classList.remove("droppable");
    console.log("dropHandler");
  }
  private renderProjects() {
    this.listEl.innerHTML = "";
    for (let project of this.assignedProjects) {
      new ProjectItem(project, this.listEl);
      //const listItemEl = document.createElement("li");
      //listItemEl.innerHTML = project.title;
      // listEl.appendChild(listItemEl);
    }
  }
}

class ProjectItem implements Draggable {
  listItemEl: HTMLLIElement;
  constructor(private project: Project, private listEl: HTMLUListElement) {
    this.listItemEl = document.createElement("li");
    this.listItemEl.setAttribute("draggable", "true");
    this.renderContent();
    this.configure();
  }
  private configure() {
    this.listItemEl.addEventListener("dragstart", this.dragStartHandler);
    this.listItemEl.addEventListener("dragend", this.dragEndEHandler);
  }
  @autobind
  public dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
    console.log("dragStartHandler");
  }
  //@autobind
  public dragEndEHandler(event: DragEvent) {
    console.log("dragEndEHandler");
  }

  get person() {
    if (this.project.people === 1) {
      return "1 Person";
    }
    return `${this.project.people} Persons`;
  }
  private renderContent() {
    const liData = `<h3>${this.project.title}</h3>
            <div><strong>${this.person}  Assigned </strong></div>
            <div>${this.project.description}</div>`;
    this.listItemEl.innerHTML = liData;
    this.listEl.appendChild(this.listItemEl);
  }
}
const pi = new ProjectInput();
const apl = new ProjectList("active");
const fpl = new ProjectList("finished");
