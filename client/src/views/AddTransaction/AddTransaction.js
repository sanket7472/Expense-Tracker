import React, { useEffect, useState } from 'react'
import './AddTransaction.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

function AddTransaction() {
    const [user , setUser ] = useState('')
    const [ title , setTitle ] = useState('')
    const [ amount , setAmount ] = useState(' ')
    const [ type , setType ] = useState(' ')
    const [ category , setCategory ] = useState(' ')

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if(currentUser){
            setUser(currentUser)
        }
        if(!currentUser){
            window.location.href = '/login'
        }
    }, [ ])

    const AddTransaction = async () =>{
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/transaction` ,{
            title,
            amount,
            category,
            type,
            user: user._id
        })
        toast.success(response.data.message)

       
        setTimeout(() => {
            window.location.href = '/'
        },2000)
    }
    
    return (
        <div>
            <h1 className='title'>Add Transactions For {user.fullName}</h1>

            <form className='FormContainer'>
                <input
                    type='text'
                    required
                    placeholder='Title'
                    className='userInput'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type='number'
                    placeholder='Amount'
                    className='userInput'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                
                <select 
                className='userInput'
                value={type}
                onChange={(e) => setType(e.target.value)}
                >
                    <option value='credit'>Income</option>
                    <option value='debit'>Expense</option>
                </select>

                <select className='userInput'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value='food'>Food</option>
                    <option value='rent'>Rent</option>
                    <option value='utilities'>Utilities</option>
                    <option value='entertainment'>Entertainment</option>
                    <option value='clothing'>Clothing</option>
                    <option value='health'>Health</option>
                    <option value='salary'>Salary</option>
                    <option value='pocket-money'>Pocket Money</option>
                </select>

                <button 
                type='button' 
                className='btnAuth'
                onClick={AddTransaction}
                >
                    Add
                </button>                
            </form>
            <Toaster/>
        </div>
    )
}

export default AddTransaction
