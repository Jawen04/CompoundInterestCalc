import { useContext, useState } from 'react';
import './App.css';
import ApexCharts from 'react-apexcharts';
import { CalculatorContext, CalculatorProvider } from './CalculatorContext';
import DropDown from './components/Dropdown';

//const [coolValue, setCoolValue] = useState(0);
const calculatorValues = {}
calculatorValues.rentPerYear = 6

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

        <SliderTitle SliderTitle={"Initial investment (USD)"} />
        <InputBox 
          value={startCapital} 
          setValue={setStartCapital} 
          maxValue={100000} 
          suffix={"USD"} 
          step={10} 
        />

        <SliderTitle SliderTitle={"Monthly contribution (USD)"} />
        <InputBox 
          value={savingPerMonth} 
          setValue={setSavingPerMonth} 
          maxValue={1000} 
          suffix={"USD/month"} 
          step={10} 
        />

        <SliderTitle SliderTitle={"Investment period (years)"} />
        <InputBox 
          value={savingSpan} 
          setValue={setSavingSpan} 
          maxValue={60} 
          suffix={"years"} 
          step={1} 
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

function InputBox({ value, setValue, maxValue, suffix, step }) {
  const handleChange = (e) => {
    setValue(parseFloat(e.target.value));
  };

  return (
    <div className='inputBox'>
      <input 
        className='inputField'
        type="range" 
        min="0"
        max={maxValue}
        step={step}
        value={value} 
        onChange={handleChange}
      />
      <h2>{value} {suffix}</h2>
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
  return (
    
    <div className='resultBox'>
      <div className='resultText'>{calculatorValues.rentPerYear}</div>
      <div className='resultText'>67 778 USD</div>
      <div className='resultText'>5 900 USD</div>
      <div className='resultText'>987 226 USD</div>
      <div className='resultText'>4 087 USD</div>
      <div 
      className='testBtn'
      onClick={() => {calculatorValues.rentPerYear = 999; console.log(calculatorValues.rentPerYear)}} 
      > TEST</div>
    </div>
      
  
  )
}

export default App;