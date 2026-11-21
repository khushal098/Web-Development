import React from "react";
import "./App.css";

function Card({ image, title, description }) {
  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://placehold.co/300x300/222/8b7cf6?text=${encodeURIComponent(title)}`;
  };

  return (
    <div className="card-border">
      <div className="card">
        <img
          className="card-image"
          src={image}
          alt={title}
          width="112"
          height="112"
          loading="lazy"
          onError={handleImageError}
        />
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
}

const cardsData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Card ${i + 1}`,
  description: `This is card ${i + 1} description`,
  image: `https://picsum.photos/seed/card${i + 1}/300/300`,
}));

function App() {
  return (
    <div className="app">
      <div className="card-grid">
        {cardsData.map(({ id, title, description, image }) => (
          <Card
            key={id}
            title={title}
            description={description}
            image={image}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
