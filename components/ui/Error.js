import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'


const Error = ({ message, }) => {
    return <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>An error </Text>
        <Text style={styles.message}>{message}</Text>

    </View>
}

export default Error

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
    },
    title: { fontSize: 20, fontWeight: 'bold' },
    message: {
        fontSize: 14,
        fontWeight: 'bold',
    },
})