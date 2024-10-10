import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Button } from "../ui/button";
import { inputStyle } from "../ui/form";

type MessageProps = {
  openModal: boolean;
  handleModalClose: () => void;
  handleSendMessage: (message: string) => void;
};
const MessageModal: React.FC<MessageProps> = ({
  openModal,
  handleModalClose,
  handleSendMessage,
}) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    setMessage("");
  }, [openModal]);
  return (
    <Modal
      dismissible
      show={openModal}
      className="rounded-3xl"
      onClose={handleModalClose}
    >
      <Modal.Header className="font-[600]">Message</Modal.Header>
      <Modal.Body>
        <div className="grid mb-[1.5rem] grid-cols-2 gap-4">
          <div className="col-span-2">
            <textarea
              rows={5}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className={inputStyle}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleSendMessage(message)}>Send</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageModal;
