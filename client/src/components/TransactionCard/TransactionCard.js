import React from 'react'
import './TransactionCard.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'

function TransactionCard({_id , title , amount , category ,type , createdAt , loadTransactions}) {

  const deleteTransactions = async () =>{
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/transaction/${_id}` )
    
    toast.success(response.data.message);

    loadTransactions()
  }
  return (
    <div className='Transaction-card'>
    
      <h1 className='TransactionCardTitle'>{title}</h1>

      <span  className="TransactionCardDate">
        {new Date(createdAt).toLocaleString()}
      </span>

      <span className='TransactionCardCategory'>
        {category}
      </span>

      <span className='TransactionCardAmount' style={{
        color: type === "credit" ? "green":"red"
      }}>
        {type === "credit" ? "+": "-"}
        {amount}
      </span>

      <button 
      className='transaction-card-delete'
      onClick={deleteTransactions}
      >
        Delete
      </button>
     
     <Toaster/>

    </div>
  )
}

export default TransactionCard
