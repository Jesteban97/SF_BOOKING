import { executeGraphQL } from './ApiService';

// Crear una reserva
export const crearReserva = async (variables) => {
  const query = `
    mutation($idCliente: Int!, $idVuelo: Int!, $idPago: Int!, $telefonoContacto: Int!, $correoContacto: String!, $estadoReserva: String!, $pasajeros: [PasajeroInput!]!) {
      crearReserva(
        idCliente: $idCliente, 
        idVuelo: $idVuelo, 
        idPago: $idPago, 
        telefonoContacto: $telefonoContacto, 
        correoContacto: $correoContacto, 
        estadoReserva: $estadoReserva, 
        pasajeros: $pasajeros
      ) {
        idReserva
        idCliente
        idVuelo
        idPago
        telefonoContacto
        correoContacto
        fechaReserva
        estadoReserva
        pasajeros {
          idPasajero
          nombrePasajero
          apellidoPasajero
          tipoDocumento
          numeroDocumento
          correoContacto
          telefonoContacto
        }
      }
    }
  `;
  return executeGraphQL(query, variables);
};

// Consultar una reserva por ID
export const consultarReserva = async (idReserva) => {
  const query = `
    query {
      consultarReserva(id: ${idReserva}) {
        idReserva
        idCliente
        idVuelo
        idPago
        telefonoContacto
        correoContacto
        fechaReserva
        estadoReserva
        pasajeros {
          idPasajero
          nombrePasajero
          apellidoPasajero
          tipoDocumento
          numeroDocumento
          correoContacto
          telefonoContacto
        }
      }
    }
  `;
  return executeGraphQL(query);
};

// Consultar todas las reservas
export const listarReservas = async () => {
  const query = `
    query {
      listarReservas {
        idReserva
        idCliente
        idVuelo
        idPago
        telefonoContacto
        correoContacto
        fechaReserva
        estadoReserva
        pasajeros {
          idPasajero
          nombrePasajero
          apellidoPasajero
          tipoDocumento
          numeroDocumento
          correoContacto
          telefonoContacto
        }
      }
    }
  `;
  return executeGraphQL(query);
};

// Consultar reservas por ID cliente
export const consultarReservasPorCliente = async (idCliente) => {
  const query = `
    query {
      consultarReservasPorCliente(idCliente: ${idCliente}) {
        idReserva
        idCliente
        idVuelo
        idPago
        telefonoContacto
        correoContacto
        fechaReserva
        estadoReserva
        pasajeros {
          idPasajero
          nombrePasajero
          apellidoPasajero
          tipoDocumento
          numeroDocumento
          correoContacto
          telefonoContacto
        }
      }
    }
  `;
  return executeGraphQL(query);
};

// Modificar pasajeros
export const editarPasajeros = async (variables) => {
  const query = `
    mutation editarPasajeros($idReserva: ID!, $pasajeros: [PasajeroEditInput!]!) {
      editarPasajeros(idReserva: $idReserva, pasajeros: $pasajeros) {
        idReserva
        pasajeros {
          idPasajero
          nombrePasajero
          apellidoPasajero
          tipoDocumento
          numeroDocumento
          correoContacto
          telefonoContacto
        }
      }
    }
  `;
  return executeGraphQL(query, variables);
};

// Gestionar datos de contacto
export const editarContactoReserva = async (variables) => {
  const query = `
    mutation editarContactoReserva($idReserva: ID!, $telefonoContacto: Int!, $correoContacto: String!) {
      editarContactoReserva(idReserva: $idReserva, telefonoContacto: $telefonoContacto, correoContacto: $correoContacto) {
        idReserva
        telefonoContacto
        correoContacto
      }
    }
  `;
  return executeGraphQL(query, variables);
};

// Cancelar reserva
export const cancelarReserva = async (idReserva) => {
  const query = `
    mutation {
      cancelarReserva(idReserva: ${idReserva}) {
        idReserva
        estadoReserva
      }
    }
  `;
  return executeGraphQL(query);
};
