import { useEffect, useState } from 'react';

const shadowToDisplay = (currentPrice: number, previousPrice: number | null) => {
  if (currentPrice === previousPrice || previousPrice === null) return null;
  if (currentPrice > previousPrice) return 'symbolCard__shadow--green';
  if (currentPrice < previousPrice) return 'symbolCard__shadow--red';
  return null;
};

export const useShadowCard = (currentPrice: number | null, cardRef: HTMLDivElement | null) => {
  const [previousShadowPrice, setPreviousShadowPrice] = useState<number | null>(null);

  useEffect(() => {
    if (currentPrice !== null && cardRef) {
      cardRef.classList.remove('symbolCard__shadow--green', 'symbolCard__shadow--red');

      const shadow = shadowToDisplay(currentPrice, previousShadowPrice);
      setPreviousShadowPrice(currentPrice);
      if (shadow) {
        cardRef?.classList.add(shadow);

        const animationTimer = setTimeout(() => {
          cardRef?.classList.remove(shadow);
        }, 1000);

        return () => clearTimeout(animationTimer);
      }
    }
  }, [currentPrice]);
};
