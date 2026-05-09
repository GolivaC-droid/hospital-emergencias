const API_URL = "https://memoapirest-dvacg8g9gvhjb6cn.canadacentral-01.azurewebsites.net/api/Pacientes";

const tablaPacientes = document.getElementById("tablaPacientes");

const formPaciente = document.getElementById("formPaciente");

const mensaje = document.getElementById("mensaje");


// OBTENER PACIENTES
async function obtenerPacientes() {

    const response = await fetch(API_URL);

    const data = await response.json();

    tablaPacientes.innerHTML = "";

    data.forEach(paciente => {

        tablaPacientes.innerHTML += `
            <tr>
                <td>${paciente.id}</td>
                <td>${paciente.nombreCompleto}</td>
                <td>${paciente.sintomas}</td>
                <td>
                    <span class="badge bg-danger">
                        ${paciente.nivelGravedad}
                    </span>
                </td>
            </tr>
        `;
    });
}


// REGISTRAR PACIENTE
formPaciente.addEventListener("submit", async (e) => {

    e.preventDefault();

    const paciente = {

        nombreCompleto:
            document.getElementById("nombreCompleto").value,

        sintomas:
            document.getElementById("sintomas").value,

        nivelGravedad:
            parseInt(document.getElementById("nivelGravedad").value),

        carnetMedico:
            document.getElementById("carnetMedico").value
    };

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(paciente)
    });


    // ERROR 401
    if (response.status === 401) {

        mensaje.innerHTML = `
            <div class="alert alert-danger">
                Médico no autorizado
            </div>
        `;

        return;
    }


    // ERROR 400
    if (response.status === 400) {

        mensaje.innerHTML = `
            <div class="alert alert-warning">
                Capacidad llena
            </div>
        `;

        return;
    }


    mensaje.innerHTML = `
        <div class="alert alert-success">
            Paciente registrado correctamente
        </div>
    `;

    formPaciente.reset();

    obtenerPacientes();

});


// INICIAR
obtenerPacientes();