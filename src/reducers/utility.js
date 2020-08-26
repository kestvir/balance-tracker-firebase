export const sum = (transactions, type) => {
    let arr = []

    if (type === "income") {
        arr = transactions.flatMap(transaction => Math.sign(transaction.amount) === 1 ? [transaction.amount] : [])
    } else if (type === "expense") {
        arr = transactions.flatMap(transaction => Math.sign(transaction.amount) === -1 ? [transaction.amount] : [])
    } else {
        arr = transactions.map(transaction => transaction.amount)
    }

    if (arr.length === 0) return 0

    return arr.reduce((amountAccumulator, currentAmount) => amountAccumulator + currentAmount)
} 