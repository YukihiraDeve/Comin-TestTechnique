import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const PokemonItem = styled.TouchableOpacity`
  padding: 15px;
  border-bottom-width: 1px;
  border-color: #ccc;
  flex-direction: row;
  align-items: center;
`;

export const PokemonName = styled.Text`
  font-size: 18px;
  color: #333;
`;

export const LoadingIndicator = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const PokemonImage = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

export const ErrorText = styled.Text`
  color: red;
  text-align: center;
  font-size: 16px;
`;
