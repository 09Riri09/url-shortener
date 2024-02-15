import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, Form, Button, Alert } from "react-bootstrap";
import "./App.css";
import axios from "axios";

function App() {
  const [copied, setCopied] = useState(false);
  const [longUrl, setLongUrl] = useState (' ');
  const [shortUrl, setShortUrl] = useState (' ');

  const copyToClipboard = () => {
    const textToCopy = document.getElementById("shortened-url").innerText;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
  };

  function handleInputChange(e){
    return setLongUrl(e.target.value);
     }

    /*const shortenUrl = () =>{
      fetch(`https://tinyurl.com/api-create.php?url=${longUrl}`)
      .then (response => response.text())
      .then(data => {
        setShortUrl(data);
        setCopied (false);
      })
      .catch (error => console.error('Error', error));

    } */

    const shortenUrl = () => {
      axios.post ('https://wj6p6ektw9.execute-api.eu-west-1.amazonaws.com/prod/add-url/',{
        url: longUrl
      })
      .then(response => { 
        setShortUrl(`https://wj6p6ektw9.execute-api.eu-west-1.amazonaws.com/prod/short/${response.data.shortUrl}`);
        setCopied (false);
      })
      .catch (error => console.error('Error', error));
    }

  return (
    <>
      <div className="title-section">
        <h1>URL SHORTENER (kinda)</h1>
        <p>Created by RaresDev, using a custom API.</p>
      </div>
      <div className="input-section">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Paste your URL here"
            aria-label="Long-URL"
            aria-describedby="basic-addon2"
            onChange = {handleInputChange}
            value = {longUrl}
          />
          <Button variant="outline-secondary" id="button-addon2" onClick = {shortenUrl}>
            Shorten URL
          </Button>
        </InputGroup>
      </div>

     
      <div className="output-section">
        <Alert variant="success" className="text-center">
          <Alert.Heading className="alertheading">Your shortened URL will appear here:</Alert.Heading>
          <p id="shortened-url">{shortUrl}</p>
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
