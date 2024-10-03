import React from 'react';

function App() {
  const [count, setCount] = React.useState(99);

  const a = 'Some values from vars, adding some more information 22';

  return (
    <div>
      <p className='ContentWrapper--active'>{ a }</p>
      <button onClick={ () => setCount(count + 1) }>Increment testing 74747</button>
      <p>{ count }</p>
      <div>
        <h2> title updated</h2>
        <div className='mt-10'>
          <p>Updating</p>
        </div>
        <div className='ContentWrapper--active'>
          <p>Updating this content, hell yeah!</p>
        </div>
      </div>
    </div>
  );
}

export default App;
