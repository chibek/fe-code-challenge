import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import DownArrowIcon from '@/assets/down.png';
import UpArrowIcon from '@/assets/up.png';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import { formatCurrency } from '@/lib';
import { TREND_OPTIONS, TREND_OPTIONS_TYPE } from '@/lib/constants';
import { useShakeCard } from '@/hooks/useShakeCard';
import { memo, useCallback, useRef } from 'react';
import { useShadowCard } from '@/hooks/useShadowCard';
import {
  selectActiveSymbol,
  selectShowCardInfo,
  setActiveSymbol
} from '@/store/dashboardOptionsSlice';
import clsx from 'clsx';

type SymbolCardProps = {
  id: string;
};

type SymbolCardIconsProps = {
  trend?: TREND_OPTIONS_TYPE | null;
};
const SymbolCardIcons = memo(({ trend }: SymbolCardIconsProps) => {
  return (
    <>
      {trend && (
        <div className="symbolCard__icon">
          {trend === TREND_OPTIONS.UP ? (
            <img src={UpArrowIcon} alt="up arrow" />
          ) : (
            <img src={DownArrowIcon} alt="down arrow" />
          )}
        </div>
      )}
    </>
  );
});

type SymbolCardHeaderProps = {
  symbol: string;
};
const SymbolCardHeader = memo(({ symbol }: SymbolCardHeaderProps) => {
  return <div className="symbolCard__header">{symbol}</div>;
});

type SymbolCardPriceProps = {
  id: string;
  cardRef: React.RefObject<HTMLDivElement>;
};
const SymbolCardPrice = memo(({ id, cardRef }: SymbolCardPriceProps) => {
  const price = useAppSelector((state) => state.prices[id]);
  useShakeCard(price, cardRef.current);
  useShadowCard(price, cardRef.current);

  return (
    <div className="symbolCard__price">
      <div>Price:</div>
      <div>{formatCurrency(price) || '--'} </div>
    </div>
  );
});

type SymbolCardItemsProps = {
  companyName: string;
  industry: string;
  marketCap: number;
};
const SymbolCardItems = memo(({ companyName, industry, marketCap }: SymbolCardItemsProps) => {
  return (
    <div className="symbolCard__items">
      <ListItem spacing="space-between" Icon={<CompanyIcon />} label={companyName} />
      <ListItem spacing="space-between" Icon={<IndustryIcon />} label={industry} />
      <ListItem
        spacing="space-between"
        Icon={<MarketCapIcon />}
        label={formatCurrency(marketCap) || '--'}
      />
    </div>
  );
});

const SymbolCard = ({ id }: SymbolCardProps) => {
  const dispatch = useAppDispatch();

  const cardRef = useRef<HTMLDivElement>(null);
  const activeSymbol = useAppSelector(selectActiveSymbol);
  const showCardInfo = useAppSelector(selectShowCardInfo);

  const isSelected = activeSymbol === id;
  const { companyName, industry, marketCap, symbol, trend } = useAppSelector(
    (state) => state.stocks.entities[id]
  );

  const handleOnClick = useCallback(() => {
    dispatch(setActiveSymbol(id));
  }, [id]);

  return (
    <div
      onClick={handleOnClick}
      className={clsx('symbolCard', [
        isSelected && 'symbolCard__shadow symboldCard__scale--up',
        !isSelected && activeSymbol && 'symboldCard__scale--down'
      ])}
      ref={cardRef}
    >
      <SymbolCardHeader symbol={symbol} />
      <div className="symbolCard__content">
        <SymbolCardPrice id={id} cardRef={cardRef} />
        {showCardInfo && (
          <SymbolCardItems companyName={companyName} industry={industry} marketCap={marketCap} />
        )}
      </div>
      <SymbolCardIcons trend={trend} />
    </div>
  );
};
export default SymbolCard;
