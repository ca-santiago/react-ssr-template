import React from 'react';

export default function App() {
  const [count, setCount] = React.useState(99);
  const a = 'Some values from vars, adding some more information';
  return (
    <div>
      <p className='ContentWrapper--active'>{ a }</p>
      <button onClick={ () => setCount(count + 1) }>Increment</button>
      <p>{ count }</p>
    </div>
  );
}
