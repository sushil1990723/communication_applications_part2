import React, { useState, useEffect } from 'react';
import EditUser from './EditUser'; // Assuming it's in the same directory
import useAuth from './useAuth';

const UserList = () => {
  useAuth();
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [logdinuser] = useState(JSON.parse(localStorage.getItem('logdinuser')));

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('formEntries')) || [];
    setUsers(storedUsers);
  }, []);

  const handleShowEditModal = (user) => {
    setUserToEdit(user);
    setShowEditModal(true);
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map(user =>
      user.email === updatedUser.email ? updatedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('formEntries', JSON.stringify(updatedUsers));
    setShowEditModal(false);
  };

  const handleShowDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteUser = () => {
    const updatedUsers = users.filter(user => user.email !== userToDelete.email);
    setUsers(updatedUsers);
    localStorage.setItem('formEntries', JSON.stringify(updatedUsers)); // Ensure the correct key
    setShowDeleteModal(false);
  };

  return (
    <div>

      <h2 class="text-center mt-4 mb-4">Users List</h2>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
          </tr>
        </thead>
        {users.length > 0 ? (
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button className='btn btn-success' onClick={() => handleShowEditModal(user)}>Edit</button>
                  &nbsp;
                  {logdinuser.email !== user.email && (
                      <button className='btn btn-danger' onClick={() => handleShowDeleteModal(user)}>
                        Delete
                      </button>
                    )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <p>No users found in localStorage.</p>
        )}
      </table>

      {/* Edit User Modal */}
      {showEditModal && (
        <EditUser
          user={userToEdit}
          onSave={handleUpdateUser}
          onCancel={() => setShowEditModal(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal modal-block" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Confirm Delete</h4>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete {userToDelete?.username}?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Close</button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteUser}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
