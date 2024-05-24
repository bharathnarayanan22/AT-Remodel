import React, { useState } from 'react';
import axios from 'axios';
import styles from './AddStudentForm.module.css';
import loadingGif from '/src/assets/loading.gif'; // Ensure you have the loading.gif in your project

const AddStudentForm = () => {
  const [studentName, setStudentName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [files, setFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const handleFileChange = (e) => {
    setPhotos(e.target.files);
    setFiles(Array.from(e.target.files)); // Update file state to show file names
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted

    const formData = new FormData();
    formData.append('name', studentName);
    formData.append('rollNo', rollNo);
    formData.append('email', email);
    for (let i = 0; i < photos.length; i++) {
      formData.append(`photo${i + 1}`, photos[i]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/students', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage(response.data.message);
      setStudentName('');
      setRollNo('');
      setEmail('');
      setPhotos([]);
      setFiles([]);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    } finally {
      setIsLoading(false); // Set loading to false once request is complete
    }
  };

  return (
    <div className={styles.formContainer}>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <img src={loadingGif} alt="Loading..." className={styles.loadingGif} />
        </div>
      )}
      <h2>Add Student</h2>
      {successMessage && <p className={`${styles.messageContainer} ${styles.successMessage}`}>{successMessage}</p>}
      {errorMessage && <p className={`${styles.messageContainer} ${styles.errorMessage}`}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className={styles.innerForm}>
        <div className={styles.inputContainer}>
          <label htmlFor="studentName" className={styles.label}>Student Name</label>
          <input
            type="text"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className={styles.inputField}
            required
          />
        
          <label htmlFor="rollNo" className={styles.label}>Roll No</label>
          <input
            type="text"
            id="rollNo"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className={styles.inputField}
            required
          />
        
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
            required
          />

          <label htmlFor="photos" className={styles.label}>Photos</label>
          <input
            type="file"
            id="photos"
            onChange={handleFileChange}
            className={styles.inputField}
            multiple
            required
          />
          {files.length > 0 && (
        <div className={styles.filePreviewContainer}>
          <h3>Uploaded Files:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
        </div>
        <button type="submit" className={styles.button}>Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentForm;
