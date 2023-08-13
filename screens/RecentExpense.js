import { StyleSheet } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expense-context'
import { useContext } from 'react'
import { getDateMinusDays } from '../util/date'

const RecentExpense = () => {
    const expensesContext = useContext(ExpensesContext)

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date()
        const date7Days = getDateMinusDays(today, 7)
        return (expense.date >= date7Days) && (expense.date <= today)
    })

    return <ExpensesOutput expenses={recentExpenses} expensesPeriod={'last 7 days'} text={'No expenses yet...'} />
}


export default RecentExpense

const styles = StyleSheet.create({})