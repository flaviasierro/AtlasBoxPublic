import React, { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Card {
  icon?: React.ReactNode;
  label: string;
  route: string;
}

interface MenuItemProps {
  placeholder?: string;
  title?: string;
  cards: Card[];
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const filteredCardsRef = useRef<Card[]>(props.cards);
  const [filteredCards, setFilteredCards] = React.useState<Card[]>(props.cards);

  const handleClick = () => {
    if (inputRef.current) {
      const searchTermLowerCase = inputRef.current.value.toLowerCase();
      const filtered = props.cards.filter((card) => card.label.toLowerCase().includes(searchTermLowerCase));

      filteredCardsRef.current = filtered;
      console.log(filteredCardsRef.current)
      setFilteredCards(filtered);
    }
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      handleClick();
    }
  }

  return (
    <>
      <div className='menu-container'>
        <h1>{props.title || 'Menu'}</h1>
        <div className="input-button-container">
          <input
            ref={inputRef}
            type="text"
            placeholder={props.placeholder || 'Buscar...'}
            onKeyDown={handleOnKeyDown}
          />
          <button onClick={handleClick}><FaSearch /></button>
        </div>
      </div>
      <div className='card-container'>
        {filteredCards?.length === 0 ? (
          <p className='no-application'>Aplicativo não encontrado</p>
        ) : (
          filteredCards?.map((card: Card, index: number) => (
            <div className='card' key={index}>
              {card.icon && (
                <Link to={card.route} className='card-icon'>
                  {card.icon}
                </Link>
              )}
              <Link to={card.route}>{card.label}</Link>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MenuItem;
