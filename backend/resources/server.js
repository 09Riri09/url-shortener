import { PutItemCommand, GetItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const handler = async function(event, context) {
  console.log("Path:", event.path)
  if (event.httpMethod == 'GET' && event.path.startsWith("/short")) {
    // Split the string by '/'
    let parts = event.path.split('/');
    let shortUrl = parts[parts.length - 1];
    const command = new GetItemCommand({
      TableName: "UrlMapping",
      Key: {
        short_form: { S: shortUrl },
      }})
    const response = await client.send(command);
    if (!response.hasOwnProperty('Item')) {
      return {
          statusCode: 404,
          body: "Short URL not found"
      };
    }
    return {
          statusCode: 302,
          headers: {
            Location: response.Item.long_form.S
          },
    };
  } else if (event.httpMethod == 'POST' && event.path.startsWith("/add-url")) {
    const body = JSON.parse(event.body)
    if (!body.hasOwnProperty("url")) {
      return {
        statusCode: 400,
        headers: {},
        body: "Input should contain the url field"
      };
    }
    const url = body["url"]
    const shortUrl = Math.random().toString(36).substring(2,10);
    const command = new PutItemCommand({
      TableName: "UrlMapping",
      Item: {
        short_form: { S: shortUrl },
        long_form: { S: url },
      }
    });
    await client.send(command)
    return {
      statusCode: 200,
      headers: {},
      body: JSON.stringify({"shortUrl": shortUrl})
    };
  }
  return {
      statusCode: 404,
      headers: {},
      body: "Not found"
  };
}