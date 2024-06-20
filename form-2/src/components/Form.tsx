/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import CheckboxField from './CheckboxField';
import TextAreaField from './TextareaField';

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    applyingPosition: '',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: [] as string[],
    preferredInterviewTime: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    applyingPosition: '',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: '',
    preferredInterviewTime: '',
  });

  const [submittedData, setSubmittedData] = useState<any>(null); // State to store submitted data

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        additionalSkills: [...formData.additionalSkills, value],
      });
    } else {
      setFormData({
        ...formData,
        additionalSkills: formData.additionalSkills.filter(skill => skill !== value),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    
    // Check if there are any errors
    const hasErrors = Object.values(formErrors).some(error => error !== '');
    
    if (hasErrors) {
      setErrors(formErrors);
      setSubmittedData(null); // Clear submitted data on error
    } else {
      setSubmittedData(formData); // Store form data in submittedData
      resetForm();
    }
  };

  const validateForm = (data: typeof formData): typeof errors => {
    const { fullName, email, phoneNumber, applyingPosition, relevantExperience, portfolioUrl, managementExperience, additionalSkills, preferredInterviewTime } = data;
    const newErrors = {
      fullName: fullName.trim() ? '' : 'Full Name is required',
      email: email.trim() ? (/\S+@\S+\.\S+/.test(email) ? '' : 'Email is invalid') : 'Email is required',
      phoneNumber: phoneNumber.trim() ? (isNaN(Number(phoneNumber)) ? 'Phone Number must be a valid number' : '') : 'Phone Number is required',
      applyingPosition: applyingPosition ? '' : 'Applying for Position is required',
      relevantExperience: (applyingPosition === 'Developer' || applyingPosition === 'Designer') && !relevantExperience.trim() ? 'Relevant Experience is required' : '',
      portfolioUrl: applyingPosition === 'Designer' && !portfolioUrl.trim() ? 'Portfolio URL is required' : '',
      managementExperience: applyingPosition === 'Manager' && !managementExperience.trim() ? 'Management Experience is required' : '',
      additionalSkills: additionalSkills.length > 0 ? '' : 'At least one Additional Skill must be selected',
      preferredInterviewTime: preferredInterviewTime.trim() ? (isNaN(Date.parse(preferredInterviewTime)) ? 'Preferred Interview Time must be a valid date and time' : '') : 'Preferred Interview Time is required',
    };
    return newErrors;
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      applyingPosition: '',
      relevantExperience: '',
      portfolioUrl: '',
      managementExperience: '',
      additionalSkills: [],
      preferredInterviewTime: '',
    });
    setErrors({
      fullName: '',
      email: '',
      phoneNumber: '',
      applyingPosition: '',
      relevantExperience: '',
      portfolioUrl: '',
      managementExperience: '',
      additionalSkills: '',
      preferredInterviewTime: '',
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          id="fullName"
          label="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          error={errors.fullName}
        />

        <InputField
          id="email"
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
        />

        <InputField
          id="phoneNumber"
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          error={errors.phoneNumber}
        />

        <SelectField
          id="applyingPosition"
          label="Applying for Position"
          name="applyingPosition"
          value={formData.applyingPosition}
          onChange={handleInputChange}
          options={['Developer', 'Designer', 'Manager']}
          error={errors.applyingPosition}
        />

        {formData.applyingPosition === 'Developer' || formData.applyingPosition === 'Designer' ? (
          <InputField
            id="relevantExperience"
            label="Relevant Experience (years)"
            type="number"
            name="relevantExperience"
            value={formData.relevantExperience}
            onChange={handleInputChange}
            error={errors.relevantExperience}
          />
        ) : null}

        {formData.applyingPosition === 'Designer' ? (
          <InputField
            id="portfolioUrl"
            label="Portfolio URL"
            type="text"
            name="portfolioUrl"
            value={formData.portfolioUrl}
            onChange={handleInputChange}
            error={errors.portfolioUrl}
          />
        ) : null}

        {formData.applyingPosition === 'Manager' ? (
          <TextAreaField
            id="managementExperience"
            label="Management Experience"
            name="managementExperience"
            value={formData.managementExperience}
            onChange={handleInputChange}
            error={errors.managementExperience}
          />
        ) : null}

        <div className="flex flex-col">
          <span className="mb-1 text-sm font-medium">Additional Skills</span>
          <div className="space-y-2">
            <CheckboxField
              label="JavaScript"
              value="JavaScript"
              name="additionalSkills"
              checked={formData.additionalSkills.includes('JavaScript')}
              onChange={handleCheckboxChange}
            />
            <CheckboxField
              label="CSS"
              value="CSS"
              name="additionalSkills"
              checked={formData.additionalSkills.includes('CSS')}
              onChange={handleCheckboxChange}
            />
            <CheckboxField
              label="Python"
              value="Python"
              name="additionalSkills"
              checked={formData.additionalSkills.includes('Python')}
              onChange={handleCheckboxChange}
            />
          </div>
          {errors.additionalSkills && <p className="text-red-500 text-xs mt-1">{errors.additionalSkills}</p>}
        </div>

        <InputField
          id="preferredInterviewTime"
          label="Preferred Interview Time"
          type="datetime-local"
          name="preferredInterviewTime"
          value={formData.preferredInterviewTime}
          onChange={handleInputChange}
          error={errors.preferredInterviewTime}
        />

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">Submit</button>
      </form>

      {/* Display submitted data */}
      {submittedData && (
        <div className="mt-4 border p-4">
          <h2 className="text-lg font-bold mb-2">Submitted Data</h2>
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
          <p><strong>Applying for Position:</strong> {submittedData.applyingPosition}</p>
          {submittedData.applyingPosition === 'Developer' || submittedData.applyingPosition === 'Designer' ? (
            <p><strong>Relevant Experience:</strong> {submittedData.relevantExperience}</p>
          ) : null}
          {submittedData.applyingPosition === 'Designer' ? (
            <p><strong>Portfolio URL:</strong> {submittedData.portfolioUrl}</p>
          ) : null}
          {submittedData.applyingPosition === 'Manager' ? (
            <p><strong>Management Experience:</strong> {submittedData.managementExperience}</p>
          ) : null}
          <p><strong>Additional Skills:</strong> {submittedData.additionalSkills.join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {submittedData.preferredInterviewTime}</p>
        </div>
      )}
    </div>
  );
};

export default Form;
