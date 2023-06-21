import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
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
            overflowY: 'scroll'
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
            width: '75%',
            overflowY: 'scroll'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <img src={characterImage} style={{maxWidth: "250px"}} alt="" />

            <Typography variant="h2" gutterBottom>
              {characterName}
            </Typography>
          </Box>
          <Typography
            variant="body1" 
            gutterBottom
            sx={{
              padding: "20px"
            }}>
            {characterAbout}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default App;
