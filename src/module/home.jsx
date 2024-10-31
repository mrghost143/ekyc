import { SignUpForm } from '@form';
import { PageHeader } from '@shared/components';
import React from 'react';

export const Home = () => {
  return (
    <div className="page-container">
      <div className='form-container'>
        <PageHeader title={"Sign Up"} subtitle={"Register with your mobile number"} />
        <SignUpForm />
      </div>
    </div>
  )
}

export default Home;
