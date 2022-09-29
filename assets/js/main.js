const base_api = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=";
const key_api = "DV6KDKvpInnMAW075R5HSZtSbaa1uwme7T115NRR";
const url_api = `${base_api}${key_api}`;
const tblNasa = document.getElementById('tblNasa');
const posicion = 0;
const graph_velocity = document.getElementById('graph_velocity').getContext('2d');
const graph_orbiting = document.getElementById('graph_orbiting').getContext('2d');
const loaderContainer =document.getElementById ("loaderContainer");
const mainContainer   =document.getElementById("mainContainer");
const secondContainer =document.getElementById("secondContainer") 

function cargarDatos() {
    fetch(url_api, { method: "GET" })
        .then((response) => response.json())
        .then((result) => {
            tblNasa.innerHTML = "";

            let labels_asteroide = result.near_earth_objects.map((item) => {
                return item.name_limited.toUpperCase();
            });

            let data_velocity = result.near_earth_objects.map((item) => {
                return parseFloat(item.close_approach_data[posicion].relative_velocity.kilometers_per_second).toFixed(2);
            });

            let data_orbiting = result.near_earth_objects.map((item) => {
                return item.close_approach_data[posicion].orbiting_body;
            });

            let earth = 0;
            let juptr = 0;
            let mars = 0;
            let otro = 0;

            for(let i=0; i<data_orbiting.length; i++){
                switch (data_orbiting[i]) {
                    case 'Earth': earth++;
                        break;
                    case 'Juptr': juptr++;
                        break;
                    case 'Mars': mars++;
                        break;
                    default: otro++;
                }
            }
            let array_labels = ['Earth', 'Juptr', 'Mars','Otro'];
            let array_orbiting = [earth,juptr,mars,otro];

            const velocity = new Chart(graph_velocity, {
                type: 'bar',
                data: {
                    labels: labels_asteroide,
                    datasets: [{
                        label: 'Velocidad Relativa',
                        data: data_velocity,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            const orbiting = new Chart(graph_orbiting, {
                type: 'doughnut',
                data: {
                    labels: array_labels,
                    datasets: [{
                        label: 'Asteroide Orbitando en',
                        data: array_orbiting,
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 2,
                        hoverOffset: 4
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            for (const asteroide of result.near_earth_objects) {
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
            if (result.length == 0) {
                tblNasa.innerHTML = `<tr><td colspan="5" class="text-center">No hay datos</td></tr>`;
            }

            loaderContainer.classList.add("d-none");
            mainContainer.classList.remove("d-none");
            secondContainer.classList.remove("d-none");
        })
        .catch((error) => console.log(error));
}

cargarDatos();