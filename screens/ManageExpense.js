import { StyleSheet, View } from 'react-native'
import { useContext, useLayoutEffect, useState } from 'react'
import IconButton from '../components/ui/IconButton'
import { GlobalStyles } from '../constants/styles'
import { ExpensesContext } from '../store/expense-context'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import { deleteExpense, storeExpense, updateExpense } from '../util/http'
import Loading from '../components/ui/Loading'

const ManageExpense = ({ route, navigation }) => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const expensesContext = useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId
    const selectedExpense = expensesContext.expenses.find(el => el.id === editedExpenseId)

    const isEditing = !!editedExpenseId

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        })
    }, [navigation, isEditing])

    async function deleteExpenseHandler() {
        setIsLoading(true)
        try {
            await deleteExpense(editedExpenseId)
            navigation.goBack()
            expensesContext.deleteExpense(editedExpenseId)
        } catch (error) {
            setError('Cant delete expense!')
            setIsLoading(false)
        }

    }

    const onCancelhandler = () => {
        navigation.goBack()
    }

    async function onConfirmHandler(expenseData) {
        setIsLoading(true)
        try {
            if (isEditing) {
                expensesContext.updateExpense(editedExpenseId, expenseData)
                await updateExpense(editedExpenseId, expenseData)
            } else {
                const id = await storeExpense(expenseData)
                expensesContext.addExpense({ ...expenseData, id: id })
            }
            navigation.goBack()
        } catch (error) {
            setError('Can`t update expenses!')
            setIsLoading(false)
        }

    }


    if (error && !isLoading) {
        return <Error message={error} />
    }
    if (isLoading) {
        return <Loading />
    }

    return <View style={styles.container}>
        <ExpenseForm onCancel={onCancelhandler} submitButtonLabel={isEditing ? 'Update ' : 'Add'}
                     onSubmit={onConfirmHandler} defaultValue={selectedExpense} />
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


