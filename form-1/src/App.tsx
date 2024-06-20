import EventForm from './components/EventForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-blue-600 text-center">Event Registration Form</h1>
        <EventForm />
      </div>
    </div>
  );
}

export default App;
