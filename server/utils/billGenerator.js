export const billGenerate = (items = []) => {
    let totalAmount = 0;

    const detailedItems = items.map(item => {
        const { name, price, quantity } = item;
        const itemTotal = price * quantity;
        totalAmount += itemTotal;

        return {
            name,
            quantity,
            unitPrice: price,
            totalPrice: itemTotal
        };
    });

    return {
        items: detailedItems,
        totalAmount
    };
};
