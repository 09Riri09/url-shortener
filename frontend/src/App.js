import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, Form, Button, Alert } from "react-bootstrap";
import "./App.css";

function App() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = document.getElementById("shortened-url").innerText;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
  };

  return (
    <>
      <div className="title-section">
        <h1>URL SHORTENER</h1>
      </div>
      <div className="input-section">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Paste your URL here"
            aria-label="Long-URL"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2">
            Shorten URL
          </Button>
        </InputGroup>
      </div>
      <div className="output-section">
        <Alert variant="success" className="text-center">
          <Alert.Heading>URL shortened successfully:</Alert.Heading>
          <p id="shortened-url">Gugu gaga juju</p>
          <hr />
          <div className="d-flex justify-content-center mb-3">
            <Button
              variant="outline-success"
              onClick={copyToClipboard}
              disabled={copied}
            >
              {copied ? "Copied!" : "Copy to clipboard"}
            </Button>
          </div>
        </Alert>
      </div>
    </>
  );
}

export default App;
