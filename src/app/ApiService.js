const GRAPHQL_ENDPOINT = 'https://codefact.udea.edu.co/modulo-15/graphql';

/**
 * Método genérico para realizar solicitudes GraphQL.
 * @param {string} query - La consulta o mutación GraphQL.
 * @param {object} variables - Las variables opcionales para la consulta o mutación.
 * @returns {Promise<any>} - La respuesta del servidor GraphQL.
 */
export const executeGraphQL = async (query, variables = {}) => {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    const { data, errors } = await response.json();
    if (errors) {
      console.error('GraphQL Errors:', errors);
      throw new Error('Error al ejecutar la operación GraphQL');
    }
    return data;
  } catch (error) {
    console.error('Error al ejecutar la solicitud:', error);
    throw error;
  }
};
