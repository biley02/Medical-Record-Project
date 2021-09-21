import React, { useState } from "react";
import Modal from "react-modal";

const ProfileDetailsModal = () => {
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
              <form className="form-modal-edit" method="POST">
                <div className="group1">
                  <input type="text" name="nomineeName" />
                  <span className="highlight1"></span>
                  <span className="bar1"></span>
                  <label for="name">Nominee Name</label>
                </div>
                <div className="group1-edit">
                  <input type="text" name="nomineeEmail" />
                  <span className="highlight1"></span>
                  <span className="bar1"></span>
                  <label for="name">Nominee Email</label>
                </div>
                <div className="group1">
                  <input type="text" name="nomineePhn" />
                  <span className="highlight1"></span>
                  <span className="bar1"></span>
                  <label for="name">Nominee Phone Number </label>
                </div>
                <div className="group1">
                  <input type="text" name="address" />
                  <span className="highlight1"></span>
                  <span className="bar1"></span>
                  <label for="name">User Address </label>
                </div>
                <div className="group1">
                  <input type="text" name="bloodGroup" />
                  <span className="highlight1"></span>
                  <span className="bar1"></span>
                  <label for="name">User Blood-Group: </label>
                </div>
                <span>
                  <button
                    className="save1-edit"
                    formaction="profile/editDetails"
                  >
                    SAVE
                  </button>
                </span>
              </form>
              <button onClick={() => setModalIsOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileDetailsModal;
