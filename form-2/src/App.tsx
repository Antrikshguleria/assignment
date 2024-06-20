import React from 'react';
import Header from './components/Headers';
import MainContent from './components/MainContent';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <MainContent />
    </div>
  );
};

export default App;
