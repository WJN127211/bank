import React from 'react';

//in app.js we pass the balance as the probs, use the function in app.js to get the balance
function AccountBalance({balance}){
    return(
        <div className='balance'>
            <h2>Account Balance: {balance}</h2>
        </div>
    );
}

export default AccountBalance;