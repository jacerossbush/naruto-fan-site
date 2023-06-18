import { useEffect, useState } from 'react';
import './index.css';


function App() {

  const[anime, setAnime] = useState({});
  const[characterId, setCharacterId] = useState(17);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/characters/${characterId}/full`)
      .then(response => response.json())
      .then(json => setAnime(json))
      .catch(error => console.error(error));
  }, [characterId]);

  const animeImage = anime.data?.images?.jpg?.image_url;
  const animeName = anime.data?.name;
  const animeAbout = anime.data?.about;
  console.log(anime);
  return (
    <div className="App">
      <h1>Naruto facts</h1>
      <img src={animeImage} alt="" />
      <h2>{animeName}</h2>
      <p>{animeAbout}</p>
      

    </div>
  );
}

export default App;
