import {useState} from 'react';
import "./App.css"
import Header from './components/Header';
const App = () => {
  const [data, setData] = useState({data: []});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));

      setData(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(data);

  return (
    
    <div className='content'>
      <Header />
      {err && <h2>{err}</h2>}

      <button className='btn' onClick={handleClick}>Fetch data</button>

      {isLoading && <h2>Loading...</h2>}

      {data.data.map(person => {
        return (
          <div key={person.id}>
            <h2>{person.id}</h2>
            <h2>{person.email}</h2>
            <h2>{person.first_name}</h2>
            <h2>{person.last_name}</h2>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default App;
