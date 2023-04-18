// import React, { useState } from 'react'

// export default function About(props) {
    
//     const [mystyle, setmystyle] = useState({color: 'black',backgroundColor: 'white',});

    
//   return (
//     <div className='container' style={mystyle}>
//         {/* <h1>About Us Page.{props.Item}</h1> */}
//         <div className="accordion" id="accordionExample">
//             <div className="accordion-item">
//                 <h2 className="accordion-header">
//                 <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={mystyle}>
//                     Accordion Item #1
//                 </button>
//                 </h2>
//                 <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
//                 <div className="accordion-body" style={mystyle}>
//                     <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
//                 </div>
//                 </div>
//             </div>
//             <div className="accordion-item">
//                 <h2 className="accordion-header">
//                 <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style={mystyle}>
//                     Accordion Item #2
//                 </button>
//                 </h2>
//                 <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
//                 <div className="accordion-body" style={mystyle}>
//                     <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
//                 </div>
//                 </div>
//             </div>
//             <div className="accordion-item">
//                 <h2 className="accordion-header">
//                 <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style={mystyle}>
//                     Accordion Item #3
//                 </button>
//                 </h2>
//                 <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
//                 <div className="accordion-body" style={mystyle}>
//                     <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
//                 </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }



import React, { useState } from 'react';

const Announcement = ({ title, content, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  const handleSaveClick = () => {
    onEdit(editedTitle, editedContent);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="announcement">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{title}</h2>
          <p>{content}</p>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </>
      )}
    </div>
  );
};

const About = ({announcements}) => {
    console.log(announcements);
    return (
        // {
        //     announcements.map((announcement) => (
        //         <Announcement key={announcement.id} {...announcement} />
        //     ))
        // }   
        "Announcements"         
    )
    ;
}

export default About;