async function handler (event, context) {
  const OK = 200

  return {
    statusCode: OK,
    body: JSON.stringify({message: "It's done!"}),
  }
}

module.exports = {handler}
