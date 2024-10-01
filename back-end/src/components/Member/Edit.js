import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const EditMember = ({ selectedMember, setIsEditing }) => {
  const id = selectedMember.id;

  const [name, setName] = useState(selectedMember.name);
  const [role, setRole] = useState(selectedMember.role);
  const [image, setImage] = useState(selectedMember.image);
  const [order, setOrder] = useState(selectedMember.order); // State for order field

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedMember = {
      name,
      role,
      image,
      order, // Include order in updated data
    };

    try {
      const docRef = doc(db, 'members', id);
      await updateDoc(docRef, updatedMember);
      setIsEditing(false);

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `${name} has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload(); // Refresh the page
      });
    } catch (error) {
      console.error('Error updating document: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update member data.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-box">
        <form onSubmit={handleUpdate}>
          <h1>Edit Member</h1>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required // Ensure name is required
          />
          <label htmlFor="role">Role</label>
          <input
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required // Ensure role is required
          />
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required // Ensure image URL is required
          />
          <label htmlFor="order">Order</label>
          <input
            id="order"
            type="number"
            value={order}
            onChange={(e) => setOrder(parseInt(e.target.value))}
            required // Ensure order is required
          />
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
            <input type="submit" value="Update" />
            <input
              className="muted-button"
              type="button"
              value="Cancel"
              onClick={() => setIsEditing(false)}
            />
          </div>
        </form>
      </div>
      <style jsx>{`
        .edit-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin-bottom: 100px;
        }

        .edit-box {
          background-color: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 90%; /* Adjusted width */
          max-width: 800px; /* Max width for responsiveness */
          font-size: 16px;
          margin-bottom: 30px; /* Added bottom margin */
        }

        .edit-box input[type='text'],
        .edit-box input[type='number'] {
          width: 100%; /* Make input fields full width */
          padding: 8px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .form-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .form-buttons input[type='submit'],
        .form-buttons input[type='button'] {
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
        }

        .muted-button {
          background-color: #ccc;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default EditMember;
