/**
 * =========================================
 * 📌 How To Use – TaskManager
 * =========================================
 *
 * 1️⃣ Create Instance
 * -----------------------------------------
 * const manager = new TaskManager(
 *   "Ryo",
 *   "ryo@mail.com",
 *   "123"
 * );
 *
 * 2️⃣ Add Task
 * -----------------------------------------
 * manager.addTask("Belajar TypeScript");
 *
 * 3️⃣ Toggle Task (Complete / Uncomplete)
 * -----------------------------------------
 * manager.toggleTask(1);
 *
 * 4️⃣ Delete Task
 * -----------------------------------------
 * manager.deleteTask(1);
 *
 * 5️⃣ Search Task
 * -----------------------------------------
 * manager.searchTask("belajar");
 *
 * 6️⃣ Get All Tasks
 * -----------------------------------------
 * manager.getAllTasks();
 *
 * 7️⃣ Get Completed Tasks Only
 * -----------------------------------------
 * manager.getCompletedTasks();
 *
 * =========================================
 * Run:
 * Compile with: tsc filename.ts
 * Then run: node filename.js
 * =========================================
 */

interface Task {
    id: number;
    title: string;
    completed: boolean;
  }
  
  interface Person {
    id: number;
    username: string;
    email: string;
    password: string;
    inventory: Task[];
  }
  
  class TaskManager implements Person {
    id: number;
    inventory: Task[] = [];
  
    private taskIdCounter = 1;
  
    constructor(
      public username: string,
      public email: string,
      public password: string
    ) {
      this.id = 1;
    }
  
    addTask(title: string): string {
      const newTask: Task = {
        id: this.taskIdCounter++,
        title,
        completed: false
      };
  
      this.inventory.push(newTask);
      return "Task Added";
    }
  
    deleteTask(id: number): string {
      const index = this.inventory.findIndex(task => task.id === id);
  
      if (index === -1) return "Task Not Found";
  
      this.inventory.splice(index, 1);
      return "Task Deleted";
    }
  
    toggleTask(id: number): string {
      const task = this.inventory.find(task => task.id === id);
  
      if (!task) return "Task Not Found";
  
      task.completed = !task.completed;
      return "Task Updated";
    }
  
    searchTask(keyword: string): Task[] {
      return this.inventory.filter(task =>
        task.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }
  
    getAllTasks(): Task[] {
      return this.inventory;
    }
  
    getCompletedTasks(): Task[] {
      return this.inventory.filter(task => task.completed);
    }
  }
  