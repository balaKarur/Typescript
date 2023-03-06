"use strict";
// interface pro {
//   public id:string;
//      title: string;
//      description: string;
//      people: number;
//      status: string
// }
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function autobind(target, name, descriptor) {
    const orginalMethod = descriptor.value;
    const newDescriptor = {
        configurable: true,
        get() {
            return orginalMethod.bind(this);
        },
    };
    return newDescriptor;
}
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["ACTIVE"] = 0] = "ACTIVE";
    ProjectStatus[ProjectStatus["FINISHED"] = 1] = "FINISHED";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class state {
    constructor() {
        this.listerners = [];
    }
    addListener(listerner) {
        this.listerners.push(listerner);
    }
}
class ProjectState extends state {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.ins) {
            return this.ins;
        }
        this.ins = new ProjectState();
        return this.ins;
    }
    addProject(title, description, people, pstatus) {
        const id = Math.random().toString();
        const pObj = new Project(id, title, description, people, pstatus);
        this.projects.push(pObj);
        this.updateListner();
    }
    getProjects() {
        return this.projects;
    }
    moveProject(projectId, newStatus) {
        var draggedProject = this.projects.find((project) => project.id == projectId);
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
const projectState = ProjectState.getInstance();
class ProjectInput {
    constructor() {
        this.FormEl = document.querySelector("form");
        this.titleEl = document.getElementById("title");
        this.descriptionEl = document.getElementById("description");
        this.peopleEl = document.getElementById("people");
        this.configure();
    }
    configure() {
        //this.FormEl.addEventListener("submit",this.submitHandler.bind(this))
        this.FormEl.addEventListener("submit", this.submitHandler);
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            this.clearInput();
            projectState.addProject(title, description, people, ProjectStatus.ACTIVE);
        }
    }
    clearInput() {
        this.titleEl.value = "";
        this.descriptionEl.value = "";
        this.peopleEl.value = "";
    }
    gatherUserInput() {
        const title = this.titleEl.value;
        const description = this.descriptionEl.value;
        const people = +this.peopleEl.value;
        return [title, description, people];
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
class ProjectList {
    constructor(projectStatus) {
        this.projectStatus = projectStatus;
        this.assignedProjects = [];
        this.listEl = document.getElementById(`${this.projectStatus}` + "-project-list");
        projectState.addListener((projects) => {
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
    dragOverHandler(event) {
        event.preventDefault();
        console.log("dragOverHandler");
        this.listEl.classList.add("droppable");
    }
    dragleaveHandler(event) {
        console.log("dragleaveHandler");
        this.listEl.classList.remove("droppable");
    }
    dropHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            const projectId = event.dataTransfer.getData("text/plain");
            projectState.moveProject(projectId, this.projectStatus === "active"
                ? ProjectStatus.ACTIVE
                : ProjectStatus.FINISHED);
        }
        this.listEl.classList.remove("droppable");
        console.log("dropHandler");
    }
    renderProjects() {
        this.listEl.innerHTML = "";
        for (let project of this.assignedProjects) {
            new ProjectItem(project, this.listEl);
            //const listItemEl = document.createElement("li");
            //listItemEl.innerHTML = project.title;
            // listEl.appendChild(listItemEl);
        }
    }
}
__decorate([
    autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dragleaveHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dropHandler", null);
class ProjectItem {
    constructor(project, listEl) {
        this.project = project;
        this.listEl = listEl;
        this.listItemEl = document.createElement("li");
        this.listItemEl.setAttribute("draggable", "true");
        this.renderContent();
        this.configure();
    }
    configure() {
        this.listItemEl.addEventListener("dragstart", this.dragStartHandler);
        this.listItemEl.addEventListener("dragend", this.dragEndEHandler);
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
        console.log("dragStartHandler");
    }
    //@autobind
    dragEndEHandler(event) {
        console.log("dragEndEHandler");
    }
    get person() {
        if (this.project.people === 1) {
            return "1 Person";
        }
        return `${this.project.people} Persons`;
    }
    renderContent() {
        const liData = `<h3>${this.project.title}</h3>
            <div><strong>${this.person}  Assigned </strong></div>
            <div>${this.project.description}</div>`;
        this.listItemEl.innerHTML = liData;
        this.listEl.appendChild(this.listItemEl);
    }
}
__decorate([
    autobind
], ProjectItem.prototype, "dragStartHandler", null);
const pi = new ProjectInput();
const apl = new ProjectList("active");
const fpl = new ProjectList("finished");
//# sourceMappingURL=main.js.map