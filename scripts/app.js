// get the location of ISS
// post the coordinates to maps api
// get the map back

const issEndPoint = 'http://api.open-notify.org/iss-now.json'

const issLocation = [];
console.log("issLocation", issLocation)

fetch(issEndPoint)
    .then(response => response.json())
    .then(data => issLocation.push(data.iss_position))
    // .then(console.log(issLocation))
// issLocation is an array that contains one object that contains two properties, latitude and longitude with a number in string format.
// I now need to change the name of the properties to lat and lng to match the google api requirements.
console.log("issLatLng", issLatLng)


    
    