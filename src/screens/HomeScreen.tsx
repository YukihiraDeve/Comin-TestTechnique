import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getPokemonList, getPokemonDetails } from '../api/pokeAPI';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../def';
import {styles} from '../styles/StyleSheet'
import { Image } from 'react-native';
import { capitalizeFirstLetter } from '../utils/helper';

const ITEMS_PER_PAGE = 20;
const THRESHOLD = 0.75; 


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
  
  const [offset, setOffset] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);


  useEffect(() => {
    fetchPokemon();
    
  }, [offset])



  const fetchPokemon = async () => {
    setIsFetchingMore(true);
    try {
      const data: PokemonListResponse = await getPokemonList(offset, ITEMS_PER_PAGE);
      const detailedPokemons = await Promise.all(data.results.map(async (pokemon) => {
        const details = await getPokemonDetails(pokemon.name);
        return {
          ...pokemon,
          spriteURL: details.sprites.front_default
        };
      }));
      setPokemons(prevPokemons => [...prevPokemons, ...detailedPokemons]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingMore(false);
    }
  };



const handleEndReached = () => {
  if (!isFetchingMore) {
    setOffset(prevOffset => prevOffset + ITEMS_PER_PAGE);
  }
};

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
      <Text>#{index + 1}</Text>
      <Text>{capitalizeFirstLetter(item.name)}</Text>
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
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => {
          return (
            isFetchingMore
            ? <ActivityIndicator size="large" color="#0000ff" />
            : null
          );
        }}>
        </FlatList>
    </View>
  );
};

export default HomeScreen;