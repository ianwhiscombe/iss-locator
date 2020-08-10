
// * Get the location of the ISS and display on a map

const issEndPoint = 'http://api.open-notify.org/iss-now.json'

const satelliteIcon = '/assets/icons/satellites.svg'

fetch(issEndPoint)
    .then(response => response.json())
    .then(function getLocationObject(data) {
        const location = data.iss_position;
        console.log("location", location)
        return location; 
    })
    // the maps api is expecting this: { long: number, lat: number} the iss api is giving me this: { longitude: string, latitude: string }, the next two functions do the conversion from string to floating point numbers, create new keys with the correct names, and assign the results to the exisiting location object. 
    // i'm doing the above as I was getting an error for maps.Marker in the initMap function as the propeties weren't numbers for the position method.

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
            document.querySelector('.map'), {zoom: 4, center: new google.maps.LatLng(location.latitude, location.longitude)}
        );
        
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: satelliteIcon,
            animation: google.maps.Animation.DROP
        })
    })
    .catch(function(error) {
        console.log(error);
});


    