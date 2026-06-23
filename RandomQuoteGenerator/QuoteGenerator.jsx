import React, { useEffect, useState } from "react";

const QuoteGenerator = () => {
  const [quotes, setQuotes] = useState([]);

  const handleClick = async () => {
    const result = await fetch("https://dummyjson.com/quotes/random");
    const data = await result.json();
    console.log(data);
    setQuotes([data]);
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <>
      {quotes.map(({ id, author, quote }) => (
        <div>
          <h1 key={id}>
            {quote} - {author}
          </h1>
          <button onClick={handleClick}>New Quote</button>
        </div>
      ))}
    </>
  );
};

export default QuoteGenerator;
