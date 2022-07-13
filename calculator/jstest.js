var counter = 0;

let addButton = document.getElementById("add")

addButton.addEventListener("click", sayHello("Hello!"));

function sayHello (message) {
    alert(message); 
}

console.log(addButton.innerHTML);