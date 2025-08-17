import { FlatList, StyleSheet } from 'react-native'
import ExpenseItem from './ExpenseItem'
import { memo, useCallback } from 'react'


const ExpensesList = ({ expenses }) => {
    const renderExpenseItem = useCallback((itemData) => {
        return <ExpenseItem {...itemData.item} />
    }, [])

    return <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={30}
        removeClippedSubviews
    />
}

export default memo(ExpensesList)


const styles = StyleSheet.create({})