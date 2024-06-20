import React from 'react';
import { useForm } from './useForms';
import { validate } from './validate';

const EventForm: React.FC = () => {
    const initialState = {
        name: '',
        email: '',
        age: '',
        attendingWithGuest: false,
        guestName: '',
    };

    const {
        handleChange,
        handleSubmit,
        values,
        errors,
    } = useForm(initialState, validate);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                    <label className="block mb-1">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={values.age}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                    />
                    {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="attendingWithGuest"
                        checked={values.attendingWithGuest}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label className="select-none">Are you attending with a guest?</label>
                </div>
                {values.attendingWithGuest && (
                    <div>
                        <label className="block mb-1">Guest Name</label>
                        <input
                            type="text"
                            name="guestName"
                            value={values.guestName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                        />
                        {errors.guestName && <p className="text-red-500 text-sm">{errors.guestName}</p>}
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Submit
                </button>
            </form>

            {/* Show form summary if no errors */}
            {Object.keys(errors).length === 0 && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">Form Submitted</h3>
                    <h3 className="text-lg font-bold mb-2">Form Summary</h3>
                    <p><span className="font-bold">Name:</span> {values.name}</p>
                    <p><span className="font-bold">Email:</span> {values.email}</p>
                    <p><span className="font-bold">Age:</span> {values.age}</p>
                    <p><span className="font-bold">Attending with Guest:</span> {values.attendingWithGuest ? 'Yes' : 'No'}</p>
                    {values.attendingWithGuest && (
                        <p><span className="font-bold">Guest Name:</span> {values.guestName}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default EventForm;
