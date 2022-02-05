import styled from 'styled-components';
import background from '../../../assets/images/MintBox/MetamaskBox.png';
import btnnor from '../../../assets/images/MintBox/Button_Metamask.png';
import btnhov from '../../../assets/images/MintBox/Button_Metamask_Pressed.png';
import { useWallet } from '../../../hooks/useWallet';

import { useWalletModal } from '../../../hooks/useWalletModal';

const ConnectMetamask = () => {
  const { toggleOpen } = useWalletModal();
  const { active } = useWallet();

  return (    
    <Wrapper>
        <div className="whitepaperbtn" onClick={()=>{ !active && toggleOpen()}}>
        </div>
    </Wrapper>
  );
};

export default ConnectMetamask;
const Wrapper = styled.div`
background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 40px 28px 15px 28px;
  font-size: 20px;
  width: 340px;
  margin-bottom: 10px;
  .whitepaperbtn {      
    background-image: url(${btnnor});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    width: 260px;
    height: 86px;
    margin: -10px auto 0 auto;
  }
  .whitepaperbtn:hover, .whitepaperbtn:active  {      
    background-image: url(${btnhov});
  }
`;