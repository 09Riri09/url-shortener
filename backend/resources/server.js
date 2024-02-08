exports.main = async function(event, context) {
  console.log("Path:", event.path)

  if (event.httpMethod == 'GET' && event.path == "/google") {
    return {
          statusCode: 302,
          headers: {
            Location: 'https://google.com'
          },
    };
  } else if (event.httpMethod == 'GET' && event.path == "/facebook") {
    return {
          statusCode: 302,
          headers: {
            Location: 'https://facebook.com'
          },
    };
  }
  return {
      statusCode: 404,
      headers: {},
      body: "Not found"
    };
}