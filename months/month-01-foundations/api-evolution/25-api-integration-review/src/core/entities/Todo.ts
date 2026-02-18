// Todo en código = Tarea (viene de "To-Do").

export class Todo {
    // the constructor defines the basic properties of our task
    // Agnostico: No depende de bases de datos, frameworks ni detalles técnicos.
    // Solo define "qué es" el dato, sin importar cómo se guarde o se use.
    constructor(
        public id: string,
        public title: string,
        public completed: boolean,
        public userId: string
    ) {};
};