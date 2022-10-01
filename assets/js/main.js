import { graphBodyOrbiting, graphRelativeVelocity } from './graph.js';

const base_api = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=";
const key_api = "DV6KDKvpInnMAW075R5HSZtSbaa1uwme7T115NRR";
const url_api = `${base_api}${key_api}`;
const tblNasa = document.getElementById('tblNasa');
const position = 0;
const loaderContainer = document.getElementById("loaderContainer");
const mainContainer = document.getElementById("mainContainer");
const secondContainer = document.getElementById("secondContainer");

function cargarDatos() {
    fetch(url_api, { method: "GET" })
        .then((response) => response.json())
        .then((result) => {
            tblNasa.innerHTML = "";

            for (const asteroide of result.near_earth_objects) {
                let tr = `<tr>
                <td> ${asteroide.id} </td>
                <td> ${asteroide.name} </td>
                <td> ${asteroide.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} min - ${asteroide.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} max </td>
                <td> ${asteroide.is_potentially_hazardous_asteroid}  </td>
                <td> ${parseFloat(asteroide.close_approach_data[position].relative_velocity.kilometers_per_second).toFixed(2)}  </td>
                <td> ${(new Date(Date.parse(asteroide.orbital_data.first_observation_date))).toLocaleDateString()}  </td>
                <td> ${asteroide.close_approach_data[position].orbiting_body}  </td>
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
}
// axios sync await
graphRelativeVelocity();
graphBodyOrbiting();
cargarDatos(); //fetch promise