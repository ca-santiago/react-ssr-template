import React from 'react'

function HomeView() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <div>
        <input
          placeholder='Some input test'
          type='text'
          minLength={ 3 }
        />
      </div>
      <div>
        <button onClick={() => setCount(count + 1) }>Increment + 1</button>
      </div>
      <p>{ count }</p>
    </div>
  )
}

export default HomeView;
