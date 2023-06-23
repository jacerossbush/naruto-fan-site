import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './index.css';
import CharacterList from './CharacterList';


function App() {


  // to catch the api for each character as they change
  const[character, setCharacter] = useState({});

  const [value, setValue] = useState('');

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
        }}
        >
        {/* <Box
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
        </Box> */}
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={CharacterList}
            sx={{ width: 300 }}
            value={value}
            onChange={(event, newValue) => {
              if (newValue) {
                setCharacterId(newValue.id);
              }
              setValue(newValue);
            }}

            renderInput={(params) => 
            <TextField {...params} label="Characters" />}
          />
          <Box>
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
