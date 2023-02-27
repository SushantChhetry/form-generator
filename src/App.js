import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState([
    {
      field: "",
      text: "",
      charSize: 16,
      space: 0,
    },
  ]);

  const handleChange = (event, index) => {
    let data = [...text];
    data[index][event.target.name] = event.target.value;
    let textVal = data[index]["text"];
    let spaces = data[index]["charSize"] - textVal.length;
    data[index]["space"] = spaces;
    setText(data);
  };

  const handleSubmit = () => {
    const element = document.createElement("a");
    let finalText = "";
    for (let i = 0; i < text.length; i++) {
      let tempString = text[i]["text"];
      for (let j = 0; j < text[i]["space"]; j++) {
        tempString += " ";
      }
      finalText += tempString;
    }
    console.log(finalText);
    const file = new Blob([finalText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  };

  const addFields = () => {
    let newField = {
      field: "",
      text: "",
      charSize: 16,
      finalText: "",
    };

    setText([...text, newField]);
  };

  return (
    <div className="wrapper">
      <header title="Generate a text file with spaces for each field">
        <h1>File Generator</h1>
      </header>
      <div>
        <ul className="field-wrapper">
          <li>
            <h2>Field Name</h2>
          </li>
          <li>
            <h2>Field Value</h2>
          </li>
          <li>
            <h2>Field size</h2>
          </li>
        </ul>
      </div>
      <div className="body-wrapper">
        <form onSubmit={handleSubmit}>
          {text.map((text, index) => {
            return (
              <div key={index} className="form-wrapper">
                <input
                  title="Enter the field name here"
                  name="field"
                  placeholder="Field Name"
                  onChange={(event) => handleChange(event, index)}
                  value={text.field}
                />
                <input
                  title="Enter the field value here"
                  name="text"
                  placeholder="Field Value"
                  onChange={(event) => handleChange(event, index)}
                  value={text.text}
                />
                <input
                  title="Enter the field size here"
                  name="charSize"
                  placeholder="charSize"
                  onChange={(event) => handleChange(event, index)}
                  value={text.charSize}
                  required="required"
                />
              </div>
            );
          })}
        </form>
        <div className="btn-wrapper">
          <button onClick={addFields} className="btn-add">
            Add Fields
          </button>
          <button onClick={handleSubmit} className="btn-generate">
            Generate file
          </button>
          <button className="btn-generate">Create JSON</button>
        </div>
      </div>
      <footer>Created by Sushant</footer>
    </div>
  );
}

export default App;
