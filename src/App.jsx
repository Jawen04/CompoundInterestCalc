import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div>
      <Header />
      <Content />
    </div>
  )
}

function Header() {
  return (
    <div className='header'>
      <div className='headerContent'>
        <h1>HELLO</h1>
        <p>WORLD</p>
      </div>
    </div>
  )
}

function Content() {
  return (
    <div className='scrollableContent'> 
      <div className='webContent'> 
        <InputValuesContainer />
      </div>
    </div>
  )
}


function InputValuesContainer() {
  return (
    <div className='inputValuesContainer'>
      <div className='valuesBox'>
        <h2>HELLO</h2>
        <p>WORLD</p>
      </div>
    </div>
  )
}

export default App
