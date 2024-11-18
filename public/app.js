const API_URL = 'http://localhost:3000/api';

// Referencias a los elementos del DOM
const createForm = document.getElementById('create-form');
const incidenciasList = document.getElementById('incidencias-list');

// Función para cargar todas las incidencias
async function loadIncidencias() {
  const response = await fetch(`${API_URL}/read`);
  const incidencias = await response.json();

  incidenciasList.innerHTML = '';
  incidencias.forEach((incidencia) => {
    let estadoColor = '';
    if (incidencia.estado === 'Sin resolver') {
      estadoColor = 'text-danger'; // Rojo
    } else if (incidencia.estado === 'Siendo resuelta') {
      estadoColor = 'text-warning'; // Amarillo
    } else if (incidencia.estado === 'Resuelta') {
      estadoColor = 'text-success'; // Verde
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${incidencia.id}</td>
      <td>${incidencia.empresa}</td>
      <td>${incidencia.descripcion}</td>
      <td>${incidencia.fecha}</td>
      <td class="${estadoColor}">${incidencia.estado}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="updateIncidencia(${incidencia.id})">Actualizar</button>
        <button class="btn btn-danger btn-sm" onclick="deleteIncidencia(${incidencia.id})">Eliminar</button>
        <button class="btn btn-info btn-sm" onclick="editEstado(${incidencia.id}, '${incidencia.estado}')">Editar Estado</button>
      </td>
    `;
    incidenciasList.appendChild(tr);
  });
}

// Función para registrar una nueva incidencia
createForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const empresa = document.getElementById('empresa').value;
  const descripcion = document.getElementById('descripcion').value;
  const fecha = document.getElementById('fecha').value;

  await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ empresa, descripcion, fecha })
  });

  createForm.reset();
  loadIncidencias();
});

// Función para actualizar una incidencia
async function updateIncidencia(id) {
  const newEmpresa = prompt('Nuevo nombre de la empresa:');
  const newDescripcion = prompt('Nueva descripción:');
  const newFecha = prompt('Nueva fecha (YYYY-MM-DD):');
  const newEstado = prompt('Nuevo estado (Sin resolver, Siendo resuelta, Resuelta):');

  if (newEmpresa && newDescripcion && newFecha && newEstado) {
    await fetch(`${API_URL}/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ empresa: newEmpresa, descripcion: newDescripcion, fecha: newFecha, estado: newEstado })
    });
    loadIncidencias();
  }
}

// Nueva función para cambiar solo el estado de una incidencia
async function editEstado(id, currentEstado) {
  const estados = ['Sin resolver', 'Siendo resuelta', 'Resuelta'];
  const newEstadoIndex = prompt(
    `Estado actual: ${currentEstado}\nSeleccione un nuevo estado:\n1. Sin resolver\n2. Siendo resuelta\n3. Resuelta`
  );

  let estadoSeleccionado = '';
  if (newEstadoIndex === '1') {
    estadoSeleccionado = 'Sin resolver';
  } else if (newEstadoIndex === '2') {
    estadoSeleccionado = 'Siendo resuelta';
  } else if (newEstadoIndex === '3') {
    estadoSeleccionado = 'Resuelta';
  } else {
    alert('Estado inválido');
    return;
  }

  await fetch(`${API_URL}/updateE/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado: estadoSeleccionado })
  });

  loadIncidencias();
}

// Función para eliminar una incidencia
async function deleteIncidencia(id) {
  await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
  loadIncidencias();
}

// Cargar incidencias al inicio
loadIncidencias();
