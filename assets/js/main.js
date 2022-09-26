const base_api = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=";
const key_api = "DV6KDKvpInnMAW075R5HSZtSbaa1uwme7T115NRR";
const url_api = `${base_api}${key_api}`;
const tblNasa = document.getElementById('tblNasa');
const posicion = 0;

function cargarDatos(){
fetch(url_api, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
        tblNasa.innerHTML = "";
        for(const asteroide of data.near_earth_objects){
            let tr = `<tr>
                <td> ${asteroide.id} </td>
                <td> ${asteroide.name} </td>
                <td> ${asteroide.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} min - ${asteroide.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} max </td>
                <td> ${asteroide.is_potentially_hazardous_asteroid}  </td>
                <td> ${parseFloat(asteroide.close_approach_data[posicion].relative_velocity.kilometers_per_second).toFixed(2)}  </td>
                <td> ${(new Date(Date.parse(asteroide.orbital_data.first_observation_date))).toLocaleDateString()}  </td>
                <td> ${asteroide.close_approach_data[posicion].orbiting_body}  </td>
            </tr>`;
            tblNasa.innerHTML += tr;
        }
        if(data.length == 0){
            tblNasa.innerHTML = `<tr><td colspan="5" class="text-center">No hay datos</td></tr>`;
        }        
    })
    .catch((error) => console.log(error));
}

cargarDatos();

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