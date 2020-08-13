// * Get the location of the ISS, display it on a map, and fetch and display live information about astronauts in space.

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
    .then(function renderInfo(arrayLocationNumberNames) {
        const astronautNamesAndCraft = arrayLocationNumberNames[2];
        const astronautNumber = arrayLocationNumberNames[1]
        const liHTML =[];
        function createHTML(astronautNamesAndCraft) {
            console.log("THE FUNCTION RUNS", astronautNamesAndCraft)
                astronautNamesAndCraft.forEach(element => {
                let astroName = element.name
                let craft = element.craft
                liHTML.push(`<li class=""><i class="fas fa-user-astronaut"></i>${astroName}</li>
                <li><i class="fas fa-rocket"></i>${craft}</li>`)
                console.log("ANNOUNCEMENT ANNOUNCEMENT", liHTML)
                })
            }

            createHTML(astronautNamesAndCraft);

            const finalHTML = `
                        <h2 class="card-header">Live Astronaut Tracker</h2>
                        <p class="card-title">Right now there are <span id="astronaut-numbers">${astronautNumber}</span> humans in space:</p>
                        <ul class="name-list-mount">
                            ${liHTML.map(li => {
                                return `<li>${li}</li>`
                            }).join('')}
                        </ul>
                        <div class="card-footer"><span class="time"></span></div>
                        `
                        console.log("renderInfo -> html", finalHTML)
        return infoMount.innerHTML = finalHTML;
    })
    .then(
        function displayClock(){
            const liveTime = document.querySelector('.time');
            const display = new Date().toLocaleTimeString();
            liveTime.innerHTML = display;
            setTimeout(displayClock, 1000); 
        }
    )
    .catch(function(error) {
        console.log(error);
});


    