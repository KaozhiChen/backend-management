import BarChart from './components/BarChart';

const Home = () => {
  return (
    <div>
      <BarChart title={'三大框架满意度'} chartId={'1'} />
      <BarChart title={'三大框架使用度'} chartId={'2'} />
    </div>
  );
};

export default Home;
