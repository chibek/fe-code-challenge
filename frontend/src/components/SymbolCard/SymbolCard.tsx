import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import { formatCurrency } from '@/lib';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const { trend, companyName } = useAppSelector((state) => state.stocks.entities[id]);
  const handleOnClick = () => {
    onClick(id);
  };
  const formattedPrice = formatCurrency(price);

  return (
    <div onClick={handleOnClick} className="symbolCard">
      <div>
        {id} - {trend}
      </div>
      <div>Price:</div>
      <div>{formattedPrice || '--'} </div>
      <ListItem Icon={<CompanyIcon />} label={companyName} />
    </div>
  );
};
export default SymbolCard;
