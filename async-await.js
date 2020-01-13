const baseUrl = "https://jsonplaceholder.typicode.com/todos";
let lista = [];
let todo = {
    title: "",
    userId: null,
    completed: false
};
let limite = 10;
let ultimo = 0;
let mostrados = 0;

const handleError = err => {
    alert(`Hubo un error. ${err}`);
};

const getTodos = async () => {
    try {
        const res = await axios.get(baseUrl);
        lista = res.data;
        listaCompleta();
    } catch (err) {
        handleError();
    }
};

const getTodo = async id => {
    try {
        const res = await axios.get(`${baseUrl}/${id}`);
        todo = res.data;
    } catch (err) {
        handleError();
    }
};

const createTodo = async (title, userId) => {
    let data = {
        title,
        userId,
        completed: false
    }
    try{
        let res = await axios.post(baseUrl, data);
        lista.push(res.data);
        console.log(lista[lista.length - 1]);
        listaCompleta();
    }catch (err){
        handleError();
    }
};

const deleteTodo = async id => {
    try{
        let res = await axios.delete(`${baseUrl}/${id}`);
        const index = lista.findIndex(todo => {
            return todo.id == id;
        })
        lista.splice(index, 1);
    }catch (err){
        handleError();
    }
};

const modifyTodo = async (id, title, userId, completed) => {
    let data = {
        id,
        title,
        userId,
        completed
    };
    try{
        let res = await  axios.put(`${baseUrl}/${id}`, data);
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].id == id) {
                lista[i] = res.data;
                console.log(lista[i]);
            }
        }
        listaCompleta();
    }catch (err){
        handleError();
    }
};


const listaCompleta = () => {
    let totalList = document.querySelector("#todo-list");
    totalList.innerHTML = "";
    for (let i = 0; i < limite; i++) {
        let item = document.createElement("li");
        item.classList.add("todo-item");
        let id = document.createElement("span");
        id.classList.add("todo-title");
        id.innerHTML = lista[ultimo].id;
        let title = document.createElement("span");
        title.classList.add("todo-title");
        title.innerHTML = lista[ultimo].title;
        let user = document.createElement("span");
        user.classList.add("todo-user");
        user.innerHTML = lista[ultimo].userId;
        let complete = document.createElement("span");
        complete.classList.add("todo-completed");
        complete.innerHTML = resultado(lista[ultimo].completed);
        let boton = newBotonEliminar(lista[ultimo].id);
        item.appendChild(id);
        item.appendChild(title);
        item.appendChild(user);
        item.appendChild(complete);
        item.appendChild(boton);
        totalList.appendChild(item);
        ultimo++;
    };
    cambiarSelector();
};

const irSiguiente = () => {
    let totalList = document.querySelector("#todo-list");
    totalList.innerHTML = "";
    if (ultimo < lista.length) {
        for (let i = 0; i < limite; i++) {
            if (ultimo < lista.length) {
                let item = document.createElement("li");
                item.classList.add("todo-item");
                let id = document.createElement("span");
                id.classList.add("todo-title");
                id.innerHTML = lista[ultimo].id;
                let title = document.createElement("span");
                title.classList.add("todo-title");
                title.innerHTML = lista[ultimo].title;
                let user = document.createElement("span");
                user.classList.add("todo-user");
                user.innerHTML = lista[ultimo].userId;
                let complete = document.createElement("span");
                complete.classList.add("todo-completed");
                complete.innerHTML = resultado(lista[ultimo].completed);
                let boton = newBotonEliminar(lista[ultimo].id);
                item.appendChild(id);
                item.appendChild(title);
                item.appendChild(user);
                item.appendChild(complete);
                item.appendChild(boton);
                totalList.appendChild(item);
                ultimo++;
                console.log(`ultimo ${ultimo}`);
                mostrados++;
                console.log(`mostrados ${mostrados}`)
            }
        }
    }
};
const irAnterior = () => {
    let totalList = document.querySelector("#todo-list");
    totalList.innerHTML = "";
    console.log(`ultimo antes de loop anterior ${ultimo}`);
    console.log(`mostrados antes de loop anterior ${mostrados}`)
    ultimo = ultimo - limite;
    console.log(`ultimo despues de restar mostrados${ultimo}`);
    mostrados = mostrados-limite;
    console.log(`mostrados despues de restar limite${mostrados}`)
    for (let i = 0; i < limite; i++) {
        if (ultimo < lista.length) {
            let item = document.createElement("li");
            item.classList.add("todo-item");
            let id = document.createElement("span");
            id.classList.add("todo-title");
            id.innerHTML = lista[mostrados].id;
            let title = document.createElement("span");
            title.classList.add("todo-title");
            title.innerHTML = lista[mostrados].title;
            let user = document.createElement("span");
            user.classList.add("todo-user");
            user.innerHTML = lista[mostrados].userId;
            let complete = document.createElement("span");
            complete.classList.add("todo-completed");
            complete.innerHTML = resultado(lista[mostrados].completed);
            let boton = newBotonEliminar(lista[mostrados].id);
            item.appendChild(id);
            item.appendChild(title);
            item.appendChild(user);
            item.appendChild(complete);
            item.appendChild(boton);
            totalList.appendChild(item);
            console.log(`ultimo al apretar anterior ${ultimo}`);
            mostrados++;
            console.log(`mostrados al apretar anterior ${mostrados}`)
        }
    }
};

let botonSiguiente = document.querySelector("#todo-next");
botonSiguiente.addEventListener("click", () => {
    if (ultimo == lista.length) {
        botonSiguiente.disable = true;
    } else {
        irSiguiente()
    }
});

let botonAnterior = document.querySelector("#todo-prev");
botonAnterior.addEventListener("click", () => {
    if (ultimo == 10) {
        botonAnterior.disable = true;
    } else {
        irAnterior();
    }
});

const cambiarSelector = () => {
    let selectorMaximo = document.querySelector("#todo-id-update");
    selectorMaximo.setAttribute("max", `${lista.length}`);
    selectorMaximo.setAttribute("min", "1");
};

const newBotonEliminar = (id) => {
    let boton = document.createElement("button");
    boton.classList.add("todo-delete");
    boton.innerHTML = "Eliminar";
    boton.addEventListener("click", () => {
        boton.parentElement.remove();
        deleteTodo(id);
    });
    return boton;
};

const resultado = (hecho) => {
    if (hecho) {
        return "Completed";
    }
    return "Incomplete";
};


let botonModificar = document.querySelector("#todo-update");
botonModificar.addEventListener("click", () => {
    let tarea = document.querySelector("#todo-id-update").value;
    let titulo = document.querySelector("#todo-title-update").value;
    let usuario = document.querySelector("#todo-user-update").value;
    let checkbox = document.querySelector("#todo-completed-update").checked;
    modifyTodo(tarea, titulo, usuario, checkbox);
});

let botonAgregar = document.querySelector("#todo-create");
botonAgregar.addEventListener("click", () => {
    let tarea = document.querySelector("#todo-title-create").value;
    let usuario = document.querySelector("#todo-user-create").value;
    createTodo(tarea, usuario);
    document.querySelector("#todo-title-create").value = "";
    document.querySelector("#todo-user-create").value = "";
});

window.addEventListener('load', getTodos);