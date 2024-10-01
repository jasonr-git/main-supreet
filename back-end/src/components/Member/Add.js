import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const AddMember = ({ setIsAdding, memberToUpdate }) => {
  const [name, setName] = useState(memberToUpdate ? memberToUpdate.name : '');
  const [role, setRole] = useState(memberToUpdate ? memberToUpdate.role : '');
  const [image, setImage] = useState(memberToUpdate ? memberToUpdate.image : '');
  const [order, setOrder] = useState(memberToUpdate ? memberToUpdate.order : '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const memberData = {
      name,
      role,
      image,
      order: parseInt(order), // Convert order to number
    };

    try {
      if (memberToUpdate) {
        await updateDoc(doc(db, 'members', memberToUpdate.id), memberData);
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `${name} has been updated.`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await addDoc(collection(db, 'members'), memberData);
        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: `${name} has been added.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding/updating document: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add/update member data.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="add-form-container">
      <div className="add-form-box">
        <form onSubmit={handleSubmit}>
          <h1>{memberToUpdate ? 'Update Member' : 'Add Member'}</h1>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="role">Role</label>
          <input
            id="role"
            type="text"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <label htmlFor="order">Order</label>
          <input
            id="order"
            type="number"
            name="order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          />
          <div className="form-buttons">
            <input type="submit" value={memberToUpdate ? 'Update' : 'Add'} />
            <input
              className="muted-button"
              type="button"
              value="Cancel"
              onClick={() => setIsAdding(false)}
            />
          </div>
        </form>
      </div>
      <style jsx>{`
        /* Styles for the form container and box */
        .add-form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .add-form-box {
          width: 90%;
          max-width: 800px; /* Adjust as needed */
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        /* Additional styles for form elements */
        .add-form-box h1 {
          font-size: 1.5rem;
          margin-bottom: 15px;
        }

        .add-form-box label {
          display: block;
          margin-bottom: 8px;
          font-size: 1rem;
        }

        .add-form-box input[type='text'],
        .add-form-box input[type='number'] {
          width: 100%;
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

export default AddMember;
