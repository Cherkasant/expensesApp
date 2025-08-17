import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import { memo, useMemo } from 'react'

const ExpensesSummary = ({ expenses, periodName }) => {

    const expensesSum = useMemo(() => expenses.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0), [expenses])


    return <View style={styles.container}>
        <Text style={styles.period}>
            {periodName}
        </Text>
        <Text style={styles.sum}>
            ${expensesSum.toFixed(2)}
        </Text>
    </View>
}
export default memo(ExpensesSummary)


const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary400,
    },
})