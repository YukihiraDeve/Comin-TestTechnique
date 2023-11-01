import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { getPokemonByName } from '../api/pokeAPI';

const PokemonDetails = ({ route }) => {
  const { name } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPokemonDetails = async () => {
      try {
        const details = await getPokemonByName(name);
        setPokemonDetails(details);
        setLoading(false);
      } catch (err) {
        setError('Failed to load Pokémon details');
        setLoading(false);
      }
    };

    loadPokemonDetails();
  }, [name]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ScrollView>
      <View>
        <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>{pokemonDetails.name}</Text>
        <Image
          source={{ uri: pokemonDetails.sprites.front_default }}
          style={{ width: 200, height: 200, alignSelf: 'center' }}
        />
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18 }}>Height: {pokemonDetails.height}</Text>
          <Text style={{ fontSize: 18 }}>Weight: {pokemonDetails.weight}</Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Types:</Text>
          {pokemonDetails.types.map((typeItem, index) => (
            <Text key={index} style={{ fontSize: 16 }}>{typeItem.type.name}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default PokemonDetails;
