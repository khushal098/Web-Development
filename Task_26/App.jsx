import React from "react";
import "./App.css";

function Card({ image, title, description }) {
  return (
    <div className="card">
      <img className="card-image" src={image} alt={title} />
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
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
        {cardsData.map((card) => (
          <Card
            key={card.id}
            image={card.image}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
