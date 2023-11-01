/**
 * Formats a number to ensure it has two digits. Useful for ID formatting.
 * @param {number} num - The number to format.
 * @returns {string} - The formatted number as a string.
 */
export const formatNumberWithTwoDigits = (num: number): string => {
    return num.toString().padStart(2, '0');
  };
  
  /**
   * Capitalizes the first letter of a string.
   * @param {string} str - The string to capitalize.
   * @returns {string} - The capitalized string.
   */
  export const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  /**
   * Formats the weight of a Pokémon for display.
   * @param {number} weight - The weight to format, usually in hectograms.
   * @returns {string} - The formatted weight as a string with kg.
   */
  export const formatWeight = (weight: number): string => {
    // Pokémon API returns weight in hectograms. This converts it to kg.
    return `${(weight / 10).toFixed(2)} kg`;
  };
  
  /**
   * Formats the height of a Pokémon for display.
   * @param {number} height - The height to format, usually in decimetres.
   * @returns {string} - The formatted height as a string with meters.
   */
  export const formatHeight = (height: number): string => {
    // Pokémon API returns height in decimetres. This converts it to meters.
    return `${(height / 10).toFixed(2)} m`;
  };
  
  /**
   * Extracts ID from Pokémon URL.
   * @param {string} url - The URL of the Pokémon.
   * @returns {number} - The Pokémon ID.
   */
  export const extractIdFromPokemonUrl = (url: string): number => {
    const idRegExp = /\/pokemon\/(\d+)\//;
    const match = url.match(idRegExp);
    return match ? parseInt(match[1], 10) : 0;
  };
  