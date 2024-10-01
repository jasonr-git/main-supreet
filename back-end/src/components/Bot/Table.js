import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
`;

const StyledInput = styled.textarea`
  width: 100%;
  height: 80%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
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

const DescriptionUpdater = () => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch initial description from Firebase
    async function fetchDescription() {
      try {
        const docRef = doc(db, 'Bot', 'data'); // Update 'desc' with the actual ID
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDescription(docSnap.data().description || '');
        } else {
          console.log('No such document! Creating...');
          await setDoc(docRef, { description: '' }); // Create the document
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    }

    fetchDescription();
  }, []);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpdateDescription = async () => {
    try {
      const docRef = doc(db, 'Bot', 'data'); // Update 'desc' with the actual ID
      await updateDoc(docRef, {
        description: description,
      });
      Swal.fire('Updated!', 'Description has been updated.', 'success');
    } catch (error) {
      console.error('Error updating document: ', error);
      Swal.fire('Error!', 'Failed to update description.', 'error');
    }
  };

  return (
    <Container>
      <h1>Bot Training</h1>
      <StyledInput
        placeholder="Enter new description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <StyledButton onClick={handleUpdateDescription}>Update Bot</StyledButton>
    </Container>
  );
};

export default DescriptionUpdater;
