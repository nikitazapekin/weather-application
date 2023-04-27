import React, { useState, useEffect } from 'react';

const WeatherForecast = () => {
  const [latitude, setLatitude] = useState(53.91);
  const [longitude, setLongitude] = useState(27.56);
  const [data, setData] = useState({});
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, [latitude, longitude]);

  const handleInput = (event) => {
    const value = event.target.value.toLowerCase();
    const tempMatches = data.hourly?.time?.filter(temp => temp.toLowerCase().startsWith(value));
    setMatches(tempMatches?.slice(0, 10) || []);
  };

  return (
    <div>
      <form>
        <input type="text" onChange={handleInput} />
        <ul>
          {matches.map((match, index) => (
            <li key={index}>{match}</li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default WeatherForecast;