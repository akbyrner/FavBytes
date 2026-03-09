import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'food', label: 'Great Food 👩🏻‍🍳' },
  { value: 'wine', label: 'Great Wine 🍷' },
  { value: 'cocktails', label: 'Great Cocktails 🍸' },
  { value: 'beer', label: 'Great Beer 🍺' },
  { value: 'breakfast', label: 'Great Breakfast 🥞' },
  { value: 'lunch', label: 'Great Lunch 🥪' },
  { value: 'dinner', label: 'Great Dinner 🍽️' },
  { value: 'bites', label: 'Great Bites 🥨' },
  { value: 'service', label: 'Great Service 🤵🏻‍♀️' },
  { value: 'atmosphere', label: 'Great Atmosphere 🏟️' },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#f1e3d3',
    height: '95%',
    border: '0px',
    padding: '5px 10px',
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'white' : 'black',
    backgroundColor: state.isSelected ? 'hotpink' : 'white',
  }),
};

export default function ImageUploadTags({ tags, setTags }) {
  return (
    <div id="image-upload-tag-box" className="image-upload-tag-box">
      <div id="image-upload-tag-list" className="image-upload-tag-list">
        <label>
          <h1>Select Photo Tags:</h1>
          <Select
            options={options}
            styles={customStyles}
            className="select-tags"
            isMulti
            value={tags}
            onChange={(choice) => setTags(choice)}
          />
        </label>
      </div>
    </div>
  );
}
