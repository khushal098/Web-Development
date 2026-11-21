import useFetch from "./hooks/useFetch";
import "./App.css";

const API_URL = "https://jsonplaceholder.typicode.com/photos?_limit=40";

function App() {
  const { data, loading, error } = useFetch(API_URL);

  if (loading) return <h2 className="status">Loading...</h2>;
  if (error) return <h2 className="status">Error: {error}</h2>;

  return (
    <div className="container">
      <h1>Photos</h1>
      <div className="grid">
        {data.map((photo) => (
          <div className="card" key={photo.id}>
            <img src={photo.url} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
