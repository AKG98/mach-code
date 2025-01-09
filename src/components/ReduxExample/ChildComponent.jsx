import React from 'react'
import { useSelector } from 'react-redux'

export default function ChildComponent() {
    const count = useSelector((state) => state.counter.value)
    console.log("Child Component rendered")
  return (
    <div>
      <p>Child component</p>
      <p className='ms-10 mb-10 text-3xl'>{count}</p>
    </div>
  )
}
