import styled from 'styled-components';
import title from '../../../../assets/images/Title.png';

const MiddleTextSection2 = () => {
  return (
    <Container>
      <ImageTitle>
        <img src={title} alt="title"/>
      </ImageTitle>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  position: relative;
  margin: 100px 0 50px;

`;

const ImageTitle = styled.div`
  position: relative;
  z-index: 2;
  text-shadow: -4px 4px 4px rgba(0, 0, 0, 0.75);
  width: 70%;
  margin: 0 auto;

  img {
    width:100%;
  }
`;
export default MiddleTextSection2;
