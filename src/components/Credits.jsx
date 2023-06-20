import React, {useState,useEffect} from 'react';
import axios from 'axios';



function Credits(props){
    //set the credit description and amount
    const [creditDescrip, setCreditDescrp]=useState('');
    const[creditAmount,setCreditAmount] = useState('');
    
    //function to handle to add the creit to the account with details
    const HandleAddCredit = (event)=>{
        event.preventDefault();
        const newCredit={
            description:creditDescrip,
            amount:Number(creditAmount),
            date: new Date().toISOString()
        };
        props.addCredit(newCredit);
        
        setCreditDescrp('');
        setCreditAmount('');

        
    };

    return(
        <div>
            <h1>Credits</h1>
            {/**form to add the list of credit with details */}
            <form onSubmit={HandleAddCredit}>
                <input type="text"
                       value={creditDescrip}
                       onChange={e=>setCreditDescrp(e.target.value)}
                       placeholder='Enter Credit Description'
                       required/>
                <input type="number"
                       value={creditAmount}
                       onChange={e=>setCreditAmount(e.target.value)}
                       placeholder='Enter Credit Amount'
                       required/>
                <button type="submit">Add Credit</button>
            </form>
            {/**In here , we use the map function to show the list */}
            <h1 className='history'>History Record</h1>
            {props.credits.map((credit,index)=>{
                return(
                <div key={index} className='list'>
                    <h3>Description:{credit.description}</h3>
                    <p>Amount:{credit.amount}</p>
                    <p>Date:{credit.date}</p>
                </div>
                )
            })}
        </div>
    );

}
export default Credits;