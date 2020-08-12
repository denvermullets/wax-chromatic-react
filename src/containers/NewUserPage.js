import React from 'react';
import SignupForm from '../components/SignupForm';

const NewUserPage = (props) => {
  return (
    <>
      <SignupForm updateUsername={props.updateUsername} userLoggedIn={props.userLoggedIn} loggedIn={props.loggedIn} />
    </>
  );
}

export default NewUserPage;
