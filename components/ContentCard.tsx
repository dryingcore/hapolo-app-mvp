import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Linking } from 'react-native';
import axios from 'axios'; // Importando axios

// Definindo o tipo para os dados que vamos receber da API
interface VehicleData {
  placa: string;
  comunicacao?: {
    dateGPS: string;
    dateGSM: string;
    latitudeDecimalDegrees: string;
    longitudeDecimalDegrees: string;
    endereco: {
      road: string;
      suburb: string;
      city: string;
      state: string;
      country: string;
      google_maps: string;
    };
    speed: number;
    bateria: number;
    ignicao: string;
  };
}

export default function ContentCard() {
  const [vehicles, setVehicles] = useState<VehicleData[]>([]); // Estado para armazenar os dados dos veículos

  useEffect(() => {
    // Realizar a requisição para o endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get('');
        const result = response.data; // Obtendo a resposta dos dados
        if (result.success) {
          setVehicles(result.vehicles); // Atualiza o estado com os dados recebidos
        } else {
          console.error('Erro: Dados não recebidos');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData(); // Chama a função de fetch
  }, []); // O array vazio garante que a requisição será feita apenas uma vez após o primeiro render

  return (
    <ScrollView style={styles.container}>
      {vehicles.length > 0 ? (
        vehicles.map((vehicle, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>Placa: {vehicle.placa}</Text>
            {vehicle.comunicacao ? (
              <>
                <Text>Data GPS: {vehicle.comunicacao.dateGPS}</Text>
                <Text>Latitude: {vehicle.comunicacao.latitudeDecimalDegrees}</Text>
                <Text>Longitude: {vehicle.comunicacao.longitudeDecimalDegrees}</Text>
                <Text>
                  Endereço: {vehicle.comunicacao.endereco.road}, {vehicle.comunicacao.endereco.city} -{' '}
                  {vehicle.comunicacao.endereco.state}
                </Text>
                <Text>Velocidade: {vehicle.comunicacao.speed} km/h</Text>
                <Text>Bateria: {vehicle.comunicacao.bateria}%</Text>
                <Text>Ignição: {vehicle.comunicacao.ignicao === '0' ? 'Desligada' : 'Ligada'}</Text>

                {/* Usando o Linking para abrir o Google Maps no navegador */}
                <Button
                  title="Ver no Google Maps"
                  onPress={() => Linking.openURL(vehicle.comunicacao.endereco.google_maps)}
                />
              </>
            ) : (
              <Text>Dados de comunicação não disponíveis</Text>
            )}
          </View>
        ))
      ) : (
        <Text>Carregando...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
