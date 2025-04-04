import { useState } from 'react';
import './App.css';
import ApexCharts from 'react-apexcharts';

function App() {
  const [rentPerYear, setRentPerYear] = useState(5);
  const [startCapital, setStartCapital] = useState(1000);
  const [savingPerMonth, setSavingPerMonth] = useState(100);
  const [savingSpan, setSavingSpan] = useState(10);
  const [chartData, setChartData] = useState({ 
    series: [], 
    options: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: 'zoom',
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val).toFixed(0);
          },
        },
        title: {
          text: 'Amount (USD)',
        },
      },
      xaxis: {
        type: 'datetime',
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val*1000).toFixed(0);
          },
        },
      },
    } 
  });

  const handleUpdateChart = () => {
    const currentYear = new Date().getFullYear();
    const dates = [];
    const values = [];
    let accumulated = startCapital;
    
    for (let i = 0; i <= savingSpan; i++) {
      const date = new Date(currentYear + i, 0, 1).getTime();
      dates.push(date);
      
      if (i > 0) {
        // Add yearly contributions and apply compound interest
        accumulated = (accumulated + (savingPerMonth * 12)) * (1 + rentPerYear / 100);
      }
      
      values.push({
        x: date,
        y: accumulated
      });
    }

    setChartData(prev => ({
      ...prev,
      series: [{
        name: 'Investment Value',
        data: values,
      }],
      options: {
        ...prev.options,
        title: {
          text: `Investment Growth (${rentPerYear}% annual return)`,
          align: 'left',
        },
      }
    }));
  };

  return (
    <div>
      <Header />
      <Content 
        rentPerYear={rentPerYear}
        setRentPerYear={setRentPerYear}
        startCapital={startCapital}
        setStartCapital={setStartCapital}
        savingPerMonth={savingPerMonth}
        setSavingPerMonth={setSavingPerMonth}
        savingSpan={savingSpan}
        setSavingSpan={setSavingSpan}
        handleUpdateChart={handleUpdateChart}
        chartData={chartData}
      />
      
    </div>
  );
}

function Header() {
  return (
    <div className='header'>
      <div className='headerContent'>
        <h1 className='title'>Compound Interest Calculator</h1>
      </div>
    </div>
  );
}

function Content({ rentPerYear, setRentPerYear, startCapital, setStartCapital, savingPerMonth, setSavingPerMonth, savingSpan, setSavingSpan, handleUpdateChart, chartData }) {
  return (
    <div className='scrollableContent'> 
      <div className='webContent'> 
        <InputValuesContainer 
          rentPerYear={rentPerYear}
          setRentPerYear={setRentPerYear}
          startCapital={startCapital}
          setStartCapital={setStartCapital}
          savingPerMonth={savingPerMonth}
          setSavingPerMonth={setSavingPerMonth}
          savingSpan={savingSpan}
          setSavingSpan={setSavingSpan}
        />
        <button className="update-button" onClick={handleUpdateChart}>Calculate Growth</button>
        <Chart chartData={chartData} />
        <ResultContainer />
      </div>
    </div>
  );
}

function InputValuesContainer({ rentPerYear, setRentPerYear, startCapital, setStartCapital, savingPerMonth, setSavingPerMonth, savingSpan, setSavingSpan }) {
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
      
          <div className='resultText'>30 568 USD</div>
          <div className='resultText'>67 778 USD</div>
          <div className='resultText'>5 900 USD</div>
          <div className='resultText'>987 226 USD</div>
          <div className='resultText'>4 087 USD</div>
           
    </div>
      
  
  )
}

export default App;