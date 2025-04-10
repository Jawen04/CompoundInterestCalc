import { useContext, useState } from 'react';
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