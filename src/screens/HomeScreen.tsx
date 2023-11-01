import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getPokemonList, getPokemonDetails } from '../api/pokeAPI';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../def';
import {styles} from '../styles/StyleSheet'
import { Image } from 'react-native';


interface Pokemon {
    name: string;
    url: string;
    spriteURL?: string;
}

  interface PokemonListResponse {
    results: Pokemon[];
  }


type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  
  const navigation = useNavigation<HomeScreenNavigationProp>();



  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const data: PokemonListResponse = await getPokemonList();
        const detailedPokemons = await Promise.all(data.results.map(async (pokemon) => {
          const details = await getPokemonDetails(pokemon.name);
          return {
            ...pokemon,
            spriteURL: details.sprites.front_default
          };
        }));
        setPokemons(detailedPokemons);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPokemon();
  }, []);

  const renderPokemon = ({ item, index }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => navigation.navigate('DetailScreen', { name: item.name })}
    >
      <Image source={{ uri: item.spriteURL }} style={styles.sprite} />
      <Text>Number: {index + 1}</Text>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
        <FlatList
        data={pokemons}
        renderItem={renderPokemon}
        keyExtractor={item => item.name}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
    </View>
  );
};

export default HomeScreen;
