import React, { useState } from 'react';
import { uploadPDF } from '../services/api';

const Questionnaire = () => {
  const [file, setFile] = useState(null);
  const [fields, setFields] = useState([]);
  const [responses, setResponses] = useState({});

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const response = await uploadPDF(file);
        const extractedFields = response.data;

        // Initialize responses with the default/filled values from the extracted PDF form
        const initialResponses = {};
        extractedFields.forEach((field) => {
          initialResponses[field.name] = field.type === 'checkbox' || field.type === 'radio' 
            ? (field.value !== 'Off' ? field.value : 'Off') 
            : field.value;
        });
        setResponses(initialResponses);
        setFields(extractedFields);

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.log('No file selected');
    }
  };

  const handleChange = (name, value) => {
    setResponses({ ...responses, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Generated Payload:', responses);
    alert(JSON.stringify(responses, null, 2));
  };

  return (
    <div>
      <h2>OCF-1 PDF to Questionnaire</h2>
      <p>Upload the OCF-1 PDF form to extract its fields as a questionnaire:</p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {fields.length > 0 && (
        <form>
          {fields.map((field, index) => (
            <div key={index}>
              <label>
                {field.name} ({field.type})
              </label>
              {field.type === 'text' && (
                <input
                  type="text"
                  defaultValue={field.value}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              )}
              {field.type === 'checkbox' && (
                <input
                  type="checkbox"
                  defaultChecked={field.value !== 'Off'}
                  onChange={(e) =>
                    handleChange(field.name, e.target.checked ? 'On' : 'Off')
                  }
                />
              )}
              {field.type === 'radio' && (
                // If multiple radio buttons share the same field name, 
                // you might need to handle grouping. For simplicity, 
                // assume each radio widget is standalone or that all 
                // radio widgets with the same name appear in the JSON.
                // Without additional backend logic to extract radio options, 
                // we treat them like checkable fields.
                <input
                  type="radio"
                  name={field.name}
                  defaultChecked={field.value !== 'Off'}
                  onChange={(e) => handleChange(field.name, 'On')}
                />
              )}
            </div>
          ))}
          <button type="button" onClick={handleSubmit}>Finish</button>
        </form>
      )}
    </div>
  );
};

export default Questionnaire;
