import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Add = ({ setIsAdding }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    const newCard = {
      title,
      date,
      description,
      image,
    };

    try { 
      await addDoc(collection(db, 'progress'), newCard);
      setIsAdding(false);

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `${title} has been added.`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload(); 
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add card data.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Card</h1>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="date">Status</label>
        <input
          id="date"
          type="text"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          type="text"
          name="image"
          value={image}
          onChange={e => setImage(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
