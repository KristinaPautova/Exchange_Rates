import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

const API = 'https://www.cbr-xml-daily.ru/daily_json.js';


function App() {
 const [result, setResult] = useState({})
    const [value,setValue] = useState('USD');
    const [num,setNum] = useState('');

  const getCurrencies = async () => {
    const {data} = await axios.get(API);
    console.log(data.Valute)
    setResult(data.Valute)
  }

  useEffect(() => {
    getCurrencies()
  },[])

  return (
      <div className="container pt-5 pb-5">
        {result.USD ? (
            <div className="row justify-content-center">
              <div className="col-6">

                <div className="card p-3">
                  <form>
                    <h1 className="h2 mb-4">Конвертер валют</h1>

                    <div className="courses">
                      <div className="course-item card card-body">
                        <div className="course-item-title">Курс USD</div>
                        <div className={result.KZT.Value <= result.KZT.Previous ? 'course-item-value top' : 'course-item-value bottom' }  data-value="USD">{result.USD.Value.toFixed(2)}</div>
                      </div>
                      <div className="course-item card card-body">
                        <div className="course-item-title">Курс EUR</div>
                        <div className={result.KZT.Value <= result.KZT.Previous ? 'course-item-value top' : 'course-item-value bottom' }  data-value="EUR">{result.EUR.Value.toFixed(2)}</div>
                      </div>
                      <div className="course-item card card-body">
                        <div className="course-item-title">Курс KZT</div>
                        <div className={result.KZT.Value <= result.KZT.Previous ? 'course-item-value top' : 'course-item-value bottom' } data-value="GBP">{result.KZT.Value.toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="row mb-1">
                      <div className="col">
                        <label htmlFor="name">Отдаю:</label>
                        <select
                            disabled
                            className="form-control lop"
                            id="exampleFormControlSelect1"
                        >
                          <option value="RUB" selected>RUB — Рубли</option>
                        </select>
                      </div>
                      <div className="col">
                        <label htmlFor="name">Получаю:</label>
                        <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        >
                          <option value="USD">USD — Доллар США</option>
                          <option value="EUR">EUR — Евро</option>
                          <option value="KZT">KZT — Казахстанский тенге</option>
                            {Object.keys(result).map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            id="name"
                            autoFocus
                            value={num}
                            onChange={(e) => setNum(e.target.value)}
                        />
                      </div>
                      <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            id="name"
                            value={(parseFloat(num || 0)/ result[value].Value).toFixed(2)}
                            // onChange={() => setRates()}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        ): (<h1>loading...</h1>)}

      </div>
  );
}

export default App;
