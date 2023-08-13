import { createContext, useReducer } from 'react'

const DATA_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 66.3,
        date: new Date('2023-12-20'),
    },
    {
        id: 'e2',
        description: 'A pair of apples',
        amount: 66,
        date: new Date('2023-12-20'),
    },
    {
        id: 'e3',
        description: 'A pair of banana',
        amount: 45.3,
        date: new Date('2020-12-14'),
    },
    {
        id: 'e4',
        description: 'Pasta',
        amount: 16.3,
        date: new Date('2022-12-11'),
    },
]


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {
    },
    deleteExpense: (id) => {
    },
    updateExpense: (id, { description, amount, date }) => {
    },
})

const expensesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString()
            return [{ ...action.payload, id: id }, ...state]
        case 'UPDATE':
            const updateId = state.findIndex((el) => el.id === action.payload.id)
            const updatableExpense = state[updateId]
            const updateItem = { ...updatableExpense, ...action.payload.data }
            const updatedExpenses = [...state]
            updatedExpenses[updateId] = updateItem
            return updatedExpenses
        case 'DELETE':
            return state.filter((el) => el.id !== action.payload)
        default:
            return state
    }
}

const ExpensesContextProvider = ({ children }) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, DATA_EXPENSES)

    const addExpense = (expenseData) => {
        dispatch({ type: 'ADD', payload: expenseData })
    }
    const deleteExpense = (id) => {
        dispatch({ type: 'DELETE', payload: id })
    }
    const updateExpense = (id, expenseData) => {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider