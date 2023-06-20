import React, {useState,useEffect} from 'react';
import axios from 'axios';



function Debits(props){
    //set the debit description
    const [debitDescrip, setDebitDescrp]=useState('');
    const[debitAmount,setDebitAmount] = useState('');
    
    //function to handle to add the debit to the account
    const HandleAddDebit = (event)=>{
        event.preventDefault();
        const newDebit={
            description:debitDescrip,
            amount:Number(debitAmount),
            date: new Date().toISOString()
        };
        props.addDebit(newDebit);
        //reset to null
        setDebitDescrp('');
        setDebitAmount('');

        
    };

    return(
        <div>
            <h1>Debits</h1>
            
            <form onSubmit={HandleAddDebit}>
                <input type="text"
                       value={debitDescrip}
                       onChange={e=>setDebitDescrp(e.target.value)}
                       placeholder='Enter Debit Description'
                       required/>
                <input type="number"
                       value={debitAmount}
                       onChange={e=>setDebitAmount(e.target.value)}
                       placeholder='Enter Debit Amount'
                       required/>
                <button type="submit">Add Debit</button>
            </form>
             {/**In here , we use the map function to show the list */}
             <h1 className='history'>History Record</h1>
            {props.debits.map((debit,index)=>{
                return(
                <div key={index} className='list'>
                    <h3>Description:{debit.description}</h3>
                    <p>Amount:{debit.amount}</p>
                    <p>Date:{debit.date}</p>
                </div>
                )
            })}
        </div>
    );

}
export default Debits;