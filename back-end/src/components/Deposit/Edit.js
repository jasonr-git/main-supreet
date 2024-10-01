import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Edit = ({ selectedCard, setIsEditing }) => {
  const id = selectedCard.id;

  const [title, setTitle] = useState(selectedCard.title);
  const [date, setDate] = useState(selectedCard.date);
  const [description, setDescription] = useState(selectedCard.description);
  const [image, setImage] = useState(selectedCard.image);
  const [tags, setTags] = useState(selectedCard.tags.join(', '));
  const [category, setCategory] = useState(selectedCard.category);
  const [github, setGithub] = useState(selectedCard.github);
  const [webapp, setWebapp] = useState(selectedCard.webapp);
  const [position, setPosition] = useState(selectedCard.position); // New state for position

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedCard = {
      title,
      date,
      description,
      image,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      category,
      github,
      webapp,
      position, // Include position in the updated card data
    };

    try {
      const docRef = doc(db, 'services', id);
      await updateDoc(docRef, updatedCard);
      setIsEditing(false);

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `${title} has been updated.`,
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
    <div className="edit-container">
      <div className="edit-box">
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
            rows={6} // Adjust the number of rows to make it larger
          ></textarea>
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          <label htmlFor="github">GitHub URL</label>
          <input
            id="github"
            type="text"
            value={github}
            onChange={e => setGithub(e.target.value)}
          />
          <label htmlFor="webapp">Web App URL</label>
          <input
            id="webapp"
            type="text"
            value={webapp}
            onChange={e => setWebapp(e.target.value)}
          />
          <label htmlFor="position">Position</label>
          <div className="radio-buttons">
            <label>
              <input
                id="left"
                type="radio"
                name="position"
                value="left"
                checked={position === 'left'}
                onChange={() => setPosition('left')}
              />
              Left
            </label>
            <label>
              <input
                id="right"
                type="radio"
                name="position"
                value="right"
                checked={position === 'right'}
                onChange={() => setPosition('right')}
              />
              Right
            </label>
          </div>
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

        .edit-box textarea {
          width: 100%; /* Make textarea full width */
        }

        .radio-buttons {
          display: flex;
          margin-top: 8px;
        }

        .radio-buttons label {
          margin-right: 12px;
        }
      `}</style>
    </div>
  );
};

export default Edit;
