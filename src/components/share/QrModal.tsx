import { Modal } from "flowbite-react";
import React from "react";
import QRCode from "react-qr-code";

type QrModalProps = {
  openModal: boolean;
  handleModalClose: () => void;
  qrVal: string;
};
const QrModal: React.FC<QrModalProps> = ({
  openModal,
  handleModalClose,
  qrVal,
}) => {
  return (
    <Modal
      dismissible
      show={openModal}
      className="rounded-3xl"
      onClose={handleModalClose}
    >
      <Modal.Header className="font-[600]">Qr Scan</Modal.Header>
      <Modal.Body>
        <div className="w-[200px] h-[200px] my-[20px] mx-auto">
          <QRCode
            style={{
              height: "auto",
              border: "none",
              background: "white",
              maxWidth: "100%",
              width: "100%",
            }}
            value={qrVal}
            viewBox={`0 0 200 200`}
          />
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
      <Button onClick={() => setOpenModal(false)}>I accept</Button>
      <Button color="gray" onClick={() => setOpenModal(false)}>
        Decline
      </Button>
    </Modal.Footer> */}
    </Modal>
  );
};

export default QrModal;
