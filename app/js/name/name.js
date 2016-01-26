class Main {
    constructor() {

        this.todos = [];
        this.load = function () {
            this.todos = JSON.parse(localStorage.notes);
        };

        this.addTodo = function () {
            this.todos.push({text: this.todoText, done: false});
            this.todoText = '';
            localStorage.notes = JSON.stringify(this.todos);
        };

        this.remaining = function () {
            let count = 0;
            angular.forEach(this.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };
        this.removeItem = function (index) {
            this.todos.splice(index, 1);
            localStorage.notes = JSON.stringify(this.todos);
        };
        this.allDone = function () {
            this.todos.forEach(function (item) {
                item.done = true;
            });

            localStorage.notes = JSON.stringify(this.todos);
        };
        this.allNotDone = function () {
            this.todos.forEach(function (item) {
                item.done = false;
            });

            localStorage.notes = JSON.stringify(this.todos);
        };
        this.saveDone = function () {
            localStorage.notes = JSON.stringify(this.todos);
        };
        this.clearAllDone = function () {
            for (let i = this.todos.length - 1; i >= 0; i --) {
                if (this.todos[i].done === true) {
                    this.todos.splice(i, 1);
                }
            }
            localStorage.notes = JSON.stringify(this.todos);
        };
    }
}
export default Main;