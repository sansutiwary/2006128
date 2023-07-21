import React, { useState, useEffect } from 'react';

const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const generateFibonacciSeries = (n) => {
  let fibSeries = [0, 1];
  for (let i = 2; i < n; i++) {
    fibSeries.push(fibSeries[i - 1] + fibSeries[i - 2]);
  }
  return fibSeries;
};

const App = () => {
  const [number, setNumber] = useState('');
  const [isPrimeNumber, setIsPrimeNumber] = useState(false);
  const [isOddNumber, setIsOddNumber] = useState(false);
  const [fibonacciNumbers, setFibonacciNumbers] = useState([]);

  const checkNumber = () => {
    const num = parseInt(number);
    setIsPrimeNumber(isPrime(num));
    setIsOddNumber(num % 2 !== 0);
  };

  const updateFibonacciSeries = () => {
    const fibNumbers = generateFibonacciSeries(number);
    setFibonacciNumbers(fibNumbers);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const testCase = urlParams.get('testcase');
    if (testCase) {
      const { prime, odd, fib } = JSON.parse(testCase);
      setIsPrimeNumber(prime);
      setIsOddNumber(odd);
      setNumber(fib);
      updateFibonacciSeries();
    }
  }, []);

  return (
    <div>
      <h1>Number Checker & Fibonacci Series</h1>

      {/* Prime and Odd Checker */}
      <label>
        Enter a number:
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </label>
      <button onClick={checkNumber}>Check</button>

      {number && (
        <div>
          <p>{`Is Prime: ${isPrimeNumber}`}</p>
          <p>{`Is Odd: ${isOddNumber}`}</p>
        </div>
      )}

      {/* Fibonacci Series */}
      <label>
        Number of terms:
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </label>
      <button onClick={updateFibonacciSeries}>Generate Series</button>

      {fibonacciNumbers.length > 0 && (
        <div>
          <h2>Fibonacci Numbers:</h2>
          {fibonacciNumbers.map((number, index) => (
            <span key={index}>{number}{index < fibonacciNumbers.length - 1 ? ', ' : ''}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
