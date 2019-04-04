import React, { useState } from 'react';
import { TextInput } from 'grommet';

export default function DummySearch() {
  const [value, setValue] = useState('');
  const handleChange = e => setValue(e.target.value);

  return (
    <div style={{ width: '500px' }}>
      <TextInput
        size="small"
        placeholder="search"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
