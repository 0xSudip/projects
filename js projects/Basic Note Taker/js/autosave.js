console.log("Welcome to autosave note");
let note = document.getElementById("text")
let btn = document.getElementById("btn");

note.innerHTML = localStorage.getItem('note');
note.addEventListener("keyup",function(e){
    localStorage.setItem("note",note.value)
})
btn.addEventListener("click", function(c){  
    localStorage.removeItem("note");
    note.innerHTML = "";
})
