import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, User, GraduationCap, ArrowRight, ArrowLeft } from 'lucide-react';
import './css/education.css';
import { useNavigate } from 'react-router-dom';
const AadhaarEducationPages = () => {
  const [currentPage, setCurrentPage] = useState('aadhaar');
  const [aadhaarData, setAadhaarData] = useState({
    number: '',
    file: null
  });
  const [educationData, setEducationData] = useState({
    board: '',
    class: '',
    stream: '',
    marks: '',
    marksheet: null
  });
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  // Validation functions
  const validateAadhaar = (number) => {
    const cleanNumber = number.replace(/\D/g, '');
    return cleanNumber.length === 12;
  };

  const formatAadhaar = (value) => {
    const numbers = value.replace(/\D/g, '');
    const match = numbers.match(/^(\d{0,4})(\d{0,4})(\d{0,4})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(group => group).join('-');
    }
    return numbers;
  };

  const handleAadhaarChange = (e) => {
    const formatted = formatAadhaar(e.target.value);
    setAadhaarData(prev => ({ ...prev, number: formatted }));
    
    if (errors.aadhaar) {
      setErrors(prev => ({ ...prev, aadhaar: '' }));
    }
  };

  const handleFileUpload = (file, type) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, [type]: 'Unsupported file type.' }));
      return false;
    }
    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, [type]: 'File size exceeds 5MB.' }));
      return false;
    }
    setErrors(prev => ({ ...prev, [type]: '' }));
    if (type === 'aadhaarFile') {
      setAadhaarData(prev => ({ ...prev, file }));
    } else if (type === 'marksheetFile') {
      setEducationData(prev => ({ ...prev, marksheet: file }));
    }
    return true;
  };

  const handleAadhaarFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file, 'aadhaarFile');
    }
  };

  const handleMarksFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file, 'marksheetFile');
    }
  };

  // Drag events for file upload
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0], type);
      e.dataTransfer.clearData();
    }
  };

  const validateAadhaarPage = () => {
    const cleanNumber = aadhaarData.number.replace(/\D/g, '');
    const newErrors = {};
    if (cleanNumber.length !== 12) {
      newErrors.aadhaar = 'Aadhaar number must be 12 digits.';
    }
    if (!aadhaarData.file) {
      newErrors.aadhaarFile = 'Please upload Aadhaar card file.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEducationPage = () => {
  const newErrors = {};
  if (!educationData.board) newErrors.board = 'Please select board.';
  if (!educationData.class) newErrors.class = 'Please select class.';

  const marksNum = Number(educationData.marks);
  if (
    educationData.marks === '' ||
    isNaN(marksNum) ||
    marksNum < 0 ||
    marksNum > 100
  ) {
    newErrors.marks = 'Please enter valid marks between 0 and 100.';
  }

  if (!educationData.marksheet) newErrors.marksheet = 'Please upload marksheet.';

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleNext = () => {
    if (currentPage === 'aadhaar') {
      if (validateAadhaarPage()) setCurrentPage('education');
    }
  };

  const handleBack = () => {
    if (currentPage === 'education') setCurrentPage('aadhaar');
  };
  const navigate=useNavigate()
const handleSubmit = async () => {
  if (!validateEducationPage()) return;

  const formData = new FormData();
  formData.append('aadhaar_number', aadhaarData.number);
  formData.append('aadhaar_file', aadhaarData.file);
  formData.append('board', educationData.board);
  formData.append('student_class', educationData.class);
  formData.append('marks', educationData.marks);
  formData.append('marksheet_file', educationData.marksheet);

  try {
    const response = await fetch('http://127.0.0.1:8000/api/education/', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Submission failed:', error);
      alert('Submission failed.');
    } else {
      navigate('/thanks')
    }
  } catch (err) {
    console.error('API error:', err);
    alert('Something went wrong.');
  }
};

  return (
    <div className="page-container">
      <div className="container">
        {/* Progress Bar */}
        <div className="progress-container" aria-label="Progress">
          <div className="progress-bar">
            {/* Step 1 */}
            <div className={`progress-step ${currentPage === 'aadhaar' ? 'progress-step-active' : currentPage === 'education' ? 'progress-step-completed' : ''}`}>
              <div className={`progress-circle ${currentPage === 'aadhaar' ? 'progress-circle-active' : currentPage === 'education' ? 'progress-circle-completed' : ''}`} aria-current={currentPage === 'aadhaar'}>
                1
              </div>
              Aadhaar
            </div>
            <div className={`progress-line ${currentPage === 'education' ? 'progress-line-active' : ''}`} aria-hidden="true" />
            {/* Step 2 */}
            <div className={`progress-step ${currentPage === 'education' ? 'progress-step-active' : ''}`}>
              <div className={`progress-circle ${currentPage === 'education' ? 'progress-circle-active' : ''}`} aria-current={currentPage === 'education'}>
                2
              </div>
              Education
            </div>
          </div>
        </div>

        {/* Page Content */}
        {currentPage === 'aadhaar' && (
          <section aria-labelledby="aadhaar-header" className="card" role="form">
            <header className="card-header">
              <div className="icon-container icon-container-blue" aria-hidden="true">
                <User size={32} color="#4338ca" />
              </div>
              <h1 id="aadhaar-header" className="title">Aadhaar Number</h1>
              <p className="subtitle">Enter your Aadhaar number and upload a copy of your Aadhaar card (PDF, JPG, PNG).</p>
            </header>

            <div className="form-group">
              <label htmlFor="aadhaarNumber" className="label">Aadhaar Number</label>
              <input
                id="aadhaarNumber"
                name="aadhaarNumber"
                type="text"
                maxLength={14}
                placeholder="1234-5678-9012"
                className={`input input-large ${errors.aadhaar ? 'input-error' : ''}`}
                value={aadhaarData.number}
                onChange={handleAadhaarChange}
                aria-invalid={errors.aadhaar ? 'true' : 'false'}
                aria-describedby={errors.aadhaar ? 'aadhaar-error' : undefined}
                inputMode="numeric"
              />
              {errors.aadhaar && <p id="aadhaar-error" className="error-message"><AlertCircle size={16} /> {errors.aadhaar}</p>}
            </div>

            <div
              className={`file-upload-area ${dragActive ? 'file-upload-area-active' : ''} ${aadhaarData.file ? 'file-upload-area-success' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'aadhaarFile')}
              tabIndex={0}
              aria-label="Upload Aadhaar card file"
            >
              <input
                type="file"
                accept=".pdf,image/jpeg,image/png"
                className="file-upload-input"
                onChange={handleAadhaarFileChange}
                aria-describedby={errors.aadhaarFile ? 'aadhaar-file-error' : undefined}
              />
              {!aadhaarData.file ? (
                <div className="file-upload-content">
                  <Upload size={28} />
                  <p className="file-upload-text">Drag and drop or click to upload your Aadhaar card</p>
                  <p className="file-upload-subtext">(Max size 5MB, PDF/JPG/PNG)</p>
                </div>
              ) : (
                <div className="file-upload-content file-upload-content-success">
                  <CheckCircle size={28} />
                  <p className="file-upload-text" aria-live="polite">File uploaded: {aadhaarData.file.name}</p>
                </div>
              )}
            </div>
            {errors.aadhaarFile && <p id="aadhaar-file-error" className="error-message"><AlertCircle size={16} /> {errors.aadhaarFile}</p>}

            <div className="button-container button-container-end">
              <button type="button" className="button button-primary" onClick={handleNext} aria-label="Go to education page">
                Next <ArrowRight size={18} />
              </button>
            </div>
          </section>
        )}

        {currentPage === 'education' && (
          <section aria-labelledby="education-header" className="card" role="form">
            <header className="card-header">
              <div className="icon-container icon-container-purple" aria-hidden="true">
                <GraduationCap size={32} color="#7c3aed" />
              </div>
              <h1 id="education-header" className="title">Education Details</h1>
              <p className="subtitle">Select your board, class, and stream. Upload your marksheet (PDF, JPG, PNG).</p>
            </header>

            <div className="grid-cols-2">
              <div className="form-group">
                <label htmlFor="board" className="label">Board</label>
                <select
                  id="board"
                  name="board"
                  className={`select ${errors.board ? 'input-error' : ''}`}
                  value={educationData.board}
                  onChange={e => setEducationData(prev => ({ ...prev, board: e.target.value }))}
                  aria-invalid={errors.board ? 'true' : 'false'}
                  aria-describedby={errors.board ? 'board-error' : undefined}
                >
                  <option value="">Select Board</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="State Board">State Board</option>
                </select>
                {errors.board && <p id="board-error" className="error-message"><AlertCircle size={16} /> {errors.board}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="class" className="label">Class</label>
                <select
                  id="class"
                  name="class"
                  className={`select ${errors.class ? 'input-error' : ''}`}
                  value={educationData.class}
                  onChange={e => setEducationData(prev => ({ ...prev, class: e.target.value }))}
                  aria-invalid={errors.class ? 'true' : 'false'}
                  aria-describedby={errors.class ? 'class-error' : undefined}
                >
                  <option value="">Select Class</option>
                  <option value="10">10th</option>
                  <option value="12">12th</option>
                </select>
                {errors.class && <p id="class-error" className="error-message"><AlertCircle size={16} /> {errors.class}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="marks" className="">Marks Obtained</label>
                <input
                  id="marks"
                  name="marks"
                  type="number"
                  min="0"
                  max="100"
                  className={`input ${errors.marks ? 'input-error' : ''}`}
                  value={educationData.marks}
                  onChange={e => setEducationData(prev => ({ ...prev, marks: e.target.value }))}
                  aria-invalid={errors.marks ? 'true' : 'false'}
                  aria-describedby={errors.marks ? 'marks-error' : undefined}
                />
                {errors.marks && <p id="marks-error" className="error-message"><AlertCircle size={16} /> {errors.marks}</p>}
              </div>
            </div>

            <div
              className={`file-upload-area ${dragActive ? 'file-upload-area-active' : ''} ${educationData.marksheet ? 'file-upload-area-success' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'marksheetFile')}
              tabIndex={0}
              aria-label="Upload marksheet file"
            >
              <input
                type="file"
                accept=".pdf,image/jpeg,image/png"
                className="file-upload-input"
                onChange={handleMarksFileChange}
                aria-describedby={errors.marksheet ? 'marksheet-error' : undefined}
              />
              {!educationData.marksheet ? (
                <div className="file-upload-content">
                  <Upload size={28} />
                  <p className="file-upload-text">Drag and drop or click to upload your marksheet</p>
                  <p className="file-upload-subtext">(Max size 5MB, PDF/JPG/PNG)</p>
                </div>
              ) : (
                <div className="file-upload-content file-upload-content-success">
                  <CheckCircle size={28} />
                  <p className="file-upload-text" aria-live="polite">File uploaded: {educationData.marksheet.name}</p>
                </div>
              )}
            </div>
            {errors.marksheet && <p id="marksheet-error" className="error-message"><AlertCircle size={16} /> {errors.marksheet}</p>}

            <div className="button-container">
              <button
                type="button"
                className="button button-outline"
                onClick={handleBack}
                aria-label="Go back to Aadhaar page"
              >
                <ArrowLeft size={18} /> Back
              </button>

              <button
                type="button"
                className="button button-primary"
               onClick={()=>{handleSubmit()
                console.log("submitting...");
                
               }}
                aria-label="Submit education details"
              >
                Submit
              </button>
             
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AadhaarEducationPages;
