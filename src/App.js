
import './App.css';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import loadgif from "./Assets/Img/Loading.gif";

function App() {
  let apikey = "cde7fa527263b5ede2646594c274eeae";
  let [wcity, setWcity] = useState("");
  let [wdetails, setWDetails] = useState();
  let [isloading, setIsloading] = useState(false);

  let getData = (event) => {
    setIsloading(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${wcity}&appid=${apikey}&units=metric`)
      .then((res) => res.json())
      .then((finalres) => {
        if (finalres) {
          if (finalres.cod === "404") {
            setWDetails(undefined);
          }
          else {
            setWDetails(finalres);
          }
        }
      });
    event.preventDefault();
    setWcity('');
    setIsloading(false);
  };

  return (
    <div className="Maindiv text-white">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-8 col-lg-6 col-xl-4">
          <h3 className="mb-4 pb-1 fw-normal text-dark text-center">Check the weather forecast</h3>
          <form onSubmit={getData}>
            <div className="CityInput d-flex rounded mb-5">
              <input type="search" required value={wcity} onChange={(e) => setWcity(e.target.value)} className="form-control rounded mx-1" placeholder="City" />
              <Button type='submit' className='mx-1 btn'>Submit</Button>
            </div>

          </form>

          <div className="Wcard mx-1">
            <div className={isloading ? "Loadgif" : "visually-hidden"}>
              <img src={loadgif} alt="loading gif" />
            </div>
            <div className="card-body p-4">
              {
                (wdetails !== undefined)
                  ?
                  <>
                    <h4 className="mb-2 sfw-normal">{wdetails.name}, {wdetails.sys.country}</h4>
                    <p className="mb-2">Current temperature: <strong>{wdetails.main.temp} °C</strong></p>
                    <p className='mb-2'> Feels like: <strong>{wdetails.main.feels_like} °C</strong></p>
                    <p className='mb-2'>Max: <strong>{wdetails.main.temp_max}°C</strong>, Min: <strong>{wdetails.main.temp_min}°C</strong></p>

                    <div className="d-flex align-items-center">
                      <p className="mb-0 me-4 text-capitalize">{wdetails.weather[0].description}</p>
                      <img src={`https://openweathermap.org/img/wn/${wdetails.weather[0].icon}.png`} alt='an img' />

                    </div>
                  </>
                  :
                  <h3>No data found</h3>

              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
