import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Add = ({ setIsAdding }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [webapp, setWebapp] = useState('');
  const [position, setPosition] = useState('left'); // New state for position

  const handleAdd = async (e) => {
    e.preventDefault();

    const newCard = {
      title,
      description,
      image,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      webapp,
      position, // Include position in the new card data
    };

    try { 
      await addDoc(collection(db, 'other-services'), newCard);
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
    <div className="add-form-container">
      <div className="add-form-box">
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
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={6} // Increase the number of rows for larger description input
          ></textarea>
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="text"
            name="image"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            id="tags"
            type="text"
            name="tags"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
          <label htmlFor="webapp">Form Link</label>
          <input
            id="webapp"
            type="text"
            name="webapp"
            value={webapp}
            onChange={e => setWebapp(e.target.value)}
          />
          <label htmlFor="position">Position</label>
          <div className="radio-buttons">
            <label htmlFor="leftPosition">
              <input
                type="radio"
                id="leftPosition"
                name="position"
                value="left"
                checked={position === 'left'}
                onChange={() => setPosition('left')}
              />
              Left
            </label>
            <label htmlFor="rightPosition">
              <input
                type="radio"
                id="rightPosition"
                name="position"
                value="right"
                checked={position === 'right'}
                onChange={() => setPosition('right')}
              />
              Right
            </label>
          </div>
          <div className="form-buttons">
            <input type="submit" value="Add" />
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
        .add-form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .add-form-box {
          width: 90%;
          max-width: 800px; /* Increase maximum width for larger form */
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

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
        .add-form-box textarea {
          width: 100%;
          padding: 8px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .radio-buttons {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }

        .radio-buttons label {
          display: flex;
          align-items: center;
        }

        .radio-buttons input[type='radio'] {
          margin-right: 5px;
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

export default Add;
