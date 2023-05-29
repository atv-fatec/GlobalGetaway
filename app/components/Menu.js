import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const MenuScreen = ({ menu, onDelete }) => {
    const navigate = useNavigation();

    const [isMenuOpen, setIsMenuOpen] = useState(menu);

    const handlePress = () => {
        setIsMenuOpen(!menu);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(!menu);
    };
    
    const handleDelete = () => {
        onDelete(); // Chama a função onDelete passada como prop
    };

    return (
        <View>
            {
                menu ?
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => setIsMenuOpen(!menu)}>

                            <TouchableOpacity style={styles.editButton}>
                                <AntDesign style={styles.buttonText} name="edit" size={20} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                                <AntDesign style={styles.buttonText} name="delete" size={20} color="black" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    :
                    null
            }
        </View>
    )
};

export default MenuScreen;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: -25,
    },

    editButton: {
        backgroundColor: '#87DEB1',
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginBottom: 10,
    },

    deleteButton: {
        backgroundColor: '#FFA5A5',
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginBottom: 10,
    },

    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
});