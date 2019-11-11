export const success = body => {
  return buildResponse(body)
}

export const failure = body => {
  return buildResponse(body)
}

const buildResponse = body => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(body)
  }
}
