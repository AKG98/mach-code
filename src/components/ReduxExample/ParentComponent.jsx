import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../../redux/CounterSlice';
import ChildComponent from './ChildComponent';

export default function ParentComponent() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

  return (
    <div>
      <p className='ms-10 mb-10 text-3xl'>{count}</p>
      <br />
      <button 
        className='bg-black text-white p-2 mx-5'
        onClick={() => dispatch(increment())}
        >Increment
        </button>
      <button 
        className='bg-black text-white p-2'
        onClick={() => dispatch(decrement())}
        >Decrement</button>
    <ChildComponent/>
    </div>
  )
}
