import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Add = ({ setIsAdding }) => {
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!image) {
      setError('Please enter an image URL.');
      return;
    }

    const newCard = {
      image,
      category,
    };

    try {
      await addDoc(collection(db, 'gallery'), newCard);
      setIsAdding(false);

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'The new card has been added.',
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
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          type="text"
          name="image"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
            setError(''); // Clear error when user types in the image field
          }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
