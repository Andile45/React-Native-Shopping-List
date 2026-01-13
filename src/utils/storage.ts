import AsyncStorage from "@react-native-async-storage/async-storage";
import { ShoppingItem } from "../types/shopping.types";

const STORAGE_KEY = 'SHOPPING_LIST';

export const saveItems = async (items:ShoppingItem[]):Promise<void>=>{
   await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const  loadItems = async ():Promise<ShoppingItem[]>=>{
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}