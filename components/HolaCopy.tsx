import { Text, View } from 'react-native';
import React, { useEffect } from 'react';
import useAppContext from '../context/Context';
import StrategyClient from '../Singleton/StrategyClient';
import AxiosStrategy from '../Strategy/AxiosStrategy';
import FetchStrategy from '../Strategy/FetchStrategy';
import { JsonParsingStrategy } from '../Strategy/DataParsingStrategy';

const HolaCopy = () => {

  const animales = useAppContext((s) => s.animales)
  const addAnimales = useAppContext((s) => s.addAnimales)

  const client = StrategyClient.getInstance();
  const parser = new JsonParsingStrategy();

  useEffect(() => {

    // Estrategia Axios
    client.setStrategy(new AxiosStrategy('https://raw.githubusercontent.com'));

    client.get('/egarove/testingServer/main/animales.json')
      .then((response: string) => {
        console.log(response);
        const nuevos1 = parser.parse(response);
        addAnimales(nuevos1);
      })
      .catch(console.error);

    // Estrategia Fetch
    client.setStrategy(new FetchStrategy('https://raw.githubusercontent.com'));

    client.get('/egarove/testingServer/main/animales.json')
      .then((response: string) => {
        console.log(response);
        const nuevos2 = parser.parse(response);
        addAnimales(nuevos2);
      })
      .catch(console.error);

  }, []);

  useEffect(() => {
     // se ejecuta cada vez que cambia animales
    
    console.log("Animales actualizados:", animales);


  }, [animales]);

  return (
    <View>
      <Text>Integración Completa (Sin Estilos)</Text>
    </View>
  );
};

export default HolaCopy;