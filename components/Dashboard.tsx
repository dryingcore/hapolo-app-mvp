import React from 'react';
import { Text, View, StyleSheet, FlatList, Dimensions, Image, ScrollView } from 'react-native';
import CreateMenu from './CreateMenu'; // Seu componente de menu
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ContentCard from './ContentCard';

// Definindo a interface para os itens do menu
interface MenuItem {
  id: string;
  name: string;
  icon: string;
}

// Lista de itens do carrossel (menus)
const menuItems: MenuItem[] = [
  { id: '1', name: 'Veículos', icon: 'car' },
  { id: '2', name: 'Motos', icon: 'motorbike' },
  { id: '3', name: 'Acessórios', icon: 'car-cog' },
  { id: '4', name: 'Serviços', icon: 'wrench' },
];

const Dashboard: React.FC = () => {
  // Função para renderizar cada item do carrossel
  const renderItem = ({ item }: { item: MenuItem }) => (
    <CreateMenu
      key={item.id}
      menuName={item.name}
      menuIcon={<MaterialCommunityIcons name={item.icon} size={24} color="black" />}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ color: '#fff' }}>Dashboard Screen</Text>
        <Image source={require('../assets/logo.png')} style={{ marginTop: 20 }} />
      </View>

      <View style={{ marginTop: 20, width: '100%' }}>
        {/* Carrossel utilizando FlatList */}
        <FlatList
          data={menuItems} // Passando os itens do menu
          renderItem={renderItem} // Função que renderiza cada item do carrossel
          keyExtractor={item => item.id} // Chave única para cada item
          horizontal // Ativa rolagem horizontal
          pagingEnabled // Faz com que cada item ocupe toda a tela
          showsHorizontalScrollIndicator={false} // Desativa o indicador de rolagem horizontal
          snapToAlignment="center" // Alinha os itens ao centro quando a rolagem parar
        />
      </View>

      {/* Substituindo ScrollViewComponent por ScrollView */}
      <ScrollView style={{ marginTop: 20, width: '100%' }}>
        <ContentCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titleContainer: {
    width: '80%',
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 15,
  },
});

export default Dashboard;
