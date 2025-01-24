import './symbolsView.css';
import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';

const SymbolsView = () => {
  return (
    <>
      <DesktopInfo />
      <div className="symbolsView__content">
        <div className="symbolsView__chart">
          <div>
            <h3>PRICE HISTORY</h3>
          </div>
          <PriceChart />
        </div>
        <div className="symbolsView__cards">
          <SymbolsGrid />
        </div>
      </div>
    </>
  );
};

export default SymbolsView;
