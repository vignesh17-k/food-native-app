import AsyncStorage from "@react-native-async-storage/async-storage";

const utils = {
    store_data: async (key: string, value: any) => {
        try {
            await AsyncStorage.setItem(key, value);
            console.log("Data stored successfully");
        } catch (error) {
            console.error("Error storing data:", error);
        }
    },

    retrieve_data: async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                let data = JSON.parse(value);
                return data;
            }
        } catch (error) {
            console.error("Error retrieving data:", error);
        }
    }
}

export default utils;