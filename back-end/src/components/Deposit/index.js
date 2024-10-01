import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Header from '../Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

const Dashboard = ({ setIsAuthenticated }) => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cards_data'));
    if (data !== null && Object.keys(data).length !== 0) setCards(data);
  }, []);

  const handleEdit = id => {
    const [card] = cards.filter(card => card.id === id);
    setSelectedCard(card);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [card] = cards.filter(card => card.id === id);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${card.title} has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
        const cardsCopy = cards.filter(card => card.id !== id);
        localStorage.setItem('cards_data', JSON.stringify(cardsCopy));
        setCards(cardsCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} setIsAuthenticated={setIsAuthenticated} />
          <Table cards={cards} handleEdit={handleEdit} handleDelete={handleDelete} />
        </>
      )}
      {isAdding && (
        <Add setCards={setCards} setIsAdding={setIsAdding} />
      )}
      {isEditing && (
        <Edit cards={cards} selectedCard={selectedCard} setCards={setCards} setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default Dashboard;
