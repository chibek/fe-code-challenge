import { useEffect, useState } from 'react';

const shouldShake = (currentPrice: number, previousPrice: number | null) => {
  if (previousPrice === null) return false;
  const percentageChange = Math.abs((currentPrice - previousPrice) / previousPrice) * 100;
  return percentageChange > 25;
};

export const useShakeCard = (currentPrice: number | null, cardRef: HTMLDivElement | null) => {
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);

  useEffect(() => {
    if (currentPrice !== null) {
      if (shouldShake(currentPrice, previousPrice)) {
        cardRef?.classList.add('symbolCard__shake');

        const animationTimer = setTimeout(() => {
          cardRef?.classList.remove('symbolCard__shake');
        }, 1000);

        return () => clearTimeout(animationTimer);
      }

      setPreviousPrice(currentPrice);
    }
  }, [currentPrice]);
};
