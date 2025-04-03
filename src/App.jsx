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
        <h1>Compound Interest Calculator</h1>
        <h2>By Jacob</h2>
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
        <InputBox />
        <InputBox />
        <InputBox />
        <InputBox />
      </div>
    </div>
  )
}

function InputBox() {
  const [text, setText] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log(text); // Print the text when Enter is pressed
    }
  };
  return (
    <div className='inputBox'>
      <label className='inputLabel'></label>
      <input 
        className='inputField'
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Type something..."
        onKeyDown={handleKeyDown}
        
      />
    </div>
  )
}

export default App
