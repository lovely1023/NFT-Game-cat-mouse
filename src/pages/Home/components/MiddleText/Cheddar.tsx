import styled from 'styled-components';
import cheddar from '../../../../assets/images/CheddarBox.png';
import { Typography } from '../../../../components/Typography';

const Chaddar = ({value}: any) => {
    const nf = new Intl.NumberFormat();
    return (
      <Wrapper>
        <Typography className="primary chedtitle">$CHEDDAR</Typography>
        <Typography className="secondary chedbody">${nf.format(value)}</Typography>
      </Wrapper>
    );
  };

const Wrapper = styled.div`
    width: 276px;
    height: 142px;
    background-repeat: no-repeat;
    background-image: url(${cheddar});
    background-size: 100%;
    @media (max-width: 1368px) {
        width: 236px;
    }
    @media (max-width: 1200px) {
        width: 200px;
    }
    @media (max-width: 992px) {
      width: 160px;
    }
    @media (max-width: 832px) {
        width: 140px;
        top: -50px;
    }
    .chedtitle {
        font-size: 26px;
        position: relative;
        z-index: 2;
        top: 28px;
        text-align: center !important;
        text-shadow: none;
        @media (max-width: 1368px) { 
          top: 24px;           
          font-size: 24px;
        }
        @media (max-width: 1200px) {
            top: 20px;
          font-size: 20px;
        }
        @media (max-width: 992px) {
          top: 18px;
          font-size: 16px;
        }
        @media (max-width: 832px) {
            top: 12px;
          font-size: 12px;
        }
      }
      .chedbody {
          font-size: 21px;
          position: relative;
          z-index: 2;
          top: 42px;
          text-align: center !important;
          text-shadow: none;
          @media (max-width: 1368px) { 
            top: 36px;           
            font-size: 18px;
          }
          @media (max-width: 1200px) {
              top: 32px;
            font-size: 16px;
          }
          @media (max-width: 992px) {
            top: 26px;
            font-size: 12px;
          }
          @media (max-width: 832px) {
              top: 26px;
            font-size: 11px;
          }
        }
`;

export default Chaddar;