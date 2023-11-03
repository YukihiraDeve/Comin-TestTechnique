import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getPokemonList } from '../api/pokeAPI';

const PokemonList = ({ navigation }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPokemon();
  }, []);

  

  const loadPokemon = async () => {
    try {
      setLoading(true);
      const data = await getPokemonList(20, 0);
      setPokemonList(data.results);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PokemonDetails', { name: item.name })}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={pokemonList}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      )}
    </View>
  );
};

export default PokemonList;
