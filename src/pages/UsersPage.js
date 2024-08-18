import React, { useState, useEffect } from 'react';
import UserCard from '../components/UserCard';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const pageStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    justifyItems: 'center',
    padding: '16px',
    backgroundColor: '#0f0f0f',
    minHeight: '100vh',

    // Add responsive design directly in JavaScript using media queries
    '@media (max-width: 1200px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    '@media (max-width: 900px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr', // Each card takes full width on small screens
    },
  };

  // Use the spread operator to apply the media queries
  const responsivePageStyle = {
    ...pageStyle,
    ...(window.innerWidth <= 1200 && { gridTemplateColumns: 'repeat(3, 1fr)' }),
    ...(window.innerWidth <= 900 && { gridTemplateColumns: 'repeat(2, 1fr)' }),
    ...(window.innerWidth <= 600 && { gridTemplateColumns: '1fr' }),
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={responsivePageStyle}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersPage;
