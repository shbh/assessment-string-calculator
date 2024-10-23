import React, { useState } from 'react';
import './style.css';

const StringCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    let delimiter = /[\s,\\n]+/; // Default delimiter (comma, spaces, or newlines)
    let numbers = input;

    if (input.startsWith('//')) {
      const delimiterIndex = input.indexOf('\\n');
      delimiter = input[delimiterIndex - 1]; // Extract custom delimiter
      numbers = input.slice(delimiterIndex + 2); // Remove delimiter part from the string
    }

    const array = numbers.split(delimiter).map(Number);

    // Check for negative numbers
    const negativeNumbers = array.filter((num) => num < 0);

    if (negativeNumbers.length > 0) {
      setError(`Negative numbers not allowed: ${negativeNumbers.join(', ')}`);
    } else {
      const sum = array.reduce((acc, num) => acc + num, 0);
      setResult(sum);
    }
  };

  return (
    <div className='mainDiv'>
      <h1>String Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter numbers"
          className='inputBox'
        />
        <button className='Button' type="submit">Calculate</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result !== null && <p>Sum: {result}</p>}
    </div>
  );
};

export default StringCalculator;
