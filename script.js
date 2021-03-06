// async function getPlayers(variable) {
//     const response = await fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2020&team_ids[]=${variable}&page=2`);
//     const data = await response.json();
//     for (i=0; i<data.data.length; i++){
//         console.log(data.data[i]);
//     }    
// }

// getPlayers(28);

let playerArmLeft= document.getElementById("player-arm-left");
let playerArmRight=document.getElementById("player-arm-right");
let playerLegLeft=document.getElementById("player-leg-left");
let playerLegRight=document.getElementById("player-leg-right");
let playerBody=document.getElementById("player-body");
let playerBall=document.getElementById("player-ball");

let svgHeight = document.getElementById("height-svg");
let playerHeightFeet = document.querySelector(".feet");
let playerHeightInches = document.querySelector(".inches");
let playerWeight = document.querySelector(".weight");

async function getPlayerHeight(event){
    let dataSearch = document.querySelector("#player-search-result");    
    
    while(dataSearch.firstChild){ //clears old search area when new search is made
        dataSearch.removeChild(dataSearch.firstChild);               
    }

    event.preventDefault(); //prevent 'submit' default action
    const name = document.querySelector('input[name="name"]').value;
    const response = await fetch (`https://www.balldontlie.io/api/v1/players?search=${name}&per_page=100`);
    const data = await response.json();
    console.log(data);
    
    for(i=0; i<data.data.length; i++){
        let dataSearchCreate = document.createElement("p");
        dataSearch.appendChild(dataSearchCreate);
        
        if(data.data[i].height_feet != null){   
            let feetToInches=(data.data[i].height_feet*12+(data.data[i].height_inches))/72;
            let convertYScale = (feetToInches-(2*feetToInches))*7.5
            let weightToScale = data.data[i].weight_pounds/190;
            let weightToDisplace=data.data[i].weight_pounds/200;
            console.log(feetToInches);              
            dataSearchCreate.innerText= data.data[i].first_name + " " + data.data[i].last_name + " is " + data.data[i].height_feet + " foot " + data.data[i].height_inches + " inches " + "and plays for the " + data.data[i].team.full_name+".";
            
            // gsap.to(playerArmLeft, {duration: 1, ease:"none", transformOrigin:"top", scaleY:feetToInches});
            // // gsap.to(playerArmLeft, {duration: 1, ease:"none", transformOrigin:"center", scaleX:weightToScale});
            // gsap.to(playerArmRight, {duration: 1, ease:"none", transformOrigin:"top", scaleY:feetToInches});
            // // gsap.to(playerArmRight, {duration: 1, ease:"none", transformOrigin:"center", scaleX:weightToScale});
            // gsap.to(playerLegLeft, {duration: 1, ease:"none", transformOrigin:"top", scaleY:feetToInches});
            // gsap.to(playerLegRight, {duration: 1, ease:"none", transformOrigin:"top", scaleY:feetToInches});
            // // gsap.to("#player-body", {y:convertYScale, duration: 1.5});
            gsap.to("#Layer_1",{duration: 1, ease:"none", transformOrigin:"bottom", scaleY:feetToInches, scaleX:weightToScale});
            // gsap.to(svgHeight, { duration: 1, ease: "none", transformOrigin:"left bottom", scaleY:feetToInches, scaleX:weightToScale} );
            playerHeightFeet.innerText = data.data[i].height_feet;
            playerHeightInches.innerText = data.data[i].height_inches;
            playerWeight.innerText = data.data[i].weight_pounds;

        } else {
            dataSearchCreate.innerText= "There is no height data for " + data.data[i].first_name + " " + data.data[i].last_name
        }

    }    
}

document.querySelector("#player-search").addEventListener("submit", getPlayerHeight);

// async function fetchAllPages(url) {
//     const data = [];
//     const name = document.querySelector('input[name="name"]').value;

//     do {
//         // let response = fetch(url);
//         const response = await fetch (`https://www.balldontlie.io/api/v1/players?search=${name}&per_page=100`);
//         url = response.next;
//         data.push(...response.results);
//     } while ( url );

//     return data;
// }

window.odometerOptions = {
    animation: 'count',
    format: 'dd'
};


