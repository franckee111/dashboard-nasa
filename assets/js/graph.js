const base_api = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=";
const key_api = "DV6KDKvpInnMAW075R5HSZtSbaa1uwme7T115NRR";
const url_api = `${base_api}${key_api}`;
const position = 0;
const graph_velocity = document.getElementById('graph_velocity').getContext('2d');
const graph_orbiting = document.getElementById('graph_orbiting').getContext('2d');

const graphRelativeVelocity = async () => {
    try {
        const respuesta = await axios.get(url_api);
        // console.log(respuesta.data);

        let labels_asteroide = respuesta.data.near_earth_objects.map((item) => {
            return item.name_limited;
        });

        let data_velocity = respuesta.data.near_earth_objects.map((item) => {
            return parseFloat(item.close_approach_data[position].relative_velocity.kilometers_per_second).toFixed(2);
        });

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
    }
    catch (error) {
        console.log(error);
    }
};

const graphBodyOrbiting = async () => {
    try {
        const respuesta = await axios.get(url_api);

        //Asteroids orbiting in:
        let array_labels = ['Earth', 'Juptr', 'Mars', 'Other'];

        let data_orbiting = respuesta.data.near_earth_objects.map((item) => {
            return item.close_approach_data[position].orbiting_body;
        });

        let earth = 0;
        let juptr = 0;
        let mars = 0;
        let other = 0;
        const array_orbiting = [];

        for (let i = 0; i < data_orbiting.length; i++) {
            switch (data_orbiting[i]) {
                case 'Earth': earth++;
                    break;
                case 'Juptr': juptr++;
                    break;
                case 'Mars': mars++;
                    break;
                default: other++;
            }
        }

        array_orbiting.push(earth, juptr, mars, other);

        const orbiting = new Chart(graph_orbiting, {
            type: 'doughnut',
            data: {
                labels: array_labels,
                datasets: [{
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
    }
    catch (error) {
        console.log(error);
    }
};

export{graphRelativeVelocity, graphBodyOrbiting};