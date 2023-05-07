import React from 'react';
import { useParams } from 'react-router-dom';

function User({ pageData }: UserProps) {
  const { id } = useParams();
  const email = pageData?.email || '...';

  return (
    <>
      <h1>User {id}</h1>
      <span>Email: {email}</span>
    </>
  );
}

export default User;

interface UserProps {
  pageData?: any;
}
