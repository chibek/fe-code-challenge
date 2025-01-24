import './symbolsView.css';
import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectActiveSymbol, setActiveSymbol } from '@/store/dashboardOptionsSlice';

const SymbolsView = () => {
  const dispatch = useAppDispatch();
  const activeSymbol = useAppSelector(selectActiveSymbol);

  const handleSymbolClick = (symbolId: string) => {
    dispatch(setActiveSymbol(symbolId));
  };

  return (
    <>
      <DesktopInfo />
      <div className="symbolsView__content">
        <div className="symbolsView__chart">
          <div>
            <h3>PRICE HISTORY</h3>
          </div>
          <PriceChart symbolId={activeSymbol} />
        </div>
        <div className="symbolsView__cards">
          <SymbolsGrid onSymbolClick={handleSymbolClick} />
        </div>
      </div>
    </>
  );
};

export default SymbolsView;
