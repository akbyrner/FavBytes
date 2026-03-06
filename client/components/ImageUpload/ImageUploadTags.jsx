import React from 'react';

import Select from 'react-select';

const stars = {
  1: '🌟',
  2: '🤩',
  3: '✨',
};

const options = [
  { value: 'food', label: 'Great Food 👩🏻‍🍳' },
  { value: 'wine', label: 'Great Wine 🍷' },
  { value: 'cocktails', label: 'Great Cocktails 🍸' },
  { value: 'beer', label: 'Great Beer 🍺' },
  { value: 'breakfast', label: 'Great Breakfasts 🥞' },
  { value: 'lunch', label: 'Great Lunches 🥪 ' },
  { value: 'dinner', label: 'Great Dinners 🍽️ ' },
  { value: 'bites', label: 'Great Bites 🥨 ' },
  { value: 'service', label: 'Great Service 🤵🏻‍♀️ ' },
  { value: 'atmosphere', label: 'Great Atmosphere  🏟️ ' },
];

export default function ImageUploadTags() {
  return (
    <div id="image-upload-tag-container" className="image-upload-tag-container">
      <div id="image-upload-tag-header" className="image-upload-tag-header">
        <h1>Select Tags for your photos!</h1>
      </div>
      <div id="image-upload-tag-list" className="image-upload-tag-list"></div>
      <Select options={options} isMulti />
    </div>
  );
}
