import { StyleSheet, Text, View } from 'react-native'
import Input from './Input'
import { useState } from 'react'
import Button from '../ui/Button'
import { getFormattedDate } from '../../util/date'
import { GlobalStyles } from '../../constants/styles'

const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel, defaultValue }) => {
    

    const initialState = {
        amount: { value: defaultValue ? defaultValue.amount.toString() : '', isValid: true },
        date: { value: defaultValue ? getFormattedDate(defaultValue.date) : '', isValid: true },
        description: { value: defaultValue ? defaultValue.description : '', isValid: true },
    }
    const [inputs, setInputs] = useState(initialState)

    const inputChangeHandler = (inputIdentifier, value) => {
        setInputs((prev) => {
            return { ...prev, [inputIdentifier]: { value: value, isValid: true } }
        })
    }

    const submitHandler = () => {
        const expenseDate = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        }

        const amountDateIsValid = !isNaN(expenseDate.amount) && expenseDate.amount > 0
        const dateIsValid = expenseDate.date.toString() !== 'Invalid date'
        const descriptionIsValid = expenseDate.description.trim().length > 0
        if (!amountDateIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountDateIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    description: { value: curInputs.description.value, isValid: descriptionIsValid },
                }
            })
            return
        }
        onSubmit(expenseDate)
    }
    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

    return <View style={styles.container}>
        <Text style={styles.text}>Your Expense</Text>
        <View style={styles.inputsContainer}>
            <Input label={'Amount'}
                   invalid={!inputs.amount.isValid}
                   textInputConfig={{
                       keyboardType: 'decimal-pad',
                       onChangeText: inputChangeHandler.bind(this, 'amount'),
                       value: inputs.amount.value,
                   }}
                   style={styles.inputFLex} />
            <Input label={'Date'} invalid={!inputs.date.isValid} textInputConfig={{
                placeholder: 'YYYY-MM-DD', maxLength: 10, onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputs.date.value,
            }} style={styles.inputFLex} />
        </View>
        <Input label={'Description'} invalid={!inputs.description.isValid} textInputConfig={{
            multiline: true, onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputs.description.value,
        }} />
        {formIsInvalid &&
            <Text style={styles.errorMessage}>Invalid input values - please check your entered data</Text>}
        <View style={styles.buttonContainer}>
            <Button mode={'flat'} onPress={onCancel} style={styles.btn}>Cancel</Button>
            <Button onPress={submitHandler} style={styles.btn}>{submitButtonLabel}</Button>
        </View>
    </View>

}
export default ExpenseForm

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
    },
    inputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputFLex: {
        flex: 1,
    },
    text: { fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center', marginVertical: 24 },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    errorMessage: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
    },
})