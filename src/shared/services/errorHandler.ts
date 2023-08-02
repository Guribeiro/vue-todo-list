export const errorHandler = (error: any) => {
  let message;

  if (error.response) {
    message = error.response.data.message || 'Alguma coisa deu errado no servidor'
  } else if (error.request) {
    message = 'Sem resposta do servidor'
  } else if (error.isAxiosError) {
    message = error.response?.data.message || error.response?.statusText
  } else {
    message = error.message || 'Alguma coisa deu errado'
  }

  return message
}
