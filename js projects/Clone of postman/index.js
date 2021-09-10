console.log("PostMaster JS");

// Utility Functions:
// 1. Utility function to get DOM element from string 
function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Initiliaze no of parameters
let addedParamsCount = 0;

// Hide the Parameter's box initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = 'none';

// If the user clicks on params box, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById("requestJsonBox").style.display = 'none';
    document.getElementById("parametersBox").style.display = 'block';
})

// If the user clicks on json box, hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById("parametersBox").style.display = 'none';
    document.getElementById("requestJsonBox").style.display = 'block';
})

// If the user clicks on + button, add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2}</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Key">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterValue${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Value">
                </div>
                <button class="btn btn-primary deleteParam"> - </button>
                </div>`
    // Convert the element string to DOM node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    
    // Add an event listener to remove the parameter upon clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam){
        item.addEventListener('click',(e)=>{
            e.target.parentElement.remove();
        })
    }
    addedParamsCount++;
})

// If the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    // Show please wait request in the request box to request patience from the user
    document.getElementById('responsePrism').innerHTML = "Please wait... Fetching response..."

    // Fetch all the values that user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // If the user has select all parameters instead of json collect them in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('requestJsonText').value;
    }

    // Log all the values in the console for dubugging
    console.log('URL is ', url);
    console.log('requestType is ', requestType);
    console.log('contentType is ', contentType);
    console.log('data is ', data);
    
    // If the request type is get, invoke fetch api to create a post request
    if (requestType === 'GET'){
        fetch(url,{
            method: 'GET',
        })
        .then(response=>response.text())
        .then((text)=>{
            document.getElementById('responsePrism').innerHTML = text;
        })
    }

    else{
        fetch(url,{
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response=>response.text())
        .then((text)=>{
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll()
        })
    }
});