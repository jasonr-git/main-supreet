import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
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
  background-color: ${(props) => (props.index % 2 === 0 ? '#f9f9f9' : 'white')};
  text-align: center;
`;

const StyledImage = styled.img`
  max-width: 100px;
  border-radius: 5px;
  cursor: pointer;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
`;

const FullImage = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const Table = () => {
  const [cards, setCards] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  const fetchCards = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'gallery'));
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
          await deleteDoc(doc(db, 'gallery', id));
          setCards(cards.filter(card => card.id !== id));

          Swal.fire('Deleted!', 'Your card has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting document: ', error);
          Swal.fire('Error!', 'Failed to delete card.', 'error');
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

  const handleImageClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div>
      <h1>Gallery</h1>
      {isEditing && selectedCard && (
        <Edit selectedCard={selectedCard} setIsEditing={setIsEditing} />
      )}
      {isAdding && <Add setIsAdding={setIsAdding} />}
      {!isEditing && !isAdding && (
        <>
          <StyledButton onClick={handleAddClick}>Add Card</StyledButton>
          <StyledTable>
            <thead>
              <tr>
                <StyledTh>Index</StyledTh>
                <StyledTh>Title</StyledTh>
                <StyledTh>Description</StyledTh>
                <StyledTh>Image</StyledTh>
                <StyledTh>Actions</StyledTh>
              </tr>
            </thead>
            <tbody>
              {cards.map((card, index) => (
                <tr key={card.id}>
                  <StyledTd index={index}>{card.indexNumber}</StyledTd>
                  <StyledTd index={index}>{card.title}</StyledTd>
                  <StyledTd index={index}>{card.description}</StyledTd>
                  <StyledTd index={index}>
                    {card.images && card.images.length > 0 && (
                      <StyledImage
                        src={card.images[0]}
                        alt={card.title}
                        onClick={() => handleImageClick(card)}
                      />
                    )}
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

      {isModalOpen && selectedCard && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>{selectedCard.title}</h2>
            <ImageGrid>
              {selectedCard.images.map((image, index) => (
                <FullImage key={index} src={image} alt={`${selectedCard.title} ${index + 1}`} />
              ))}
            </ImageGrid>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default Table;
