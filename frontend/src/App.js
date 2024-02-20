import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, Form, Button, Alert } from "react-bootstrap";
import "./App.css";
import axios from "axios";

function App() {
  const [copied, setCopied] = useState(false);
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [tinyUrl, setTinyUrl] = useState(""); 
  const handleInputChange = (e) => {
    setLongUrl(e.target.value);
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  const shortenUrlWithCustomAPI = () => {
    axios
      .post(
        "https://wj6p6ektw9.execute-api.eu-west-1.amazonaws.com/prod/add-url/",
        { url: longUrl }
      )
      .then((response) => {
        setShortUrl(
          `https://wj6p6ektw9.execute-api.eu-west-1.amazonaws.com/prod/short/${response.data.shortUrl}`
        );
      })
      .catch((error) => console.error("Error with custom API", error));
  };

  const shortenUrlWithTinyURL = () => {
    const tinyURLApiEndpoint = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(
      longUrl
    )}`;
    axios
      .get(tinyURLApiEndpoint)
      .then((response) => {
        setTinyUrl(response.data);
      })
      .catch((error) => console.error("Error with TinyURL API", error));
  };

  const shortenUrl = () => {
    shortenUrlWithCustomAPI();
    shortenUrlWithTinyURL();
    setCopied(false); 
  };

  return (
    <>
      <div className="title-section">
        <h1>URL SHORTENER (kinda)</h1>
        <p>Created by RaresDev, using React and Bootstrap components for the frontend and AWS and Javascript for the backend.</p>
      </div>
      <div className="input-section">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Paste your URL here"
            aria-label="Long-URL"
            aria-describedby="basic-addon2"
            onChange={handleInputChange}
            value={longUrl}
          />
          <div className="btn-wrapper">
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={shortenUrl}
            >
              Shorten URL
            </Button>
          </div>
        </InputGroup>
      </div>

      <div className="output-section">
        <Alert variant="success" className="text-center">
          <Alert.Heading>Your shortened URL (Custom API):</Alert.Heading>
          <p>{shortUrl}</p>
          <Button variant="outline-success" onClick={() => copyToClipboard(shortUrl)}>
            {copied ? "Copied!" : "Copy to clipboard"}
          </Button>
        </Alert>

        <Alert variant="info" className="text-center">
          <Alert.Heading>Your TinyURL shortened URL:</Alert.Heading>
          <p>{tinyUrl}</p>
          <Button variant="outline-info" onClick={() => copyToClipboard(tinyUrl)}>
            {copied ? "Copied!" : "Copy to clipboard"}
          </Button>
        </Alert>
      </div>
    </>
  );
}

export default App;
