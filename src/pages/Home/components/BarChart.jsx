import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart = ({ title, chartId }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    //确保dom可用
    //const chartDom = document.getElementById('main');
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: title,
      },
      xAxis: {
        type: 'category',
        data: ['Vue', 'React', 'Angular'],
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
    // 在组件卸载时销毁图表实例
    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div>
      <div
        ref={chartRef}
        id={chartId}
        style={{ width: '500px', height: '400px' }}
      ></div>
    </div>
  );
};

export default BarChart;
