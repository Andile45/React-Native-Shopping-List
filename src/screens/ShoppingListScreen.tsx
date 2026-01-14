import React, {useEffect, useState} from "react"
import {View, Text,StyleSheet,FlatList,Alert, TextInput} from "react-native"
import {v4 as uuidv4} from 'uuid';
import { useAppDispatch,useAppSelector } from "../hooks/redux";
import { addItem,deleteItem,togglePurchased,setItems, editItem } from "../store/ShoppingListSlice";
import { ShoppingItem } from "../types/shopping.types";
import { PressableButton } from "../components/PressableButton";
import { loadItems, saveItems } from "../utils/storage";


export default function ShoppingListScreen(){
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.shoppingList );

    const [name,setName] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [editingId, setEditingId] = useState<string| null>(null);
    const [editName,setEditName] = useState('');
    const [editQuantity,setEditQuantity] = useState('1'); 

    // load saved Items once on mount 
    useEffect(()=>{
        loadItems().then(saved=>{
            if(saved && saved.length>0){
              dispatch(setItems(saved));
            }
        });
    },[dispatch]
)

    //  Save anytime items change
    useEffect(()=>{
        saveItems(items);
    },[items]);

    const handleAdd = () =>{
        if (!name.trim()) {

            Alert.alert('Error','Item name is required');
            return;         
        }

        dispatch(
            addItem({
                id:uuidv4(),
                name,
                quantity:Number(quantity),
                purchased:false
            })
        );
        setName('');
        setQuantity('1');
    };


    const renderItem = ({item}:{item:ShoppingItem})=>(
        <View style={styles.itemRow}>
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
                    onPress={()=>{
                        dispatch(
                            editItem({
                                id:item.id,
                                name:editName,
                                quantity:Number(editQuantity)
                            })
                        );
                        setEditingId(null);
                    }}
                    />
                    </>
                ):(
                    <>

                    <Text
                    onPress={()=>dispatch(togglePurchased(item.id))}
                    style={[
                        styles.itemText, 
                        item.purchased && styles.purchasedText,
                    ]}
                    accessibilityRole="checkbox"
                    accessibilityState={{checked:item.purchased}}
                    >
                        {item.name} ({item.quantity})
                    </Text>

                    {/* Edit Button  */}

                    <PressableButton 
                     title="Edit"
                     variant="secondary"
                     onPress={()=>{
                        setEditName(item.id);
                        setEditName(item.name);
                        setEditQuantity(String(item.quantity));
                     }}
                    
                    />


                    {/* Secondary or Danger style delete Button  */}

                    <PressableButton
                       title="Delete"
                       variant="secondary"
                       onPress={()=>dispatch(deleteItem(item.id))}
                       style={styles.deleteButton}
                       textStyle={styles.deleteButtonText}
                       accessibilityLabel={`Delete ${item.name}`}
                    />
                    </>
                )
            }
        </View>
    );



    return(
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

            <FlatList
             data={items}
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

  // Optional style overrides for delete button
  deleteButton: {
    backgroundColor: '#FEE2E2', // soft red background
  },
  deleteButtonText: {
    color: '#B91C1C', // darker red text
  },
  headingWelcomeText:{
        fontSize: 12,
    fontWeight: '500',
    marginBottom: 12,
  },
  editInput:{

  }
});