import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import useAuth from './useAuth';

const DocumentManagement = () => {
  useAuth();
  const [uploads, setUploads] = useState([]);
  const [fileDescription, setFileDescription] = useState('');
  const [file, setFile] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [fileToEdit, setFileToEdit] = useState(null);
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    const storedUploads = localStorage.getItem('uploads')
      ? JSON.parse(localStorage.getItem('uploads'))
      : [];
    setUploads(storedUploads);
  }, []);

  const handleUpload = () => {
    if (fileDescription.trim() === '') {
      alert('Please fill in the file description');
      return;
    }
    if (!file) {
      alert('Please select a file');
      return;
    }

    const newUpload = {
      id: Number(new Date()),
      fileName: file.name,
      fileDescription: fileDescription,
    };

    const updatedUploads = [...uploads, newUpload];
    setUploads(updatedUploads);
    localStorage.setItem('uploads', JSON.stringify(updatedUploads));
    setFileDescription('');
    setFile(null);
    setShowUploadModal(false);
  };

  const handleDeleteDocument = () => {
    const updatedUploads = uploads.filter(upload => upload.id !== fileToDelete.id);
    setUploads(updatedUploads);
    localStorage.setItem('uploads', JSON.stringify(updatedUploads));
    setShowDeleteModal(false);
  };

  const handleEditFile = () => {
    const updatedUploads = uploads.map(upload =>
      upload.id === fileToEdit.id
        ? { ...upload, fileDescription: editDescription }
        : upload
    );
    setUploads(updatedUploads);
    localStorage.setItem('uploads', JSON.stringify(updatedUploads));
    setShowEditModal(false);
  };

  const openDeleteModal = upload => {
    setFileToDelete(upload);
    setShowDeleteModal(true);
  };

  const openEditModal = upload => {
    setFileToEdit(upload);
    setEditDescription(upload.fileDescription);
    setShowEditModal(true);
  };

  return (
    <div>
      <h2 className='mt-4 mb-4'>Document Management</h2>     
      
      <Table>
        <thead>
          <tr>
            <th>Description</th>
            <th>File Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="documentListTableBody">
          {uploads.map((upload, index) => (
            <tr key={index}>
              <td>{upload.fileDescription}</td>
              <td>{upload.fileName}</td>
              <td>
                <Button variant="success" onClick={() => openEditModal(upload)}>
                  Edit
                </Button> &nbsp;
                <Button variant="danger" onClick={() => openDeleteModal(upload)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Upload Button */}
      <Button variant="primary" onClick={() => setShowUploadModal(true)}>
        Upload Document
      </Button>

      {/* Upload Modal */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          <input type="text" value={fileDescription} placeholder="Enter file description" onChange={e => setFileDescription(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {fileToDelete?.fileDescription}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteDocument}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditFile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DocumentManagement;
