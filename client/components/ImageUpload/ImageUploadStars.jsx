import { React, useState } from 'react';
import Select from 'react-select';

export default function ImageUploadStars() {
  const [stars, setStars] = useState(1);
  const options = [
    { value: 1, label: '🌟 ', text: 'one star! really good!' },
    { value: 2, label: '🤩 ', text: 'two stars! outstanding!' },
    { value: 3, label: '✨ ', text: 'three stars! incredible!!!' },
  ];
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#f1e3d3y',
      padding: '5px 10px',
      fontsize: '120px',
      border: '0px',
    }),
    option: (provided, state) => ({
      ...provided,

      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? 'hotpink' : 'white',
    }),
  };
  return (
    <div id="image-upload-stars-box" className="image-upload-stars-box">
      <h1>Rate your Overall Experience:</h1>
      <div id="image-upload-stars-choice" className="image-upload-stars-choice">
        <label>
          <Select
            options={options}
            className="select-stars"
            value={stars}
            styles={customStyles}
            onChange={(choice) => setStars(choice)}
          />
        </label>
      </div>
      {stars.text}
    </div>
  );
}
