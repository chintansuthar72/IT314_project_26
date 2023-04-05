import React, { useState } from 'react';
import './CourseCreation.css';

function CourseCreation() {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');
  const [instructorName, setInstructorName] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`Submitted: Course Name: ${courseName}, Course Code: ${courseCode}, Description: ${description}, Instructor Name: ${instructorName}`);
  }

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
        <div className="form-group">
          <label htmlFor="instructorName">Instructor Name</label>
          <input
            type="text"
            name="instructorName"
            value={instructorName}
            onChange={(event) => setInstructorName(event.target.value)}
          />
        </div>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
}

export default CourseCreation;
