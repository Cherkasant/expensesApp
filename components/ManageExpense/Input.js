import { StyleSheet, Text, TextInput, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

const Input = ({ label, style, textInputConfig, invalid }) => {
    const stylesInput = [styles.textInput]

    if (textInputConfig && textInputConfig.multiline) {
        stylesInput.push(styles.inputMultiline)
    }
    if (invalid) {
        stylesInput.push(styles.invalidInput)
    }

    return <View style={[styles.container, style]}>
        <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
        <TextInput style={stylesInput} {...textInputConfig} />
    </View>
}


export default Input


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
    },
    textInput: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500,
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50,
    },
})