import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Edit = ({ selectedCard, setIsEditing }) => {
  const id = selectedCard.id;

  const [image, setImage] = useState(selectedCard.image);
  const [category, setCategory] = useState(selectedCard.category);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedCard = {
      image,
      category,
    };

    try {
      const docRef = doc(db, 'gallery', id);
      await updateDoc(docRef, updatedCard);
      setIsEditing(false);

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'The card has been updated.',
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
        text: 'Failed to update card data.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Card</h1>
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          type="text"
          value={image}
          onChange={e => setImage(e.target.value)}
        />
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
