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
        view += `<figure class="body-div" >
                <img onclick="makeModal(${element.id})" class="body-img" alt="a ${currentAnimal}" src="${element.image}"/>
                <figcaption>
                Name:  ${element.name}<br>
                Origin:  ${element.origin || element.place_of_found}     
                </figcaption></figure>`;
    });                                     // Origin me OR, se origjina esht bosh per zogjt psh
    currentArray = array;
    sect.innerHTML = view;
    if(str === "dogs" || str === "cats" || str === "birds")
        currentAnimal = str;                                            //to keep track of the current animal
    lastSearched = str;
    //from here on it doesn't work, maybe cause the document hasn't processed it fully yet
}


function makeModal(id){
    object = currentArray.find( element => element.id === id);
    //currentArray[id];

    let html_string = '<table id="moTable">'
    for([key,value] of Object.entries(object))
        html_string += `<tr><td>${key}</td><td>${value}</td></tr>`;
    html_string += `</table>`;
    modalWindow(html_string);
}
function modalWindow(str){
    let moDiv = document.getElementById("mod");                 //marrim div me kte id dhe i japim klasen e cila ne css i jep vetite e duhura
    moDiv.setAttribute("onclick", "unMakeModal()")
    //moDiv.onclick = "";
    moDiv.className = "modal";
    moDiv.innerHTML = str;
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

document.getElementById("search-button").addEventListener("click", ()=> get(searchBar.value, `https://freetestapi.com/api/v1/${currentAnimal}?search=${searchBar.value}`));

document.getElementById("filter").addEventListener("click", ()=>{
    if( isNaN(searchBar.value))
        return;
    get(searchBar.value, `https://freetestapi.com/api/v1/${currentAnimal}?limit=${searchBar.value}`);
});
document.getElementById("sort").addEventListener("click", ()=> get("sortaWeird" ,`https://freetestapi.com/api/v1/${currentAnimal}?sort=name&order=dec`));

document.getElementById("about").addEventListener("click", ()=> modalWindow(`<div><h2>About Us</h2><p> Welcome to <b>Example</b> 
    where we share information related to Animal Gallery. 
    We're dedicated to providing you the very best information and knowledge of the above mentioned topics.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>
`));
document.getElementById("contact").addEventListener("click", ()=> modalWindow(`<div><h2>Contacts</h2><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
    non   proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p> Email: mirialliu@gmail.com <br>
        Phone: +355 6x xx xx xxx
    </p>
    </div>
`));

window.addEventListener("wheel", event=>{
    sect.scrollLeft += event.deltaY;
});