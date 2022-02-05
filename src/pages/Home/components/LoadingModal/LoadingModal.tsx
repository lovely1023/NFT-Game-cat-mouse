import styles from "./styles.module.css";
import { Modal } from "antd";
import styled from "styled-components";

const LoadingModal = ({
  open,
  condition,
  toggleOpen,
  handleTribute,
  mintCost,
}: any) => {
  return (
    <Modal
      visible={open}
      title={
        <p className="text-center">Loading. Data Updates May Take A While</p>
      }
      className={styles.root}
      footer={null}
      centered
      width={500}
      onCancel={toggleOpen}
    >
      <img
        src="/assets/images/moustgif.gif"
        alt="title"
        className="loading-gif"
      />
    </Modal>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 10px;
  .ant-btn {
    margin: 0 10px;
  }
`;

export default LoadingModal;
