console.log("Cv Scanner");
// Data
const data = [
    {
        name: 'Akash Hamal',
        age: 20,
        city: 'Bihar',
        languages: 'Python and JS',
        Speciality: 'Web Pentesting',
        image: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
        name: 'Sid Joshi',
        age: 23,
        city: 'Delhi',
        languages: 'C, C++, Rust, Go, PHP and JS',
        Speciality: 'Web Pentesting,Source Code Review',
        image: 'https://randomuser.me/api/portraits/men/51.jpg'
    },
    {
        name: 'Sourav Das',
        age: 21,
        city: 'Kolkata',
        languages: 'Go, PHP and JS',
        Speciality: 'Web Pentesting',
        image: 'https://randomuser.me/api/portraits/men/4.jpg'
    },
    {
        name: 'Nirmal Thapa',
        age: 28,
        city: 'Kathmandu',
        languages: 'Go, Python, JS and PHP',
        Speciality: 'Web Pentesting',
        image: 'https://randomuser.me/api/portraits/men/52.jpg'
    },
    {
        name: 'Sunil Yadav',
        age: 24,
        city: 'Dehradun',
        languages: 'Python, Java and JS',
        Speciality: 'Pentesting',
        image: 'https://randomuser.me/api/portraits/men/53.jpg'
    }
]

// CV Iterator
cvIterator=(profiles)=>{
    let nextIndex = 0;
    return{
        next: ()=>{
            return nextIndex < profiles.length ?
            {value: profiles[nextIndex++], done: false} :
            {done: true}
        }
    };
}

const candidates = cvIterator(data);

// Button listen for next button
let button = document.getElementById("next");
button.addEventListener('click',nextCV);
function nextCV(){
    let currentCandidate = candidates.next().value;
    let image = document.getElementById("image")
    if(currentCandidate != undefined){
        image.innerHTML = `<img src='${currentCandidate.image}'>`
        profile.innerHTML = `<ul class="list-group">
        <li class="list-group-item">Name: ${currentCandidate.name}</li>
        <li class="list-group-item">${currentCandidate.age} years old</li>
        <li class="list-group-item">Lives in ${currentCandidate.city}</li>
        <li class="list-group-item">Primarily works on ${currentCandidate.language}</li>
        <li class="list-group-item">Speciality: ${currentCandidate.Speciality}</li>
      </ul>`
    }
    else{
        alert("No more candidates");
        window.location.reload();
    }
}
nextCV();