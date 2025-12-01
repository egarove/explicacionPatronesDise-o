import { Text, View, FlatList, Button, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import { Animal } from '../entities/Animal';
import useAppContext from '../context/Context';
import StrategyClient from '../Singleton/StrategyClient';
import AxiosStrategy from '../Strategy/AxiosStrategy';
import FetchStrategy from '../Strategy/FetchStrategy';


const HolaCopy = () => {

  const client = StrategyClient.getInstance();

  // Inicialmente usamos Axios
  client.setStrategy(new AxiosStrategy('https://raw.githubusercontent.com'));

  // GET request
  client.get('/egarove/testingServer/main/animales.json').then((response) => {console.log(response)});

  // Cambiamos la estrategia a Fetch
  client.setStrategy(new FetchStrategy('https://raw.githubusercontent.com'));

  // POST request
  client.get('/egarove/testingServer/main/animales.json').then(console.log);
  //client.post('/egarove/testingServer/blob/main/animales.json', { user: 'admin', pass: '123' }).then(console.log);

  return (
    <View>
      <Text>Integración Completa (Sin Estilos)</Text>
    </View>
  );
};

export default HolaCopy;