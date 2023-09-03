import { createContext, useReducer } from 'react'


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {
    },
    deleteExpense: (id) => {
    },
    updateExpense: (id, { description, amount, date }) => {
    },
    setExpense: (expenses) => {
    },

})

const expensesReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            const reverse = action.payload.reverse()
            return reverse
        case 'ADD':

            return [action.payload, ...state]
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
    const [expensesState, dispatch] = useReducer(expensesReducer, [])

    const addExpense = (expenseData) => {
        dispatch({ type: 'ADD', payload: expenseData })
    }
    const deleteExpense = (id) => {
        dispatch({ type: 'DELETE', payload: id })
    }
    const updateExpense = (id, expenseData) => {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
    }

    const setExpense = (expenses) => {
        dispatch({ type: 'SET', payload: expenses })
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
        setExpense: setExpense,
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider