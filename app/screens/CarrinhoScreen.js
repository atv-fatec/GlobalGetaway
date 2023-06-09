import React, {useState} from "react"
import { View, Text, StyleSheet  } from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';

const CarrinhoScreen = () => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectItems = (items) => {
        setSelectedItems(items);
    };

    return(
        <>
            <View style={styles.container}>
                
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    input: {
        borderWidth: 2,
        borderColor: '#46ADD6',
        borderRadius: 4,
        padding: 10,
        marginVertical: 10,
        width: '100%',
    },
});

export default CarrinhoScreen;