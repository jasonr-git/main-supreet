import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Edit = ({ selectedCard, setIsEditing }) => {
  const id = selectedCard.id;

  const [title, setTitle] = useState(selectedCard.title);
  const [date, setDate] = useState(selectedCard.date);
  const [description, setDescription] = useState(selectedCard.desc);
  const [image, setImage] = useState(selectedCard.image); // Updated from img to image

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedFields = {};

    if (title !== selectedCard.title) {
      updatedFields.title = title;
    }
    if (date !== selectedCard.date) {
      updatedFields.date = date;
    }
    if (description !== selectedCard.desc) {
      updatedFields.desc = description;
    }
    if (image !== selectedCard.image) { // Updated from img to image
      updatedFields.image = image; // Updated from img to image
    }

    try {
      const docRef = doc(db, 'progress', id);
      await updateDoc(docRef, updatedFields);
      setIsEditing(false);

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `${selectedCard.title} has been updated.`,
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
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="text"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          type="text"
          value={image} // Updated from img to image
          onChange={e => setImage(e.target.value)}
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
