import React, { useState } from 'react';
import './CourseCreation.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CourseCreation() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('token') !== null);
  React.useEffect(() => {
    if(localStorage.getItem('token') == null){
      navigate('/');
    }
  },[isLoggedIn]);

  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');
  const [instructorName, setInstructorName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name : courseName,
      courseCode: courseCode,
      description: description,
    });
    const signupData = {
      name : courseName,
      courseCode: courseCode,
      description: description,
    };
    axios.post('http://localhost:5000/course',signupData, {headers:{'Authorization':localStorage.getItem('token')}})
    .then((resp)=>{   // if no error
      console.log(resp);
      // setError('Signed up successfully!'); // subject to change
      // if(resp.response.status == 401){
      //   setError('You can not create a course!');
      // } else {
        navigate('/dashboard');
      // }
    })
    .catch((err)=>{
      console.log(err);
      setError(err.response.data.message);
    })
  };

  return (
    <div className="course-creation">
      <h1>Create a Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="courseName">Course Name</label>
          <input
            type="text"
            name="courseName"
            value={courseName}
            onChange={(event) => setCourseName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseCode">Course Code</label>
          <input
            type="text"
            name="courseCode"
            value={courseCode}
            onChange={(event) => setCourseCode(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        {/* <div className="form-group">
          <label htmlFor="instructorName">Instructor Name</label>
          <input
            type="text"
            name="instructorName"
            value={instructorName}
            onChange={(event) => setInstructorName(event.target.value)}
          />
        </div> */}
        <div className="form-group">
          <label style={{color:'red'}}>{error}</label>
        </div>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
}

export default CourseCreation;
