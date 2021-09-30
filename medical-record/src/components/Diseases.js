import React, { useState } from "react";
// import "../styles/modal.css";
import Modal from "react-modal";

const Diseases = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <button className="dropdown-item" onClick={() => setModalIsOpen(true)}>
        Add New
      </button>
      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div id="myModal-add-disease" className="modal-add-disease">
          <div className="modal-content-add-disease">
            <span className="close-add-disease">&times;</span>
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
                <button type="save" className="save-add-disease">
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

export default Diseases;
