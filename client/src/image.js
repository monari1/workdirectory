import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function FileUpload() {
  const [imageData, setImageData] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImageData(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleFileUpload = () => {
    axios
      .post('http://localhost:8080/upload', { imageData })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Upload error:', error);
      });
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <Form>
        <Form.Group controlId="imageUpload">
          <Form.Label>Choose an image</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" onClick={handleFileUpload}>
          Upload Image
        </Button>
      </Form>
    </div>
  );
}

export default FileUpload;
