mapboxgl.accessToken = mapToken;
// mapboxgl.accessToken = 'pk.eyJ1IjoieXVsaW55dSIsImEiOiJja3N0MDNjazUxMXVzMm5tdmU4Zmhrd2h0In0.WGqGTDgQqGnJR5scRn3uFw';
console.log(campground.geometry.coordinates);
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)