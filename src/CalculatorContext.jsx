import { createContext, useState } from 'react';

export const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
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
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};