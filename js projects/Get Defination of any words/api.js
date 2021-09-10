console.log("Word-Api is working");
let word = document.getElementById('word')
let popBtn = document.getElementById('fetchBtn');
fetchBtn.addEventListener('click',fetchDetails);
function fetchDetails(e){
    console.log("Button is working properly");

    // Get the data from server and show it in the console

// Instantiate an xhr request
const xhr = new XMLHttpRequest();

let str = word.value;
// Opent the object
xhr.open('GET','https://api.dictionaryapi.dev/api/v2/entries/en/' + str,true);
// xhr.getResponseHeader('Conten-type','application/json');


// // What to do on progress
xhr.onprogress = function(){
    console.log('On progress');
}

// Do this shit after geting response from the server
xhr.onload = function(){
    if(this.status === 200){
        // console.log(this.responseText);
        let wordObj = JSON.parse(this.responseText);
        let definition = document.getElementById('definition');
        console.log(wordObj);
        html = ``;
        for(key in wordObj){
            // console.log(wordObj[key]);
            meanings = wordObj[key]
            for(key in meanings){
                // console.log(meanings[key]);
                meaning = meanings[key];
                for(key in meaning){
                    // console.log(meaning[key]);
                    WordDefinitions = meaning[key];
                    for(key in WordDefinitions){
                        // console.log(WordDefinitions[key]);
                        Worddefinition = WordDefinitions[key];
                        for(key in Worddefinition){
                            html = Worddefinition[key].definition;
                            definition.innerHTML = html;
                        }
                    }
                }
            }
        }

    }
    else{
        console.log("Word is not found");
    }
}

// Send the xhr request
xhr.send();

e.preventDefault();
}

