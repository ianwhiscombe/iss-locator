
// * Get the location of the ISS and display on a map

const issEndPoint = 'http://api.open-notify.org/iss-now.json'

fetch(issEndPoint)
    .then(response => response.json())
    .then(function getLocationObject(data) {
        const location = data.iss_position;
        console.log("location", location)
        return location; 
    })
    .then(function convertLatToFloat(location) {
        const latNumber = parseFloat(location.latitude);
        console.log("convertLatToFloat -> latNumber", latNumber)
        location.lat = latNumber;
        console.log("convertLatToFloat -> location", location)
        return location; 
    })
    .then(function convertLngToFloat(location) {
        const lngNumber = parseFloat(location.longitude);
        console.log("convertLngToFloat -> lngNumber", lngNumber)
        location.lng = lngNumber;
        console.log("convertLngToFloat -> location", location)
        return location;   
    })
    .then(function initMap(location) {
        console.log("initMap -> location", location)
        const map = new google.maps.Map(
            document.querySelector('.map'), {zoom: 5, center: new google.maps.LatLng(location.latitude, location.longitude)}
        );
        const marker = new google.maps.Marker({
            position: location,
            map: map
        })

    })



    
    