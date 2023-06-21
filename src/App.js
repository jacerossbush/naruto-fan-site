import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './index.css';
import CharacterList from './CharacterList';


function App() {


  // to catch the api for each character as they change
  const[character, setCharacter] = useState({});

  // const[characters, setCharacters] = useState(CharacterList);

  // to change which character is displayed 
  const[characterId, setCharacterId] = useState(17);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/characters/${characterId}/full`)
      .then(response => response.json())
      .then(json => setCharacter(json))
      .catch(error => console.error(error));
  }, [characterId]);


  // simplify the data that is being displayed with variables
  const characterImage = character.data?.images?.jpg?.image_url;
  const characterName = character.data?.name;
  const characterAbout = character.data?.about;

  
  return (
    <div className="App">
      <Box sx={{
        height: '100vh',
        width: '100%',
        display: "flex"
        }}
        >
        <Box
          sx={{
            width: '25%',
            height: '100vh',
            overflow: 'scroll'
          }}
          >
            <List>
            {CharacterList.map((character) => 
            (
              <ListItem disablePadding>
                <ListItemButton component="a" onClick={() => setCharacterId(character.id)}>
                  <ListItemText primary={character.label} />
                </ListItemButton>
              </ListItem>
            ))}
            
            </List>
        </Box>
        <Box
          sx={{
            width: '75%'
          }}
        >
          <h1>Naruto facts</h1>
          <img src={characterImage} alt="" />
          <h2>{characterName}</h2>
          <p>{characterAbout}</p>
        </Box>
      </Box>
    </div>
  );
}

export default App;
