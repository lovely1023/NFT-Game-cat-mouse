import styled from 'styled-components';
import background from '../../../assets/images/MintBox/GamePageBox.png';
import btnnor from '../../../assets/images/MintBox/Button_GamePage.png';
import btnhov from '../../../assets/images/MintBox/Button_GamePage_Pressed.png';

const GamePage = () => {
  return (    
    <Wrapper>
        <a href="/game">
          <div className="gamepage">
          </div>
        </a>
    </Wrapper>
  );
};

export default GamePage;
const Wrapper = styled.div`
background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 40px 28px 15px 28px;
  font-size: 20px;
  width: 340px;
  margin-bottom: 10px;
  .gamepage {      
    background-image: url(${btnnor});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    width: 260px;
    height: 86px;
    margin: -10px auto 0 auto;
  }
  .gamepage:hover, .whitepaperbtn:active  {      
    background-image: url(${btnhov});
  }
`;