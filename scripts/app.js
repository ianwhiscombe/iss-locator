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
        const location = data[0].iss_position;
        const numberOfAstronauts = data[1].number;
        const nameAndSpacecraft = data[1].people;
        return arrayLocationNumberNames = [location, numberOfAstronauts, nameAndSpacecraft]; 
    })
    .then(function convertLatToFloat(arrayLocationNumberNames) {
        const latNumber = parseFloat(arrayLocationNumberNames[0].latitude);
        arrayLocationNumberNames[0].lat = latNumber;
        return arrayLocationNumberNames; 
    })
    .then(function convertLngToFloat(arrayLocationNumberNames) {
        const lngNumber = parseFloat(arrayLocationNumberNames[0].longitude);
        arrayLocationNumberNames[0].lng = lngNumber;
        return arrayLocationNumberNames;   
    })
    .then(function initMap(arrayLocationNumberNames) {
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
                astronautNamesAndCraft.forEach(element => {
                let astroName = element.name
                let craft = element.craft
                liHTML.push(`<li class=""><i class="fas fa-user-astronaut"></i>${astroName}</li>
                <li><i class="fas fa-rocket"></i>${craft}</li>`)
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


    