import { useContext, useState, useRef, useEffect } from 'react';
import './App.css';
import ApexCharts from 'react-apexcharts';
import { CalculatorContext, CalculatorProvider } from './CalculatorContext';
import DropDown from './components/Dropdown';
import calculateCompoundInterest from './util/calculate';

//const [coolValue, setCoolValue] = useState(0);


function App() {  
  return (
    <CalculatorProvider>
    <div>
      <Header />
      <Content /> 
    </div>
    </CalculatorProvider>

  );
}

function Header() {
  return (
    <div className='header'>
      <div className='headerContent'>
        <DropDown>HEHH</DropDown>
        <h1 className='title'>Compound Interest Calculator</h1>
      </div>
    </div>
  );
}

function Content() {
  const {
    handleUpdateChart, chartData,
  } = useContext(CalculatorContext)
  return (
    <div className='scrollableContent'> 
      <div className='webContent'> 
        <InputValuesContainer />
        
        
        <button className="update-button" onClick={handleUpdateChart}>Calculate Growth</button>
        <Chart chartData={chartData} />
        <ResultContainer />
      </div>
    </div>
  );
}

function InputValuesContainer() {
  const {
    rentPerYear,
    setRentPerYear,
    startCapital,
    setStartCapital,
    savingPerMonth,
    setSavingPerMonth,
    savingSpan,
    setSavingSpan,
    setCurrency,
    currency,
  } = useContext(CalculatorContext)

  return (
    <div className='inputValuesContainer'>
      <div className='valuesBox'>
        <SliderTitle SliderTitle={"Annual return rate (%)"} />
        <InputBox 
          value={rentPerYear} 
          setValue={setRentPerYear} 
          maxValue={30} 
          suffix={"%"} 
          step={0.1} 
        />

        <SliderTitle SliderTitle={"Initial investment " + currency} />
        <InputBox 
          value={startCapital} 
          setValue={setStartCapital} 
          maxValue={100000} 
          suffix={currency} 
          step={10}
          setCurrency={setCurrency} 
          currency={currency}
        />

        <SliderTitle SliderTitle={"Monthly contribution (" + currency + ")"} />
        <InputBox 
          value={savingPerMonth} 
          setValue={setSavingPerMonth} 
          maxValue={1000} 
          suffix={currency + "/month"} 
          step={10}
          setCurrency={setCurrency} 
          currency={currency}
        />

        <SliderTitle SliderTitle={"Investment period (years)"} />
        <InputBox 
          value={savingSpan} 
          setValue={setSavingSpan} 
          maxValue={60} 
          suffix={"years"} 
          step={1} 
          setCurrency={setCurrency} 
          currency={currency}
        />
      </div>
    </div>
  );
}

function SliderTitle({ SliderTitle }) {
  return (
    <div className='sliderTitle'>
      <h2 class="background-color white">{SliderTitle}</h2>
    </div>
  );
}

function InputBox({ value, setValue, maxValue, suffix, step, currency, setCurrency }) {
  const [textInput, setTextInput] = useState(value);
  const [toggleDropDown, setToggleDropDown] = useState(false)
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggleDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    setValue(parseFloat(e.target.value));
    setTextInput(parseFloat(e.target.value));
  };

  const handleTextInput = (e) => {
    const inputValue = e.target.value.replace(/\s+/g, ''); // Remove spaces
    if (inputValue === "") {
      setTextInput(0); // Set to 0 if input is empty
    } else if (/^[0-9]*\.?[0-9]*$/.test(inputValue)) { // Allow decimal numbers
      setTextInput(inputValue); // Update state with valid number input
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const inputValue = parseFloat(e.target.value);
      if (!isNaN(inputValue)) {
        setValue(inputValue);
      }
    }
  };

  const handleDropDownChoice = (currencyCode) => {
    setToggleDropDown(!toggleDropDown)
    setCurrency(currencyCode)
    console.log(currency)
  }

  

  return (
    <div className='inputContainer'>
      <input 
        className='inputField'
        type="range" 
        min="0"
        max={maxValue}
        step={step}
        value={value} 
        onChange={handleChange}
      />
      
      <div className='text-and-drop'>
        <input
          className='inputTextField'
          placeholder='Enter value'
          value={textInput}
          onChange={handleTextInput}
          onKeyDown={handleKeyDown} 
        />

        <div ref={dropdownRef}>
          <button
            className='dropdown-toggle'
            onClick={() => setToggleDropDown(!toggleDropDown)}
          >{suffix}</button>
          {toggleDropDown && suffix === currency && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={() => handleDropDownChoice("USD")}>USD</button>
              <button className="dropdown-item" onClick={() => handleDropDownChoice("SEK")}>SEK</button>
              <button className="dropdown-item" onClick={() => handleDropDownChoice("NRG")}>NRG</button>
            </div>
          )}
        </div>
      </div>
    </div>
      
    
  );
}



function Chart({ chartData }) {
  return (
    <div className="chart-container">
      
        <ApexCharts
          className="chart" 
          options={chartData.options} 
          series={chartData.series} 
          type="area" 
          height={350} 
        />
   
    </div>
  );
}



function ResultContainer() {
  return (
    <div className='resultContainer'>
      <ResultBox />
    </div>
  )
}

function ResultBox() {

  const {
    rentPerYear,
    setRentPerYear,
    startCapital,
    setStartCapital,
    savingPerMonth,
    setSavingPerMonth,
    savingSpan,
    setSavingSpan,
  } = useContext(CalculatorContext)

  // calculateCompoundInterest(startCapital, savingPerMonth, rentPerYear, i);
  const calculator = calculateCompoundInterest(startCapital, savingPerMonth, rentPerYear, savingSpan);

  const titleFontSize = '40px';
  const valueFontSize = '70px';
  return (
    
    <div className='resultBox'>
      <div className='resultText'>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left',
          gap: '8px' // or '0.5rem', '10px', etc.
        }}>
        <h3 style = {{fontSize:titleFontSize, width:'400px'}}>Your total value is:</h3>
        <h1 style = {{fontSize:valueFontSize, color:'#5af542'}}>{calculator.total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} </h1>
        </div>
      </div>
      <div className='resultText'>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left',
          gap: '8px' // or '0.5rem', '10px', etc.
        }}>
        <h3 style = {{fontSize:titleFontSize, width:'400px'}}>Your total compound interest was:</h3>
        <h1 style = {{fontSize:valueFontSize, color:'#f5429c'}}>{calculator.growth.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</h1>
        </div>
      </div>
      <div className='resultText'>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left',
          gap: '8px' // or '0.5rem', '10px', etc.
        }}>
        <h3 style = {{fontSize:titleFontSize, width:'400px'}}>Your total value is:</h3>
        <h1 style = {{fontSize:valueFontSize, color:'#4260f5'}}>{startCapital.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</h1>
        </div>
      </div>
      <div className='resultText'>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left',
          gap: '8px' // or '0.5rem', '10px', etc.
        }}>
        <h3 style = {{fontSize:titleFontSize, width:'400px'}}>Your total value is:</h3>
        <h1 style = {{fontSize:valueFontSize, color:'#f5429c'}}>{calculator.accumulatedSavings.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</h1>
        </div>
      </div>



      

    </div>
      
  
  )
}

export default App;