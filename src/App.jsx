import { useState } from 'react';
import './App.css';
import SubscribeForm from './components/SubscribeForm';
import JSLandingPage from './components/Landing';

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleSubscribeClick = () => {
    setShowForm(true); // show the form when Subscribe Now is clicked
  };

  const handleCloseForm = () => {
    setShowForm(false); // allow form to be closed
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <JSLandingPage onSubscribeClick={handleSubscribeClick} />
      {showForm && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
          <SubscribeForm key="subscribe-form" onClose={handleCloseForm} />
        </div>
      )}

    </div>
  );
}

export default App;
