import React, { useState } from 'react';

const EditUser = ({ user, onSave, onCancel }) => {
  const [username, setUsername] = useState(user.username);
  const [email] = useState(user.email); // Email is not editable
  const [password] = useState(user.password); // Email is not editable

  const handleSave = () => {
    const updatedUser = { username, email, password };
    onSave(updatedUser);
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Edit User</h4>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3 mt-3">
              <label className="form-label">Full Name:</label>
              <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input type="email" className="form-control" value={email} readOnly />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
