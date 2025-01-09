import React, { useState, useCallback } from 'react';

const ChildComponent = React.memo(({onClick}) => {
  console.log("Child component rendered");
  return <button onClick={onClick}>Click Me</button>;
});

const Parent = () => {
  const [count, setCount] = useState(0);
  // Memoized function to prevent unnecessary re-renders of ChildComponent
  const handleClick = useCallback(() => {
    console.log("Button clicked");
  },[]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <br />
      <ChildComponent  onClick={handleClick}/>
    </div>
  );
};

export default Parent;
