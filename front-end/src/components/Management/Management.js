// src/Coordinators.js
import React from "react";
import "./management.css";

const Coordinators = () => {
  // Manually defined data
  const coordinators = [
    {
      image: "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
      name: "Dr.Shreekanth R",
      title: "HOD MCA"
    },
    {
      image: "https://example.com/image2.jpg",
      name: "Ms.Joy Lavinya",
      title: "Event Coordinator"
    },
    {
      image: "https://example.com/image3.jpg",
      name: "Lakshmisagar R",
      title: "Sparks President"
    },
    {
      image: "https://example.com/image4.jpg",
      name: "Athreya BN",
      title: "Technical Secretary"
    },
    {
      image: "https://example.com/image5.jpg",
      name: "Akash GK",
      title: "Asst. Technical Secretary"
    },
    {
      image: "https://example.com/image6.jpg",
      name: "Jason R",
      title: "Graphic & Web Designer"
    }
  ];

  return (
    <div className="coordinators">
      {coordinators.map((coordinator, index) => (
        <div className="coordinator-card" key={index}>
          <img src={coordinator.image} alt={coordinator.name} className="coordinator-image" />
          <div className="coordinator-info">
            <h3>{coordinator.name}</h3>
            <p>{coordinator.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Coordinators;
