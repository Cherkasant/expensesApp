import { StyleSheet, Text, View } from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles'
import { memo } from 'react'


const ExpensesOutput = ({ expenses, expensesPeriod, text }) => {

    let content = <Text style={styles.infoText}>{text}</Text>

    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />
    }

    return <View style={styles.container}>
        <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
        {content}
    </View>
}


export default memo(ExpensesOutput)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    },
})