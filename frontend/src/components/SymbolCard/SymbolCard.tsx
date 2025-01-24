import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import { formatCurrency } from '@/lib';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const { companyName, industry, marketCap, symbol } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const handleOnClick = () => {
    onClick(id);
  };
  const formattedPrice = formatCurrency(price);
  const formattedMarketCap = formatCurrency(marketCap);

  return (
    <div onClick={handleOnClick} className="symbolCard">
      <div className="symbolCard__header">{symbol}</div>
      <div className="symbolCard__content">
        <div className="symbolCard__price">
          <div>Price:</div>
          <div>{formattedPrice || '--'} </div>
        </div>
        <ListItem spacing="space-between" Icon={<CompanyIcon />} label={companyName} />
        <ListItem spacing="space-between" Icon={<IndustryIcon />} label={industry} />
        <ListItem spacing="space-between" Icon={<MarketCapIcon />} label={formattedMarketCap} />
      </div>
    </div>
  );
};
export default SymbolCard;
