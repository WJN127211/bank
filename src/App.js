import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Debits from './components/Debits';
import Credits from './components/Credits';
import Home from './components/Home';
import axios from 'axios';
import AccountBalance from './components/AccountBalance';


function App() {
  //get the debits and credits from the api
  const [debits, setDebits] = useState([]);
  const [credits, setCredits] = useState([]);


//access the api to get the data, because, we consider the data is array, so we have to check whether the type is correct
  useEffect(() => {
    async function fetchDebits() {
      try {
        const response = await axios.get('https://bank-of-react-bxbys1cq8-ajlapid718.vercel.app/debits');
        if (Array.isArray(response.data)) {
          setDebits(response.data);
        } else {
          console.error('Debits response was not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching debits:', error);
      }
    }

    async function fetchCredits() {
      try {
        const response = await axios.get('https://bank-of-react-bxbys1cq8-ajlapid718.vercel.app/credits');
        if (Array.isArray(response.data)) {
          setCredits(response.data);
        } else {
          console.error('Credits response was not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching credits:', error);
      }
    }

    fetchDebits();
    fetchCredits();
}, []);

  //if we add the new debit or credit to the array, update the array
  const addDebit = (newdebit) => setDebits([...debits, newdebit]);
  const addCredit = (newcredit) => setCredits([...credits, newcredit]);

  const calaculateDebits = () => {
    let totalDebits = 0;
    //go through the debit, and add together
    for (let debit of debits) {
      totalDebits += debit.amount; //not sure the attribute

    }
    return totalDebits;
  }

  const calaculateCredits = () => {
    let totalCredits = 0;
    //go through the debit, and add together
    for (let credit of credits) {
      totalCredits += credit.amount; //not sure the attribute

    }
    return totalCredits;
  }

  //get the balance
  const calaculateBalance = () => {
    return calaculateDebits() - calaculateCredits();
  }

  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/debits">Debits</Link>
            </li>
            <li>
              <Link to="/credits">Credits</Link>
            </li>
          </ul>
        </nav>

        <AccountBalance balance={calaculateBalance()} />
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/debits" element={<Debits addDebit={addDebit} debits={debits} />} />
          <Route path="/credits" element={<Credits addCredit={addCredit} credits={credits} />} />
        </Routes>



      </div>

    </Router>

  );
}

export default App;
