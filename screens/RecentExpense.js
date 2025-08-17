import { StyleSheet } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { useContext, useEffect, useMemo, useState } from 'react'
import { getDateMinusDays } from '../util/date'
import { getExpenses } from '../util/http'
import { ExpensesContext } from '../store/expense-context'
import Loading from '../components/ui/Loading'
import Error from '../components/ui/Error'

const RecentExpense = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()

    const expensesContext = useContext(ExpensesContext)


    useEffect(() => {
        async function fetchExpenses() {
            setIsLoading(true)
            try {
                const expenses = await getExpenses()
                expensesContext.setExpense(expenses)
            } catch (error) {
                setError('Cant get expenses!')
            }
            setIsLoading(false)
        }

        fetchExpenses()

    }, [])


    if (error && !isLoading) {
        return <Error message={error} />
    }
    if (isLoading) {
        return <Loading />
    }

    const recentExpenses = useMemo(() => {
        const today = new Date()
        const date7Days = getDateMinusDays(today, 7)
        return expensesContext.expenses.filter((expense) => {
            return (expense.date >= date7Days) && (expense.date <= today)
        })
    }, [expensesContext.expenses])

    return <ExpensesOutput expenses={recentExpenses} expensesPeriod={'last 7 days'} text={'No expenses yet...'} />
}


export default RecentExpense

const styles = StyleSheet.create({})