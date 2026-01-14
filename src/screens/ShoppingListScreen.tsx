import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, Alert, TextInput } from "react-native"
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addItem, deleteItem, togglePurchased, setItems, editItem } from "../store/ShoppingListSlice";
import { ShoppingItem } from "../types/shopping.types";
import { PressableButton } from "../components/PressableButton";
import { loadItems, saveItems } from "../utils/storage";

type FilterType = 'all' | 'purchased' | 'unpurchased';

export default function ShoppingListScreen() {
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.shoppingList);

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState('');
    const [editQuantity, setEditQuantity] = useState('1');
    const [seachQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<FilterType>('all');

    // load saved Items once on mount 
    useEffect(() => {
        loadItems().then(saved => {
            if (saved && saved.length > 0) {
                dispatch(setItems(saved));
            }
        });
    }, [dispatch]
    )

    //  Save anytime items change
    useEffect(() => {
        saveItems(items);
    }, [items]);

    const handleAdd = () => {
        if (!name.trim()) {

            Alert.alert('Error', 'Item name is required');
            return;
        }

        dispatch(
            addItem({
                id: uuidv4(),
                name,
                quantity: Number(quantity),
                purchased: false
            })
        );
        setName('');
        setQuantity('1');
    };


    // Filter Logic 

    const visibleItems = items.filter(item =>
        item.name.toLocaleLowerCase()
            .includes(seachQuery.toLocaleLowerCase()
            )
    )
        .filter(item => {
            if (filter === 'purchased') return item.purchased;
            if (filter === 'unpurchased') return !item.purchased;
            return true;
        });



    const renderItem = ({ item }: { item: ShoppingItem }) => (
        <View style={styles.itemCard}>
            {/* Tapping the text toggles purchased State */}

            {/* Editing Functionality */}

            {
                editingId === item.id ? (
                    <>
                        <TextInput
                            value={editName}
                            onChangeText={setEditName}
                            style={styles.editInput}
                        />
                        <TextInput
                            value={editQuantity}
                            onChangeText={setEditQuantity}
                            style={styles.editInput}
                        />

                        <PressableButton
                            title="Save"
                            onPress={() => {
                                dispatch(
                                    editItem({
                                        id: item.id,
                                        name: editName,
                                        quantity: Number(editQuantity)
                                    })
                                );
                                setEditingId(null);
                            }}
                        />
                    </>
                ) : (
                    <>

                        <View style={styles.itemTextContainer}>
                            <Text
                                onPress={() => dispatch(togglePurchased(item.id))}
                                style={[
                                    styles.itemName,
                                    item.purchased && styles.purchasedText,
                                ]}
                            >
                                {item.name}
                            </Text>

                            <Text style={styles.itemQuantity}>
                                Quantity: {item.quantity}
                            </Text>
                        </View>

                        {/* Edit Button  */}

                        <PressableButton
                            title="Edit"
                            variant="secondary"
                            onPress={() => {
                                setEditingId(item.id);
                                setEditName(item.name);
                                setEditQuantity(String(item.quantity));
                            }}

                        />


                        {/* Secondary or Danger style delete Button  */}

                        <PressableButton
                            title="Delete"
                            variant="secondary"
                            onPress={() => dispatch(deleteItem(item.id))}
                            style={styles.deleteButton}
                            textStyle={styles.deleteButtonText}
                            accessibilityLabel={`Delete ${item.name}`}
                        />
                    </>
                )
            }
        </View>
    );



    return (
        <View style={styles.container}>

            <Text style={styles.heading}>Shopping List</Text>

            <Text style={styles.headingWelcomeText}>Welcome to The Shopping List</Text>

            <TextInput
                placeholder="Enter item name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

            <TextInput
                placeholder="Enter the quantity"
                value={quantity}
                onChangeText={setQuantity}
                style={styles.input}
            />

            <PressableButton
                title="Add Item"
                onPress={handleAdd}
            />

            {/* Search Functionality */}

            <TextInput
                placeholder="Seach Items..."
                value={seachQuery}
                onChangeText={setSearchQuery}
                style={styles.input}
            />

            {/* Filter Functionality */}
            <View style={styles.filterRow}>

                <PressableButton
                    title="All"
                    variant={filter === 'all' ? 'primary' : 'secondary'}
                    onPress={() => setFilter('all')}
                />

                <PressableButton
                    title="Purchased"
                    variant={filter === 'purchased' ? 'primary' : 'secondary'}
                    onPress={() => setFilter('purchased')}
                />

                <PressableButton
                    title="Pending"
                    variant={filter === 'unpurchased' ? 'primary' : 'secondary'}
                    onPress={() => setFilter('unpurchased')}
                />

            </View>

            <FlatList
                data={visibleItems}
                keyExtractor={items => items.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No Items yet , Add Your First Item
                    </Text>
                }
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 6,
        padding: 10,
        marginBottom: 8,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 6,
    },
    itemText: {
        fontSize: 16,
    },
    purchasedText: {
        textDecorationLine: 'line-through',
        color: '#6B7280',
    },
    listContainer: {
        paddingTop: 12,
    },
    emptyText: {
        marginTop: 20,
        fontStyle: 'italic',
        color: '#6B7280',
        textAlign: 'center',
    },

    // Custom style overrides for delete button
    deleteButton: {
        backgroundColor: '#FEE2E2',
    },
    deleteButtonText: {
        color: '#B91C1C',
    },
    headingWelcomeText: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 12,
    },
    editInput: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        padding: 6,
        borderRadius: 6,
        marginVertical: 4,

    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8

    },
    itemCard: {
        backgroundColor: '#F9FAFB',
        padding: 12,
        borderRadius: 8,
        marginVertical: 6,
    },

    viewActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
        marginTop: 6,
    },

    editActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },

    itemTextContainer: {
        flex: 1,
    },

    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },

    itemQuantity: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 2,
    },




});