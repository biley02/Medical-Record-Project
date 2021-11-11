import React, { useState } from "react";
import Modal from "react-modal";

const DpModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Add New</button>
      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div>
          <form
            class="form-group"
            method="POST"
            action="/user/profile/picupload"
            enctype="multipart/form-data"
          >
            <label>Upload Image</label>
            <div class="input-group">
              <span class="input-group-btn">
                <span class="btn btn-default btn-file">
                  Browse…{" "}
                  <input type="file" id="profilePic" name="profilePic" />
                </span>
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Choose a file"
                readonly
              />
            </div>
            <button type="save" class="save-dp-edit">
              Save
            </button>
          </form>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default DpModal;
