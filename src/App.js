import { useEffect, useState } from 'react';
import './index.css';


function App() {

  // to catch the api that calls all the characters
  const[characterList, setCharacterList] = useState({});

  // to catch the api for each character as they change
  const[character, setCharacter] = useState({});

  // to change which character is displayed 
  const[characterId, setCharacterId] = useState(17);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/20/characters`)
      .then(response => response.json())
      .then(json => setCharacterList(json))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/characters/${characterId}/full`)
      .then(response => response.json())
      .then(json => setCharacter(json))
      .catch(error => console.error(error));
  }, [characterId]);

  // catch the array of characters
  const characters = characterList?.data;

  // simplify the data that is being displayed with variables
  const characterImage = character.data?.images?.jpg?.image_url;
  const characterName = character.data?.name;
  const characterAbout = character.data?.about;

  
  return (
    <div className="App">
      <h1>Naruto facts</h1>
      <img src={characterImage} alt="" />
      <h2>{characterName}</h2>
      <p>{characterAbout}</p>
      <button onClick={() => setCharacterId(characterId === 14 ? 17 : 14)}>Change characters</button>
       <h1>{characters[0].character.mal_id}</h1>
       {characters.map(item => (
        <>
          <button onClick={()=> setCharacterId(item.character.mal_id)}>{item.character.name}</button>
        </>

       ))}



    </div>
  );
}

export default App;
