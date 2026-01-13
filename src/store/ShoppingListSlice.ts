import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShoppingItem } from "../types/shopping.types";


const initialState:ShoppingItem[]=[];

const shoppingListSlice = createSlice({
    name:'shoppingList',
    initialState,
    reducers:{
        addItem:(state,action:PayloadAction<ShoppingItem>)=>{
            state.push(action.payload);
        },
        deleteItem:(state,action:PayloadAction<string>)=>
            state.filter(item=>item.id !== action.payload),

            togglePurchased:(state,action:PayloadAction<string>) =>{
                const item = state.find(i => i.id === action.payload);

                if (item) item.purchased =!item.purchased
        },

       editItem:(state,action:PayloadAction<{id:string,name:string,quantity:number,desription:string}>)=>{
            const item = state.find(i => i.id === action.payload.id);

            if (item) {
                item.name = action.payload.name;
                item.quantity = action.payload.quantity;
                
            }
       },

       setItems:(_state, action:PayloadAction<ShoppingItem[]>)=>
        action.payload,
    }
});

export const{addItem,deleteItem,togglePurchased, editItem, setItems,} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;