import React, { useEffect, useState } from "react";
import './App.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


let urlQuote = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/";

const colorsArr = ['4FC1FF', "E8B9AB", 'CB769E', '69995D', 'D2D7DF', '3AA7A3', 'ECA400', '006992', 'AFECE7', '81F499', '890620', 'B6465F', '8ACDEA']
const getRandomColor = () => {
  return colorsArr[Math.floor(Math.random() * colorsArr.length)];
}

const App = () => {
  const [quoteArr, setQuotesArr] = useState([]);
  const [quote, setQuote] = useState({ quote: "Loading...", author: "Please wait" }); // Изначальная цитата
  const [color, setColor] = useState(getRandomColor())

  const getRandomQuote = () => {
    return quoteArr[Math.floor(Math.random() * quoteArr.length)];
  }



  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArr(parsedJSON.quotes);
  };

  useEffect(() => {
    fetchQuotes(urlQuote);
    // eslint-disable-next-line
  }, [urlQuote]);

  useEffect(() => {
    if (quoteArr.length > 0) {
      setQuote(getRandomQuote()); // Сразу после загрузки данных устанавливаем случайную цитату
    }
    // eslint-disable-next-line
  }, [quoteArr]); // Перезапуск, когда quoteArr меняется

  const handleNewQuote = () => {
    setQuote(getRandomQuote()); // При нажатии генерировать новую случайную цитату
  };

  const handleNewColor = () => {
    setColor(getRandomColor()); // При нажатии генерировать новую случайную цитату

  };
  return (

    <div className="App" style={{ backgroundColor: '#' + color }}>
      <div id="quote-box" style={{ color: '#' + color }}>
        <p id="text">"{quote.quote}"</p>
        <p id="author">- {quote.author}</p>

        <div className="buttons">
          <a
            href={encodeURI(`https://twitter.com/intent/tweet?text=${quote.quote}`)}
            id="tweet-quote"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#' + color }}
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <button id="new-quote"
            onClick={() => {
              handleNewColor();
              handleNewQuote()
            }}
            style={{ color: '#' + color }}>New Quote</button>
        </div>
      </div>
    </div>
  );
};

export default App;
