import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Assuming you have a firebase.js file exporting db

const Add = ({ setIsAdding }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [index, setIndex] = useState('');
  const [imageUrls, setImageUrls] = useState(['']); // Initialize with an empty string
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!title || !description || !date || imageUrls.some(url => !url)) {
      setError('Please fill in all fields and add at least one image URL.');
      return;
    }

    setLoading(true); // Start loading

    try {
      const newCard = {
        title,
        description,
        date,
        index: Number(index) || 0,
        images: imageUrls.filter(url => url), // Filter out any empty strings
      };

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
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrlField = (index) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);
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
          onChange={(e) => {
            setTitle(e.target.value);
            setError(''); // Clear error when user types in the title field
          }}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label htmlFor="index">Index</label>
        <input
          id="index"
          type="number"
          name="index"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        />

        <label htmlFor="image-urls">Image URLs</label>
        {imageUrls.map((url, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Enter image URL"
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
              style={{ width: '80%' }}
            />
            <button
              type="button"
              onClick={() => removeImageUrlField(index)}
              style={{ marginLeft: '10px' }}
            >
              Remove
            </button>
            {url && <img src={url} alt={`Preview ${index}`} style={{ display: 'block', width: '100px', height: '100px', marginTop: '10px' }} />}
          </div>
        ))}
        <button type="button" onClick={addImageUrlField}>
          Add Another Image URL
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" disabled={loading} />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
            disabled={loading}
          />
        </div>
      </form>

      {loading && <p>Uploading... Please wait.</p>} {/* Loading indicator */}
    </div>
  );
};

export default Add;
