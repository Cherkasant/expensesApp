import axios from 'axios'

const url = 'https://nativebase-c279a-default-rtdb.firebaseio.com'

const api = axios.create({
    baseURL: url,
    timeout: 10000,
})

export async function storeExpense(expenseData) {
    const response = await api.post('/expenses.json', expenseData)
    const id = response.data.name
    return id
}

export async function getExpenses() {
    const response = await api.get('/expenses.json')
    const expenses = []

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,

        }
        expenses.push(expenseObj)
    }
    return expenses
}


export function updateExpense(id, expenseData) {
    return api.put(`/expenses/${id}.json/`, expenseData)
}

export function deleteExpense(id) {
    return api.delete(`/expenses/${id}.json`)
}