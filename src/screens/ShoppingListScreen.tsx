import React, {useEffect, useState} from "react"
import {View, Text,StyleSheet,FlatList,Alert, TextInput} from "react-native"
import {v4 as uuidv4} from 'uuid';
import { useAppDispatch,useAppSelector } from "../hooks/redux";
import { addItem,deleteItem,togglePurchased,setItems } from "../store/ShoppingListSlice";
import { ShoppingItem } from "../types/shopping.types";
import { PressableButton } from "../components/PressableButton";
import { loadItems, saveItems } from "../utils/storage";


export default function ShoppingListScreen(){
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.shoppingList );

    const [name,setName] = useState('');
    const [quantity, setQuantity] = useState('1');

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

            {/* Secondary or Danger style delete Button  */}

            <PressableButton
               title="Delete"
               variant="secondary"
               onPress={()=>dispatch(deleteItem(item.id))}
               style={styles.deleteButton}
               textStyle={styles.deleteButtonText}
               accessibilityLabel={`Delete ${item.name}`}
            />
        </View>
    );

    return(
        <View style={styles.container}>

            <Text style={styles.heading}>Shopping List</Text>

            <TextInput 
            placeholder="Item name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            />

            <TextInput 
            placeholder="Quantity"
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

    container:{

    },
    heading:{

    },
    input:{

    },

    itemRow:{

    },
    itemText:{

    },
    purchasedText:{

    },
    listContainer:{

    },
    emptyList:{

    },
    deleteButton:{

    },
    deleteButtonText:{

    },
    emptyText:{

    }



})