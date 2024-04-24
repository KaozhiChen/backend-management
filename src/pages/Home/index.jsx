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
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
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
