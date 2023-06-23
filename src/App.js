import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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
    
    <Box sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      background: 'rgb(255,148,50)',
      background: 'radial-gradient(circle, rgba(255,148,50,1) 0%, rgba(0,0,0,1) 100%)'
      }}
      >
      <Box
        sx={{
          margin: '10px auto',
          padding: '10px',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: '20px'
        }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={CharacterList}
          sx={{ 
            width: 300,
            margin: '25px auto',
          }}
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
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component='img'
              sx={{ height: 500}}
              image={characterImage}
              title={characterName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {characterName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {characterAbout}
              </Typography>
            </CardContent>
          </Card>
      </Box>
    </Box>
  
  );
}

export default App;
