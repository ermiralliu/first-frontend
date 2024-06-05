var currentAnimal = "none";
var lastSearched = "none";

var currentArray = [];
const sect = document.getElementById("sect");
var bodyDivArray = [];      //an array of elements which can create a modal window

get("dogs", "https://freetestapi.com/api/v1/dogs");

async function get(str, link){                   //eeee se do i rregulloj, dhe do e bej me argumenta qe te jete me general
    if(lastSearched === str )                    //stop searching if the last search was the same
        return;
    try{
        var array = await fetch(link);
        array = await array.json();
        console.log(array);
    }
    catch(err){
        
        console.error(err);
        return;
    }
                    //console.log(JSON.stringify(array));
    let view ="";
    array.forEach(element=>{  
        view += `<figure class="body-div" onclick="makeModal(${element.id})"><img class="body-img" alt="a ${currentAnimal}" src="${element.image}"/><figcaption>`;
        //let temp = element.image;         //kjo ishte qe mos te shkruaja imazhin se kartat fillestare i kishin te gjitha te dhenat
        //delete element.image;
        // for([key, value] of Object.entries(element))
        //     view+=`<tr><td>${key}</td><td>${value}</td></tr>`;
        view+=`Name:  ${element.name}<br>`
            +`Origin:  ${element.origin || element.place_of_found}`     //se origjina esht bosh per zogjt psh
            +"</figcaption></figure>";
        //element.image = temp;
    });
    currentArray = array;
    sect.innerHTML = view;
    if(str === "dogs" || str === "cats" || str === "birds")
        currentAnimal = str;                                            //to keep track of the current animal
    lastSearched = str;
    //from here on it doesn't work, maybe cause the document hasn't processed it fully yet
    let bodyDivArray = document.querySelectorAll("body-div");
    console.log(bodyDivArray);
    for(let i=0; i< bodyDivArray.length; ++i){
        bodyDivArray[i].addEventListener("click", ()=>makeModal(array[i]));
    }
}


function makeModal(id){
    object = currentArray.find( element => element.id === id);
    //currentArray[id];

    let html_string = '<table id="moTable">'
    for([key,value] of Object.entries(object))
        html_string += `<tr><td>${key}</td><td>${value}</td></tr>`;
    html_string += `</table>`;
    let moDiv = document.getElementById("mod");                 //marrim div me kte id dhe i japim klasen e cila ne css i jep vetite e duhura
    moDiv.setAttribute("onclick", "unMakeModal()")
    //moDiv.onclick = "";
    moDiv.className = "modal";
    moDiv.innerHTML = html_string;
}
function unMakeModal(){
    let moDiv = document.getElementById("mod");
    moDiv.innerHTML = "";
    moDiv.className = null;
}


const dogButton = document.getElementById("dog");
dogButton.addEventListener("click", ()=>get("dogs", "https://freetestapi.com/api/v1/dogs"));

const catButton = document.getElementById("cat");
catButton.addEventListener("click", ()=>get("cats", "https://freetestapi.com/api/v1/cats"));

const birdButton = document.getElementById("bird");
birdButton.addEventListener("click", ()=>get("birds", "https://freetestapi.com/api/v1/birds"));

const searchBar = document.getElementById("s-bar");
searchBar.addEventListener("keypress", (event)=>{
    if(event.key !== "Enter")
        return;
    get(searchBar.value, `https://freetestapi.com/api/v1/${currentAnimal}?search=${searchBar.value}`);
} );

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", ()=> get(searchBar.value, `https://freetestapi.com/api/v1/${currentAnimal}?search=${searchBar.value}`));

document.getElementById("filter").addEventListener("click", ()=>{
    if( isNaN(searchBar.value))
        return;
    get(searchBar.value, `https://freetestapi.com/api/v1/${currentAnimal}?limit=${searchBar.value}`);
});
document.getElementById("sort").addEventListener("click", ()=> get("sortaWeird" ,`https://freetestapi.com/api/v1/${currentAnimal}?sort=name&order=dec`));