import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CreateMenuProps {
  menuName: string;
  menuIcon: React.ReactNode;
}

const CreateMenu: React.FC<CreateMenuProps> = ({ menuName, menuIcon }) => {
  return (
    <View style={styles.menuContainer}>
      <View style={styles.iconContainer}>{menuIcon}</View>
      <Text style={styles.menuName}>{menuName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200, // Defina o tamanho adequado para os itens
    marginHorizontal: 20, // Distância entre os itens
    height: 150,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
  },
  iconContainer: {
    marginBottom: 10,
  },
  menuName: {
    fontSize: 18,
    color: '#333',
  },
});

export default CreateMenu;
