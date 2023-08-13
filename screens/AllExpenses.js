import { StyleSheet } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { useContext } from 'react'
import { ExpensesContext } from '../store/expense-context'

const AllExpenses = () => {

    const expensesContext = useContext(ExpensesContext)

    return <ExpensesOutput expenses={expensesContext.expenses} expensesPeriod={'Total'} text={'No expenses yet...'} />

}

export default AllExpenses

const styles = StyleSheet.create({})