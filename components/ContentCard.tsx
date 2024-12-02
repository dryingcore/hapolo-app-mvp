import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Linking } from 'react-native';
import axios from 'axios'; // Importando axios

// Definindo o tipo para os dados que vamos receber da API
interface VehicleData {
  placa?: string;
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
      <Text style={styles.title}>Veículos ({vehicles.length})</Text>

      {vehicles.map((vehicle, index) => (
        <View key={index} style={styles.card}>
          {/* Aqui estamos pegando a placa de forma segura */}
          <Text style={styles.cardTitle}>Placa: {vehicle.comunicacao?.placa || 'Placa não disponível'}</Text>

          {/* Dados de comunicação */}
          {vehicle.comunicacao && (
            <View>
              <Text>Data GPS: {vehicle.comunicacao.dateGPS || 'N/A'}</Text>
              <Text>Data GSM: {vehicle.comunicacao.dateGSM || 'N/A'}</Text>
              <Text>Ignicao: {vehicle.comunicacao.ignicao === '1' ? 'Ligado' : 'Desligado'}</Text>
              <Text>Bateria: {vehicle.comunicacao.bateria}%</Text>
              <Text>Speed: {vehicle.comunicacao.speed} km/h</Text>
            </View>
          )}

          {/* Dados de localização */}
          {vehicle.comunicacao?.endereco && (
            <View style={styles.location}>
              <Text>
                {vehicle.comunicacao.endereco.road}, {vehicle.comunicacao.endereco.suburb}
              </Text>
              <Text>
                {vehicle.comunicacao.endereco.city}, {vehicle.comunicacao.endereco.state}
              </Text>
              <Text>{vehicle.comunicacao.endereco.country}</Text>

              {/* Link para o Google Maps */}
              <Button
                title="Ver no Google Maps"
                onPress={() => Linking.openURL(vehicle.comunicacao.endereco.google_maps)}
              />
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#333',
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
    color: '#fff',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    marginTop: 10,
  },
});
