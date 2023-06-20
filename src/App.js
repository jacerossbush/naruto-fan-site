import { useEffect, useState } from 'react';
import './index.css';


function App() {

  const[characterList, setCharacterList] = useState({});

  const[character, setCharacter] = useState({});
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

  const characters = characterList?.data;
  

  const characterImage = character.data?.images?.jpg?.image_url;
  const characterName = character.data?.name;
  const characterAbout = character.data?.about;
  console.log(characterList)
  console.log(characters);
  return (
    <div className="App">
      <h1>Naruto facts</h1>
      <img src={characterImage} alt="" />
      <h2>{characterName}</h2>
      <p>{characterAbout}</p>
      <button onClick={() => setCharacterId(characterId === 14 ? 17 : 14)}>Change characters</button>     
       {/* <h1>{characters[0].character.mal_id}</h1> */}
       {characters.map(item => (
        <>
          <h3>{item.character.name}</h3>
        </>

       ))}
      
      

    </div>
  );
}

export default App;
