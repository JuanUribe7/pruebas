<template>
    <section class="home">
        <div class="overlay"></div>
        <div class="navar">
            <div class="text">
                <h1 class="titulo">{{ displayedText }}</h1>
            </div>

            <div class="actions">
                <button class="notification-btn">
                    <i class='bx bx-bell'></i>
                </button>
            </div>
        </div>

        <div class="content">
            <div class="group">
                <label for="device-select">Seleccione un dispositivo:</label>
                <select id="device-select" v-model="selectedDevice">
                    <option v-for="device in devices" :key="device._id" :value="device">
                        {{ device.deviceName }}
                    </option>
                </select>
            </div>

            <button @click="generarG">Generar Reporte</button>

            <table>
                <thead>
                    <tr>
                        <th>Notificación</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="report in reportData" :key="report.fecha">
                        <td>{{ report.notificacion }}</td>
                        <td>{{ report.fecha }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';

const displayedText = ref("");
const dropdownOpen = ref(false);
const fullText = "Navify";
let currentIndex = 0;
let isDeleting = false;
let typingInterval;
const isDownloading = ref(false);

const devices = ref([]);
const selectedDevice = ref(null);

const reportData = ref([
    { notificacion: "Alerta de velocidad", fecha: "2023-10-01" },
    { notificacion: "Entrada a geozona", fecha: "2023-10-02" },
    { notificacion: "Alerta de batería baja", fecha: "2023-10-03" },
    { notificacion: "Reporte de actividad", fecha: "2023-10-04" },
    { notificacion: "Salida de geozona", fecha: "2023-10-05" },
    { notificacion: "Alerta de conexión", fecha: "2023-10-06" }
]);

const typeEffect = () => {
    const current = currentIndex;

    if (!isDeleting && current < fullText.length) {
        displayedText.value = fullText.slice(0, current + 1);
        currentIndex++;
        if (currentIndex === fullText.length) {
            typingInterval = setTimeout(() => {
                isDeleting = true;
                typeEffect();
            }, 5000);
            return;
        }
    } else if (isDeleting && current > 0) {
        displayedText.value = fullText.slice(0, current - 1);
        currentIndex--;
    } else {
        isDeleting = false;
        currentIndex = 0;
    }

    const typingSpeed = isDeleting ? 100 : 200;
    typingInterval = setTimeout(typeEffect, typingSpeed);
};

const cargarDispositivos = async () => {
    try {
        const response = await axios.get('http://3.12.147.103/devices');
        devices.value = response.data;
    } catch (error) {
        console.error('Error al cargar dispositivos:', error);
    }
};

const generarG = () => {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (!selectedDevice.value) {
        Swal.fire({
            title: "Error",
            text: "Por favor, seleccione un dispositivo.",
            icon: "warning"
        });
        return;
    }

    // Lógica para generar el reporte
};

onMounted(() => {
    typeEffect();
    cargarDispositivos();
});

onUnmounted(() => {
    clearTimeout(typingInterval);
});
</script>



<style scoped>
.home {
    min-height: 160vh;
}

.home .navar {
    background-color: var(--sidebar-color);
    border-bottom: 3px solid var(--body-color);
}

.home .text {
    position: relative;
    z-index: 2;
}

.home .actions {
    display: flex;
    align-items: center;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropbtn {
    background-color: var(--sidebar-color);
    color: var(--text-colar);
    padding: 10px 15px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    border-radius: 5px;
    transition: background-color 0.3s, box-shadow 0.3s;
}

.dropbtn:hover {
    background-color: var(--body-color);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.dropdown-content {
    display: none;
    position: absolute;
    margin-right: 30px;
    background-color: var(--sidebar-color);
    min-width: 200px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    z-index: 1;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(-10px);
}

.dropdown-content.show {
    display: block;
    opacity: 1;
    transform: translateY(0);
}

.dropdown-item {
    color: var(--text-colar);
    padding: 12px 16px;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: background-color 0.2s, transform 0.2s;
}

.dropdown-item:hover {
    background-color: var(--body-color);
    transform: translateX(5px);
    color: var(--text-colar);
}

.dropdown-item i {
    margin-right: 12px;
    font-size: 1.2em;
    width: 20px;
    text-align: center;
}

.dropdown-item span {
    font-weight: 500;
}

/* Separador entre elementos */
.dropdown-item:not(:last-child) {
    border-bottom: 1px solid rgba(var(--text-colar-rgb), 0.1);
}

.actions {
    display: flex;
    align-items: center;
}

.notification-btn {
    background: none;
    border: none;
    color: var(--text-colar);
    font-size: 1.7rem;
    cursor: pointer;
    margin-right: 15px;
    margin-top: 10px;
    position: relative;
}

.notification-indicator {
    position: absolute;
    right: -1px;
    width: 15px;
    height: 15px;
    background-color: var(--text-colar);
    border-radius: 50%;
}

.titulo {
    display: inline-block;
    min-width: 100px;
    /* Ajusta según sea necesario */
}

.titu {
    margin-left: 50px;
    margin-top: 40px;
    display: flex;
    color: var(--text-colar);
}

.tabla {
    margin: 20px auto;
    width: 90%;

}

.tabla table {
    width: 100%;
    border: 1px solid var(--text-colar);
    border-radius: 10px;
    border: none;
    border-collapse: collapse;
}

.tabla th,
.tabla td {
    border: 1px solid var(--text-colar);
    padding: 10px;
    text-align: center;
}

.tabla th {
    background-color: var(--sidebar-color);
    color: var(--text-colar);
}

.tabla tr td {
    color: var(--text-colar)
}

.tabla tr:nth-child(even) {
    background-color: rgba(var(--text-colar-rgb), 0.1);
}

.tabla tr:hover {
    background-color: var(--body-color);
}

.search-container {
    margin: 20px 0px 0px 70px;
    position: relative;

}

.search-input {
    width: 20%;
    padding: 10px 10px 10px 40px;
    border: 2px solid var(--text-colar);
    border-radius: 8px;
    outline: none;
    background-color: var(--body-color);
    color: var(--text-color);
    transition: .3s ease;
}

.search-input::placeholder {
    color: var(--text-color);
}

.icon {
    position: absolute;
    left: 1rem;
    fill: var(--text-color);
    width: 1rem;
    height: 1rem;
    font-size: 21px;
    top: 50%;
    transform: translateY(-50%);
}

/* From Uiverse.io by andrew-demchenk0 */ 
.button {
  position: relative;
  width: 150px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 2px solid var(--text-colar);
  box-shadow: 4px 4px var(--text-colar);
  background-color: var(--sidebar-color);
  border-radius: 10px;
  overflow: hidden;
  color: var(--text-colar);
}

.button, .button__icon, .button__text {
  transition: all 0.3s;
}

.button .button__text {
  transform: translateX(22px);
  color: var(--text-colar);
  font-weight: 600;
}

.button .button__icon {
  position: absolute;
  transform: translateX(109px);
  height: 100%;
  width: 39px;
  background-color: var(--body-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.button .svg {
  width: 20px;
  fill: var(--text-colar);
}

.button:hover {
  background: var(--body-color);
}

.button:hover .button__text {
  color: transparent;
}

.button:hover .button__icon {
  width: 148px;
  transform: translateX(0);
}

.button:active {
  transform: translate(3px, 3px);
  box-shadow: 0px 0px var(--main-color);
}

.group {
    display: flex;
    justify-content: space-between;
    width: 94%;
}
</style>