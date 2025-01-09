import React, { useState, useMemo } from 'react';

const ExpensiveComputation = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Expensive calculation only re-runs when count changes
  const computedValue = useMemo(() => {
    console.log("Expensive computation running...");
    return count * 2;
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Computed Value: {computedValue}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Type something"
      />
    </div>
  );
};

export default ExpensiveComputation;
