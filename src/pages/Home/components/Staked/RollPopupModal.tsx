import ReactDOM from 'react-dom';
import styled from "styled-components";
import background from "../../../../assets/images/RollPopup/PopupBox.png";
import declinenor from "../../../../assets/images/RollPopup/Button_Decline.png";
import declinehov from "../../../../assets/images/RollPopup/Button_Decline_Pressed.png";
import acceptnor from "../../../../assets/images/RollPopup/Button_Accept.png";
import accepthov from "../../../../assets/images/RollPopup/Button_Accept_Pressed.png";
import unselect from "../../../../assets/images/UnstakedBoxes/ImageBox.png";
import { Typography, Text } from "../../../../components/Typography";
import Trash from "../../../../assets/images/Trash.png";
import Cupboard from "../../../../assets/images/Cupboard.png";
import Pantry from "../../../../assets/images/Pantry.png";
import Vault from "../../../../assets/images/Vault.png";

interface RollPopupModalProps {
  visible?: boolean;
  onClose: () => void;
}

const FORAGE = {
  "0": {
    name: "Trashcan",
    image: Trash,
  },
  "1": { name: "Cupboard", image: Cupboard },
  "2": { name: "Pantry", image: Pantry },
  "3": { name: "Vault", image: Vault },
};

const body = document.querySelector("body") as HTMLElement;

export default function RollPopupModal({ item, result, ...props }: any) {
  const { visible, onClose } = props;

  if (!visible) {
    return null;
  }

  const isBetter = result[1] > result[0];
  const text = isBetter
    ? `Yay! You can forage in ${
        FORAGE[result[1] as "0" | "1" | "2" | "3"].name
      }`
    : `Bad Luck! Its best you keep foraging in ${
        FORAGE[result[1] as "0" | "1" | "2" | "3"].name
      }`;

  return ReactDOM.createPortal(
    <Portal>
      <Backdrop />
      <Container>
        <Typography className="noneshadow shacktitle" m="10px 0 10px 0">
          {text}
        </Typography>
        <Centered>
          <ForageImage src={FORAGE[result[1] as "0" | "1" | "2" | "3"].image} />
        </Centered>
        <AccountRow>
          <div className="acceptbtn" onClick={onClose}></div>
        </AccountRow>
      </Container>
    </Portal>,
    body
  );
}

const ForageImage = styled.img`
  width: 200px;
  margin: 1rem auto;
`;

const AccountRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 30px;
  .declinebtn {
    background-image: url(${declinenor});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    width: 160px;
    height: 56px;
    margin: 0 auto;
  }
  .declinebtn:hover,
  .declinebtn:active {
    background-image: url(${declinehov});
  }
  .acceptbtn {
    background-image: url(${acceptnor});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    width: 160px;
    height: 56px;
    margin: 0 auto;
  }
  .acceptbtn:hover,
  .acceptbtn:active {
    background-image: url(${accepthov});
  }
`;

const Portal = styled.div`
  position: fixed;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  z-index: 1999;
  backdrop-filter: blur(4px);
  transition: all 0.3s;
`;

const Backdrop = styled.div`
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  z-index: 1;
`;

const Centered = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
  margin: auto;
  justify-items: center;
  align-items: center;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  /* border: 4px solid #2e1a05; */
  width: 500px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-items: center;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 25px 28px 15px 28px;
  border-radius: 8px;
  .shacktitle {
    font-size: 26px;
    color: rgb(104, 71, 60);
    text-align: center;
  }
  .unselectimage {
    margin: 10px auto;
  }

  @media (max-width: 600px) {
    width: 320px;
    padding: 24px;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 24px;
  width: 20px;
  height: 20px;
  cursor: pointer;

  &:before,
  &:after {
    content: "";
    border-top: 6px solid white;
    height: 6px;
    border-radius: 8px;
    width: 24px;
    position: absolute;
  }

  &:before {
    transform: rotate(-45deg) translate(-10px, 10px);
  }

  &:after {
    transform: rotate(45deg) translate(10px, 10px);
  }
`;

const ImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  flex: 0 0 80px;
  position: relative;
  background: url(${(props: any) => props.img});
  background-size: cover;
  display: grid;
  margin: 5px;
`;
