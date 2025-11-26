import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Post } from '../entities/Post';
import { ServerPost } from '../entities/mappers/ServerPost';
import { PostMapper } from '../entities/mappers/PostMapper';

const Hola = () => {

  const [saludo, setSaludo] = useState("Cargando...");
  const [loading, setLoading] = useState<boolean>(true);
  const [datos, setDatos] = useState<Post[]>([]);

  const saludo1 = () => {
    return new Promise<number>( async (resolve, reject) => {
      fetch("https://jsonplaceholder.typicode.com/posts").then(
        (datos) => {
          datos.json().then(
            (datos: ServerPost[]) => {
              setDatos(PostMapper.toPost(datos));
              setSaludo("Los datos se han leido correctamente");
              setLoading(false);
            }
          )                    
        }
      )
    })

  }

  return (
    <View>
      <Text>{saludo}</Text>
    </View>
  )
}

export default Hola

const styles = StyleSheet.create({})