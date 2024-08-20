import React, { useEffect, useState } from 'react'
import './Home.css'
import toast, { Toaster } from "react-hot-toast"
import axios from 'axios'
import TransactionCard from '../../components/TransactionCard/TransactionCard'

import ImgAdd from "./add.png"
import { Link } from 'react-router-dom'

function Home() {
  const [user, setUser] = useState(' ')
  const [transactions, setTransactions] = useState([])
  const [netIncome, setNetIncome] = useState(0)
  const [netExpense, setNetExpense] = useState(0)

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    if (currentUser) {
      setUser(currentUser)
    }

    if (!currentUser) {
      window.location.href = '/login'
    }
  }, [])

  const loadTransactions = async () => {

    if (!user._id) {
      return
    }

    toast.loading('Loading Transaction...')

    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/transactions?userId=${user._id}`)
    const allTransactions = response.data.data
    toast.dismiss()
    setTransactions(allTransactions)
  }

  useEffect(() => {
    loadTransactions()
  }, [user])

  useEffect(() => {
    let income = 0
    let expense = 0

    transactions.forEach((transaction) => {
      if (transaction.type === 'credit') {
        income += transaction.amount
      }
      else {
        expense += transaction.amount
      }
    })

    setNetIncome(income)
    setNetExpense(expense)
  }, [transactions])

  return (
    <div>
      <h1 className='greeting'>Hello {user.fullName}🤩</h1>
      <h2 className='heading'>Welcome To Expense Tracker</h2>

      <span
        className='homeLogout'
        onClick={() => {
          localStorage.clear()
          toast.success(`Logged out successfully..`)

          setTimeout(() => {
            window.location.href = '/login'
          })
        }}
      >
        Logout
      </span>

      <div className='netTransactionvalue'>
        <div className='netTransactionItem'>
          <span className='net-transaction-value-amount'>
            + {netIncome}
          </span>
          <span className='net-transaction-value-title'>
            Net Income
          </span>
        </div>
        <div className='netTransactionItem'>
          <span className='net-transaction-value-amount'>
            - {netExpense}
          </span>
          <span className='net-transaction-value-title'>
            Net Expense
          </span>
        </div>
        <div className='netTransactionItem'>
          <span className='net-transaction-value-amount'>
            {netIncome - netExpense}
          </span>
          <span className='net-transaction-value-title'>
            Net Balance
          </span>
        </div>

      </div>

      <div className='transactionsContainer'>
        {
          transactions.map((transaction) => {

            const { _id, title, amount, category, type, createdAt } = transaction

            return (<TransactionCard
              Key={_id}
              _id={_id}
              title={title}
              amount={amount}
              category={category}
              type={type}
              createdAt={createdAt}
              loadTransactions={loadTransactions}
            />
            )
          })
        }
      </div>
      <Link to='/add-transaction' className='add-transaction-Link'>
        <img src={ImgAdd}
          alt='Add Transaction'
          className='AddTransaction'
        />
      </Link>
      <Toaster />
    </div>
  )
}

export default Home
