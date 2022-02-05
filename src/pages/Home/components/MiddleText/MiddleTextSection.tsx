import styled from 'styled-components';
import title from '../../../../assets/images/Title.png';
import Cheddar from './Cheddar';
import SocialIcon from './SocialIcon';
import {useWallet} from '../../../../hooks/useWallet';

const MiddleTextSection = ({cheddar}: any) => {
  return (
    <Container>
      <div style={{
        display: "flex",
      }}>
        <Cheddar value={cheddar}/>
        <img src={title} alt="title" className="title"/>
        <SocialIcon/>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  max-width: 1440px;
  
  .title {
    width: 60%;
    margin-left: 40px;
    z-index: 2;
    text-shadow: -4px 4px 4px rgba(0, 0, 0, 0.75);
  }
`;
export default MiddleTextSection;
