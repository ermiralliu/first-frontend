var currentAnimal = "none"
var currentArray = [];
const sect = document.getElementById("sect");
var bodyDivArray = [];      //an array of elements which can create a modal window

get("Dog", "https://freetestapi.com/api/v1/dogs");

async function get(str, link){                   //eeee se do i rregulloj, dhe do e bej me argumenta qe te jete me general
    if(currentAnimal == str)
        return;
    try{
        var array = await fetch(link);
        array = await array.json();
        console.log(array);
        currentAnimal = str;
    }
    catch(err){
        console.error(err);
    }
                    //console.log(JSON.stringify(array));
    let view ="";
    array.forEach(element=>{  
        view += `<div class="body-div"><img class="body-img" alt="a ${str}" src="${element.image}"><table>`;
        let temp = element.image;
        delete element.image;
        for([key, value] of Object.entries(element))
            view+=`<tr><td>${key}</td><td>${value}</td></tr>`;
        view+= `</table></div>`;
        element.image = temp;
    })
    currentArray = array;
    sect.innerHTML = view;
    currentAnimal = str;
    //from here on it doesn't work, maybe cause the document hasn't processed it fully yet
    // let bodyDivArray = document.getElementsByClassName("body-div");

    // for([key,value] of Object.entries(bodyDivArray)){
    //     console.log(JSON.stringify(value));
    //     value.addEventListener("click", ()=> makeModal(array['key']));
    // }
        
}


function makeModal(object){
    let html_string = '<table>'
    for([key,value] of Object.entries(object))
        html_string += `<tr><td>${key}</td><td>${value}</td></tr>`;
    html_string += `</table>`;
    let moDiv = document.getElementById("moDiv");
    moDiv.className = "modal";
    moDiv.innerHTML = html_string;

}



const dogButton = document.getElementById("dog");
dogButton.addEventListener("click", ()=>get("Dog", "https://freetestapi.com/api/v1/dogs"));

const catButton = document.getElementById("cat");
catButton.addEventListener("click", ()=>get("Cat", "https://freetestapi.com/api/v1/cats"));

const birdButton = document.getElementById("bird");
birdButton.addEventListener("click", ()=>get("Bird", "https://freetestapi.com/api/v1/birds"))