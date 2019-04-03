import React, { useState } from 'react';
import { TextInput } from 'grommet';

export default function DummySearch() {
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  return (
    <TextInput
      size="small"
      placeholder="search"
      value={value}
      onChange={handleChange}
    />
  );
}
