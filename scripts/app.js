// * Get the location of the ISS and display on a map

const issEndPoint = 'http://api.open-notify.org/iss-now.json'
const astronautsEndPoint = 'http://api.open-notify.org/astros.json'
const satelliteIcon = '/assets/icons/satellites.svg'
const infoMount = document.querySelector('.info-mount')

Promise.all([
    fetch(issEndPoint),
    fetch(astronautsEndPoint)
]).then(function(responses) {
    return Promise.all(responses.map(response => response.json()))
})
    .then(function getLocationNumberAndNames(data) {
        console.log("getLocationNumberAndNames -> data", data)
        
        const location = data[0].iss_position;
        console.log("getLocationNumberAndNames -> location", location)
        
        const numberOfAstronauts = data[1].number;
        console.log("getLocationNumberAndNames -> numberOfAstronauts", numberOfAstronauts)
        
        const nameAndSpacecraft = data[1].people;
        console.log("getLocationNumberAndNames -> nameAndSpacecraft", nameAndSpacecraft)
        
        
        return arrayLocationNumberNames = [location, numberOfAstronauts, nameAndSpacecraft]; 
    })
    // the maps api is expecting this: { long: number, lat: number} the iss api is giving me this: { longitude: string, latitude: string }, the next two functions do the conversion from string to floating point numbers, create new keys with the correct names, and assign the results to the exisiting location object. 
    // i'm doing the above as I was getting an error for maps.Marker in the initMap function as the propeties weren't numbers for the position method.

    .then(function convertLatToFloat(arrayLocationNumberNames) {
        console.log("convertLatToFloat -> arrayLocationNumberNames", arrayLocationNumberNames)
        const latNumber = parseFloat(arrayLocationNumberNames[0].latitude);
        console.log("convertLatToFloat -> latNumber", latNumber)
        arrayLocationNumberNames[0].lat = latNumber;
        console.log("convertLatToFloat -> arrayLocationNumberNames0", arrayLocationNumberNames[0])
        return arrayLocationNumberNames; 
    })
    .then(function convertLngToFloat(arrayLocationNumberNames) {
        console.log("convertLngToFloat -> arrayLocationNumberNames", arrayLocationNumberNames)
        const lngNumber = parseFloat(arrayLocationNumberNames[0].longitude);
        console.log("convertLngToFloat -> lngNumber", lngNumber)
        
        arrayLocationNumberNames[0].lng = lngNumber;
        console.log("convertLngToFloat -> arrayLocationNumberNames[0]", arrayLocationNumberNames[0])
        
        return arrayLocationNumberNames;   
    })
    .then(function initMap(arrayLocationNumberNames) {
        console.log("initMap -> location", arrayLocationNumberNames)
        const map = new google.maps.Map(
            document.querySelector('.map'), {zoom: 4, center: new google.maps.LatLng(arrayLocationNumberNames[0].lat, arrayLocationNumberNames[0].lng)}
        );
        
        const marker = new google.maps.Marker({
            position: arrayLocationNumberNames[0],
            map: map,
            icon: satelliteIcon,
            animation: google.maps.Animation.DROP
        })

        return arrayLocationNumberNames;
    })
    // .then(function renderInfo(arrayLocationNumberNames) {
    //         console.log("renderInfo -> arrayLocationNumberNames", arrayLocationNumberNames)
            
    //                 arrayLocationNumberNames[2].forEach(element => {
    //                 let astroName = element.name
    //                 console.log("astroName", astroName)
    //                 let craft = element.craft
    //                 console.log("craft", craft)
    //                 const liHTML = `<li>${astroName} is currently on board the ${craft}.</li>`
    //                 console.log("liHTML", liHTML)        
    //         });
    //         return liHTML;  
    //     })
    //     .then(function writeHTML(liHTML) {
    //     console.log("writeHTML -> liHTML", liHTML)
    //     console.log("writeHTML -> array", arrayLocationNumberNames)
            
    //     })
    // .then(function renderInfo(arrayLocationNumberNames) {
    //     const astronautNamesAndCraft = arrayLocationNumberNames[2];
    //     console.log("astronautNamesAndCraft", astronautNamesAndCraft)
    //     const astronautNumber = arrayLocationNumberNames[1]
    //     console.log("renderInfo -> astronautNumber", astronautNumber)
        
    //     const html = function createHTML(astronautNamesAndCraft) {
    //             astronautNamesAndCraft.forEach(element => {
    //             let astroName = element.name
    //             console.log("astroName", astroName)
    //             let craft = element.craft
    //             console.log("craft", craft)
    //             const liHTML = `<li>${astroName} is currently on board the ${craft}.</li>`
    //             console.log("liHTML", liHTML)
                
    //             const finalHTML = `
    //                     <h2>Humans in Space</h2>
    //                     <p>There are currently <span id="astronaut-numbers">${astronautNumber}</span> humans in space.</p>
    //                     <ul class="name-list-mount">
    //                         ${liHTML}
    //                     </ul>
    //                     `
    //             console.log("createHTML -> finalHTML", finalHTML)
    //             return finalHTML;        

    //     });
        
    //     }
    //     infoMount.innerHTML = html(astronautNamesAndCraft);
    //     console.log("renderInfo -> html", html(astronautNamesAndCraft))
    // })
    .then(function renderInfo(arrayLocationNumberNames) {
        const astronautNamesAndCraft = arrayLocationNumberNames[2];
        const astronautNumber = arrayLocationNumberNames[1]
        const liHTML =[];
        function createHTML(astronautNamesAndCraft) {
            console.log("THE FUNCTION RUNS", astronautNamesAndCraft)
                astronautNamesAndCraft.forEach(element => {
                let astroName = element.name
                let craft = element.craft
                liHTML.push(`<li><i class="fas fa-user-astronaut"></i>${astroName}</li>
                <li><i class="fas fa-rocket"></i>${craft}</li>`)
                console.log("ANNOUNCEMENT ANNOUNCEMENT", liHTML)
                })
            }

            createHTML(astronautNamesAndCraft);

            const finalHTML = `
                        <h2>Live Astronaut Tracker</h2>
                        <p>Right now there are <span id="astronaut-numbers">${astronautNumber}</span> humans in space.</p>
                        <ul class="name-list-mount">
                            ${liHTML.map(li => {
                                return `<li>${li}</li>`
                            }).join('')}
                        </ul>
                        `
                        console.log("renderInfo -> html", finalHTML)
        return infoMount.innerHTML = finalHTML;
    })
    .catch(function(error) {
        console.log(error);
});
    