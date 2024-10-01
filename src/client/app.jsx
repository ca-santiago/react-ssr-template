import React from 'react';

export default function App() {
  const [count, setCount] = React.useState(99);

  const a = 'Some values from vars, adding some more information 22';

  return (
    <div>
      <p className='ContentWrapper--active'>{ a }</p>
      <button onClick={ () => setCount(count + 1) }>Increment 33</button>
      <p>{ count }</p>
      <div>
        <h2> title updated</h2>
        <div className='mt-10'>
          <p>Updating 2</p>
        </div>
        <div className='ContentWrapper--active'>
          <p>Updating this content, hell yeah!</p>
        </div>
      </div>
    </div>
  );
}
