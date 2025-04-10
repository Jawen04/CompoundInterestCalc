import { createContext, useState } from 'react';
import calculateCompoundInterest from './util/calculate';



let calculatorResult = []

export const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
  const [rentPerYear, setRentPerYear] = useState(5);
  const [startCapital, setStartCapital] = useState(1000);
  const [savingPerMonth, setSavingPerMonth] = useState(100);
  const [savingSpan, setSavingSpan] = useState(10);
  const [currency, setCurrency] = useState('SEK');
  const [chartData, setChartData] = useState({ 
    series: [{
      name: 'Investment Value',
      data: [] // Initialize with empty array
    }],
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
            return (val).toFixed(2);
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
            return (val).toFixed(0);
          },
        },
      },
    } 
  });

  // In CalculatorContext.js
const handleUpdateChart = () => {
  const currentYear = new Date().getFullYear();
  const dataPoints = [];
  
  for (let i = 0; i <= savingSpan; i++) {
    const value = calculateCompoundInterest(startCapital, savingPerMonth, rentPerYear, i);
    dataPoints.push({
      x: new Date(currentYear + i, 0, 1).getTime(),
      y: value.total
    });
    console.log(`Year: ${i}, Value: ${value}`);
  }

 
  setChartData(prev => ({
    ...prev,
    series: [{
      name: 'Investment Value',
      data: dataPoints
    }],
    options: {
      ...prev.options,
      title: {
        text: `Investment Growth (${rentPerYear}% annual return)`,
        align: 'left'
      }
    }
  }));
};



  
  

  return (
    <CalculatorContext.Provider
      value={{
        rentPerYear,
        setRentPerYear,
        startCapital,
        setStartCapital,
        savingPerMonth,
        setSavingPerMonth,
        savingSpan,
        setSavingSpan,
        handleUpdateChart,
        chartData,
        currency
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};


  

  


export default CalculatorProvider;
