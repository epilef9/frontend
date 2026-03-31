// 1. Definición de constantes (Simulación de Base de Datos)
const USUARIOS_REGISTRADOS = [
    { user: "admin@a.com", pass: "1234", nombre: "Administrador del Sistema" },
    { user: "profe", pass: "js2026", nombre: "Docente de Programación" },
    { user: "estudiante", pass: "hola", nombre: "Alumno Destacado" }
];

// Identificar en qué página estamos
const loginForm = document.getElementById('loginForm');
const greetingElement = document.getElementById('greeting');
const verListaUsuarios = document.getElementById('verListaUsuarios');
const tablaCuerpo = document.getElementById("tabla-cuerpo");
console.log(loginForm);
// --- LÓGICA PARA INDEX.HTML ---
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue
        
        const userVal = document.getElementById('email').value;
        const passVal = document.getElementById('password').value;

        // Búsqueda en el arreglo (Uso de find)
        const validUser = USUARIOS_REGISTRADOS.find(u => u.user === userVal && u.pass === passVal);

        if (validUser) {
            // Guardamos el nombre en el navegador para usarlo en la otra página
            localStorage.setItem('usuarioLogueado', validUser.nombre);
            window.location.href = 'inicio.html';
        } else {
            const error = document.getElementById('errorMsg');
            error.classList.remove('hidden');
        }
    });
}

// --- LÓGICA PARA INICIO.HTML ---
if (greetingElement) {
    // Recuperamos el dato guardado
    const nombreUsuario = localStorage.getItem('usuarioLogueado');

    if (nombreUsuario) {
        // Generación de contenido dinámico
        greetingElement.textContent = `¡Hola, ${nombreUsuario}! 👋`;
    } else {
        // Si alguien intenta entrar a inicio.html sin loguearse
        window.location.href = 'index.html';
    }
}
// Logica para ver lista de usuarios en INICIO.HTML
if (verListaUsuarios) {
    verListaUsuarios.addEventListener('click', () => {
        // limpiamos la tbla pr si ya tenia contenido
        tablaCuerpo.innerHTML = "";

        // recorremos el array de objetos de usuarios
        USUARIOS_REGISTRADOS.forEach(usuario => {
            // creamos una fila (tr) por cada objeto
            const fila = `
                <tr>
                    <td>${usuario.user}</td>
                    <td>${usuario.nombre}</td>
                </tr>
            `;
            // la agregamoms al cuerpo de la tabla
            tablaCuerpo.innerHTML += fila;
        })
    })
}