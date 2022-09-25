console.log("Entró al main JS");

const base_api = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=";
const key_api = "DV6KDKvpInnMAW075R5HSZtSbaa1uwme7T115NRR";
const url_api = `${base_api}${key_api}`;
const tblNasa = document.getElementById('tblNasa');
const posicion = 0;

fetch(url_api, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
        tblNasa.innerHTML = "";
        // console.log(data);
        // console.log(data.near_earth_objects[0].id);
        // console.log(data.near_earth_objects[0].name);
        // console.log(`${data.near_earth_objects[0].estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} mín - ${data.near_earth_objects[0].estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} max`);
        // console.log(data.near_earth_objects[0].is_potentially_hazardous_asteroid);
        // console.log(parseFloat(data.near_earth_objects[0].close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(2) );

        // console.log((new Date(Date.parse(data.near_earth_objects[0].orbital_data.first_observation_date))).toLocaleDateString());
        // console.log(data.near_earth_objects[0].orbital_data.first_observation_date);
        // console.log(data.near_earth_objects[0].orbital_data.first_observation_date.substr(0,4));
        // console.log(data.near_earth_objects[0].orbital_data.first_observation_date.substr(5,2));
        // console.log(data.near_earth_objects[0].orbital_data.first_observation_date.substr(8,2));
        // console.log(data.near_earth_objects[0].close_approach_data[0].orbiting_body);

        for (let i = 0; i < data.near_earth_objects.length; i++) {
            console.log(data.near_earth_objects[i].id);
            console.log(data.near_earth_objects[i].name);
            console.log(`${data.near_earth_objects[i].estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} mín - ${data.near_earth_objects[i].estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} max`);
            console.log(data.near_earth_objects[i].is_potentially_hazardous_asteroid);
            console.log(parseFloat(data.near_earth_objects[i].close_approach_data[posicion].relative_velocity.kilometers_per_second).toFixed(2));
            console.log((new Date(Date.parse(data.near_earth_objects[i].orbital_data.first_observation_date))).toLocaleDateString());
            console.log(data.near_earth_objects[i].close_approach_data[posicion].orbiting_body);
        }

        
    })
    .catch((error) => console.log(error));

// const ctx = document.getElementById('myChart').getContext('2d');
// const myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });