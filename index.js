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

const handleError = err =>{
    alert(`Hubo un error. ${err}`);
};
const getTodos = () =>{
    axios.get(baseUrl)
        .then(res => {
            lista = res.data;
            listaCompleta();
        })
        .catch(handleError);
};
const getTodo = id => {
    axios.get(`${baseUrl}/${id}`)
        .then(res => {
            todo = res.data;
        })
        .catch(handleError);
};
const createTodo = (title, userId) => {
    let data = {
        title,
        userId,
        completed: false
    }
axios.post(baseUrl, data)
        .then(res => {
            lista.push(res.data);
            console.log(lista[lista.length-1]);
            listaCompleta();
        })
        .catch(handleError);
};
const deleteTodo = id => {
    axios.delete(`${baseUrl}/${id}`)
        .then(res => {
            const index = lista.findIndex(todo => {
                return todo.id == id;
            })
            lista.splice(index, 1);
        })
        .catch(handleError);
};
const modifyTodo = (id, title, userId, completed) => {
    let data = {
        id,
        title,
        userId,
        completed
    };
    axios.put(`${baseUrl}/${id}`, data)
        .then(res => {
            for (let i = 0; i < lista.length; i++) {
                if(lista[i].id == id) {
                    lista[i] = res.data;
                    console.log(lista[i]);
                }
            }
            listaCompleta();
        })
        .catch(handleError);
};


const listaCompleta = ()=>{
    let totalList = document.querySelector("#todo-list");
    totalList.innerHTML = "";
    for (let i = 0; i < limite; i++){
            let item = document.createElement("li");
                item.classList.add("todo-item");
            let title = document.createElement("span");
                title.classList.add("todo-title");
                title.innerHTML = lista[i].title;
            let user = document.createElement("span");
                user.classList.add("todo-user");
                user.innerHTML = lista[i].userId;
            let complete = document.createElement("span");
                complete.classList.add("todo-completed");
                complete.innerHTML = resultado(lista[i].completed);
            let boton = newBotonEliminar(lista[i].id);
            item.appendChild(title);
            item.appendChild(user);
            item.appendChild(complete);
            item.appendChild(boton);
            totalList.appendChild(item);
            ultimo++;
        };
        cambiarSelector();
};

const irSiguiente = ()=>{
    let totalList = document.querySelector("#todo-list");
    totalList.innerHTML = "";
    if(ultimo <lista.length){
        for(let i=0;i<limite;i++){
            if(ultimo <lista.length){
            let item = document.createElement("li");
                item.classList.add("todo-item");
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
            item.appendChild(title);
            item.appendChild(user);
            item.appendChild(complete);
            item.appendChild(boton);
            totalList.appendChild(item);
            ultimo++;
            mostrados++;}
        }
    }
}; 
const irAnterior = ()=>{
    let totalList = document.querySelector("#todo-list");
    totalList.innerHTML = "";
    ultimo= ultimo-mostrados;
    for(let i=0;i<limite;i++){
        if(ultimo <lista.length){
            let item = document.createElement("li");
                item.classList.add("todo-item");
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
            item.appendChild(title);
            item.appendChild(user);
            item.appendChild(complete);
            item.appendChild(boton);
            totalList.appendChild(item);
            ultimo++;
        }
    }
};       

let botonSiguiente = document.querySelector("#todo-next");
botonSiguiente.addEventListener("click",()=>{
    if (ultimo==lista.length){
        botonSiguiente.disable = true;
    }else{
        irSiguiente()}});

let botonAnterior = document.querySelector("#todo-prev");
botonAnterior.addEventListener("click",()=>{    
    if (ultimo<=10){
        botonAnterior.disable = true;
    }else{
        irAnterior();
    }
}
);

const cambiarSelector = ()=>{
    let selectorMaximo = document.querySelector("#todo-id-update");
    selectorMaximo.setAttribute("max",`${lista.length}`);
    selectorMaximo.setAttribute("min","1");
};

const newBotonEliminar = (id)=>{
    let boton = document.createElement("button");
    boton.classList.add("todo-delete");
    boton.innerHTML = "Eliminar";
    boton.addEventListener("click", () =>{
        boton.parentElement.remove();
        deleteTodo(id);
    }
    );
    return boton;
};

const resultado = (hecho)=>{
    if(hecho){
        return "Completed";
    }
    return "Incomplete";
};


let botonModificar = document.querySelector("#todo-update");
    botonModificar.addEventListener("click",()=>{
    let tarea = document.querySelector("#todo-id-update").value;
    let titulo = document.querySelector("#todo-title-update").value;
    let usuario = document.querySelector("#todo-user-update").value;
    let checkbox = document.querySelector("#todo-completed-update").checked;
        modifyTodo(tarea,titulo,usuario,checkbox);
});

let botonAgregar = document.querySelector("#todo-create");
    botonAgregar.addEventListener("click",()=>{
        let tarea = document.querySelector("#todo-title-create").value;
        let usuario = document.querySelector("#todo-user-create").value;
        createTodo(tarea,usuario);
        document.querySelector("#todo-title-create").value = "";
        document.querySelector("#todo-user-create").value = "";
});

window.addEventListener('load', getTodos);