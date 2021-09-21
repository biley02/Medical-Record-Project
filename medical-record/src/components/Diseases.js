import React, { useState } from "react";
// import "../styles/modal.css";
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
        <div id="myModal-dp-edit" className="modal-dp-edit">
          <div className="modal-content-dp-edit">
            <span className="close-dp-edit">&times;</span>
            <div className="col-md-6">
              <form
                className="form-group"
                method="POST"
                // action="/user/profile/picupload"
                enctype="multipart/form-data"
              >
                <label>Upload Image</label>
                <div className="input-group">
                  <span className="input-group-btn">
                    <span className="btn btn-default btn-file">
                      Browse…{" "}
                      <input type="file" id="profilePic" name="profilePic" />
                    </span>
                  </span>
                </div>
                <img id="img-upload" style={{ maxWidth: "30%" }} />
                <button type="save" className="save-dp-edit">
                  Save
                </button>
              </form>
              <button onClick={() => setModalIsOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DpModal;
