import { useEffect, useState } from 'react';
import './index.css';


function App() {

  const[data, setData] = useState({});

  // useEffect(() => {
  //   fetch('https://api.jikan.moe/v4/characters/17/full')
  //     .then(response => response.json())
  //     .then(json => setData(json))
  //     .catch(error => console.error(error));
  // }, []);
  // console.log(data.data.images.jpg.image_url);
  return (
    <div className="App">
      <h1>Naruto facts</h1>
      {/* <img src={data.data["images"].jpg.image_url} alt="" /> */}
      

    </div>
  );
}

export default App;
