import styled from 'styled-components';

const CityText = styled.div`
  max-width: 20vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 20px;
  font-weight: 600;
  @media (max-width: 560px) {
    max-width: 35vw;
  }
`;

export default CityText;
