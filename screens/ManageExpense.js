import { StyleSheet, View } from 'react-native'
import { useContext, useLayoutEffect } from 'react'
import IconButton from '../components/ui/IconButton'
import { GlobalStyles } from '../constants/styles'
import Button from '../components/ui/Button'
import { ExpensesContext } from '../store/expense-context'

const ManageExpense = ({ route, navigation }) => {
    const expensesContext = useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId

    const isEditing = !!editedExpenseId

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        })
    }, [navigation, isEditing])
    const deleteExpenseHandler = () => {
        navigation.goBack()
        expensesContext.deleteExpense(editedExpenseId)
    }

    const onCancelhandler = () => {
        navigation.goBack()
    }
    const onConfirmHandler = () => {
        if (isEditing) {
            expensesContext.updateExpense(editedExpenseId, {
                description: 'Check',
                amount: 99,
                date: new Date('2023-05-28'),
            })
        } else {
            expensesContext.addExpense({ description: '', amount: 99, date: new Date('2023-05-28') })
        }

        navigation.goBack()
    }


    return <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <Button mode={'flat'} onPress={onCancelhandler} style={styles.btn}>Cancel</Button>
            <Button onPress={onConfirmHandler} style={styles.btn}>{isEditing ? 'Update' : 'Add'}</Button>
        </View>
        {isEditing &&
            <View style={styles.deleteContainer}>
                <IconButton icon={'trash'} size={36} color={GlobalStyles.colors.error500}
                            onPress={deleteExpenseHandler} />
            </View>}
    </View>
}


export default ManageExpense

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        minWidth: 120,
        marginHorizontal: 8,
    },
})


