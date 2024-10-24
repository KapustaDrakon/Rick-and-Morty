import styled from 'styled-components';
import { CardInfo } from './CardInfo';
import { CardStatus } from './CardStatus';
import { CardTitle } from './CardTitle';

export function Card({
  status,
  name,
  species,
  type,
  gender,
  image,
  onClickHandler
}) {
  return (
    <StyledCard
      onClick={(e) => {
        onClickHandler(e);
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '15px';
        // document.getElementById('popup-container').focus();
      }}
    >
      <CardImg src={image} alt={name} />

      <CardInfo>
        <CardTitle name={name} gender={gender} className="card-title" />
        <CardStatus status={status} species={species} type={type} />
      </CardInfo>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  flex-direction: column;
  background: #263750;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  }

  &:hover .card-title {
    color: #83bf46;
  }
`;

const CardImg = styled.img`
  border-radius: 10px 10px 0 0;
`;
