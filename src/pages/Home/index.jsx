import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Home = () => {
  const chartRef = useRef(null);
  useEffect(() => {
    //确保dom可用
    //const chartDom = document.getElementById('main');
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    const option = {
      xAxis: {
        type: 'category',
        data: ['VUe', 'React', 'Angular'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [20, 40, 70],
          type: 'bar',
        },
      ],
    };

    option && myChart.setOption(option);
  }, []);
  return (
    <div>
      <div ref={chartRef} style={{ width: '500px', height: '400px' }}></div>
    </div>
  );
};

export default Home;
