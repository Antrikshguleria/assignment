import React from 'react';
import Form from './Form';

const MainContent: React.FC = () => {
  return (
    <main className="container mx-auto mt-8">
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-6">Job Application Form</h2>
        <Form />
      </div>
    </main>
  );
};

export default MainContent;
