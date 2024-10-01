import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { MdEdit, MdDelete } from 'react-icons/md';
import Edit from './Edit'; // Import Edit component
import Add from './Add'; // Import Add component

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledTh = styled.th`
  padding: 15px;
  background-color: #2f3b52;
  color: white;
  text-align: center;
  font-weight: bold;
  border: 1px solid #ddd;
`;

const StyledTd = styled.td`
  padding: 15px;
  border: 1px solid #ddd;
  background-color: ${props => props.index % 2 === 0 ? '#f9f9f9' : 'white'};
  text-align: center;
`;

const StyledImage = styled.img`
  max-width: 100px;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  margin: 20px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
    font-weight: bold;
  }

  input, textarea {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  input[type="submit"] {
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }

  .muted-button {
    background-color: #ddd;
    color: black;

    &:hover {
      background-color: #bbb;
    }
  }
`;

const Table = () => {
  const [cards, setCards] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
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

  const fetchCards = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'progress'));
      const cardData = [];
      querySnapshot.forEach((doc) => {
        cardData.push({ id: doc.id, ...doc.data() });
      });
      setCards(cardData);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, 'progress', id));
          setCards(cards.filter(card => card.id !== id));

          Swal.fire(
            'Deleted!',
            'Your card has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting document: ', error);
          Swal.fire(
            'Error!',
            'Failed to delete card.',
            'error'
          );
        }
      }
    });
  };

  const handleEditClick = (card) => {
    setSelectedCard(card);
    setIsEditing(true);
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  return (
    <div>
      <h1>Progress</h1>
      {isEditing && selectedCard && (
        <Edit selectedCard={selectedCard} setIsEditing={setIsEditing} />
      )}
      {isAdding && (
        <FormContainer>
          <Form onSubmit={handleAdd}>
            <h1>Add Card</h1>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <label htmlFor="date">Date</label>
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
          </Form>
        </FormContainer>
      )}
      {!isEditing && !isAdding && (
        <>
          <StyledButton onClick={handleAddClick}>Add Card</StyledButton>
          <StyledTable>
            <thead>
              <tr>
                <StyledTh>Title</StyledTh>
                <StyledTh>Date</StyledTh>
                <StyledTh>Description</StyledTh>
                <StyledTh>Image</StyledTh>
                <StyledTh>Actions</StyledTh>
              </tr>
            </thead>
            <tbody>
              {cards.map((card, index) => (
                <tr key={card.id}>
                  <StyledTd index={index}>{card.title}</StyledTd>
                  <StyledTd index={index}>{card.date}</StyledTd>
                  <StyledTd index={index}>{card.description}</StyledTd>
                  <StyledTd index={index}>
                    <StyledImage src={card.image} alt={card.title} />
                  </StyledTd>
                  <StyledTd index={index}>
                    <Actions>
                      <MdEdit
                        onClick={() => handleEditClick(card)}
                        style={{ cursor: 'pointer' }}
                        size={24}
                        color="#007bff"
                      />
                      <MdDelete
                        onClick={() => handleDelete(card.id)}
                        style={{ cursor: 'pointer' }}
                        size={24}
                        color="#ff4d4d"
                      />
                    </Actions>
                  </StyledTd>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </>
      )}
    </div>
  );
};

export default Table;
