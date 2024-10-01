import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { MdEdit, MdDelete } from 'react-icons/md';
import EditMember from './Edit'; // Import EditMember component
import AddMember from './Add'; // Import AddMember component

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

const SpaceBetween = styled.div`
  margin-bottom: 20px;
`;

const Table = () => {
  const [members, setMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [depositText, setDepositText] = useState('DEPOSIT'); // State for deposit text
  const [newDepositText, setNewDepositText] = useState('');

  const fetchMembers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'members'));
      const memberData = [];
      querySnapshot.forEach((doc) => {
        memberData.push({ id: doc.id, ...doc.data() });
      });
      setMembers(memberData);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const fetchDepositText = async () => {
    try {
      const docRef = doc(db, 'title-deposit', 'depositText');
      const docSnap = await docRef.get();
      if (docSnap.exists()) {
        setDepositText(docSnap.data().text);
      }
    } catch (error) {
      console.error('Error fetching deposit text:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchDepositText(); // Fetch deposit text from Firestore
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
          await deleteDoc(doc(db, 'members', id));
          setMembers(members.filter(member => member.id !== id));

          Swal.fire(
            'Deleted!',
            'Your member has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting document: ', error);
          Swal.fire(
            'Error!',
            'Failed to delete member.',
            'error'
          );
        }
      }
    });
  };

  const handleEditClick = (member) => {
    setSelectedMember(member);
    setIsEditing(true);
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleEditDeposit = async () => {
    try {
      const docRef = doc(db, 'title-deposit', 'depositText');
      await setDoc(docRef, { text: newDepositText });
      setDepositText(newDepositText);
      Swal.fire('Success!', 'Deposit text updated.', 'success');
      setNewDepositText(''); // Clear the input after updating
    } catch (error) {
      console.error('Error updating deposit text:', error);
      Swal.fire('Error!', 'Failed to update deposit text.', 'error');
    }
  };

  return (
    <div>
      <SpaceBetween>
        <StyledButton onClick={handleAddClick}>Add Member</StyledButton>
      </SpaceBetween>
      <h1>
        {isEditing && selectedMember ? (
          <EditMember selectedMember={selectedMember} setIsEditing={setIsEditing} />
        ) : isAdding ? (
          <AddMember setIsAdding={setIsAdding} />
        ) : (
          <>
            <span>{depositText}</span>
          </>
        )}
      </h1>
      <input
        type="text"
        value={newDepositText}
        onChange={(e) => setNewDepositText(e.target.value)}
        placeholder="Edit the title"
        style={{ marginBottom: '10px' }}
      />
      <StyledButton onClick={handleEditDeposit}>Edit Deposit Text</StyledButton>
      {!isEditing && !isAdding && (
        <>
          <StyledTable>
            <thead>
              <tr>
                <StyledTh>Name</StyledTh>
                <StyledTh>Role</StyledTh>
                <StyledTh>Image</StyledTh>
                <StyledTh>Actions</StyledTh>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr key={member.id}>
                  <StyledTd index={index}>{member.name}</StyledTd>
                  <StyledTd index={index}>{member.role}</StyledTd>
                  <StyledTd index={index}>
                    <StyledImage src={member.image} alt={member.name} />
                  </StyledTd>
                  <StyledTd index={index}>
                    <Actions>
                      <MdEdit
                        onClick={() => handleEditClick(member)}
                        style={{ cursor: 'pointer' }}
                        size={24}
                        color="#007bff"
                      />
                      <MdDelete
                        onClick={() => handleDelete(member.id)}
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
