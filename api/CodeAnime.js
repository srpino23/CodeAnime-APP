import axios from 'axios';

export const NewAnimes = async (searchTerm = '*') =>
  await axios.get(`http://api.codeanime.v6.army/search/${searchTerm}`);

export const PopularAnimes = async (searchTerm = '*') =>
  await axios.get(`http://api.codeanime.v6.army/search/${searchTerm}`);

export const RecomendedAnimes = async (searchTerm = '*') =>
  await axios.get(`http://api.codeanime.v6.army/search/${searchTerm}`);

export const SearchAnimes = async (searchTerm = '*') =>
  await axios.get(`http://api.codeanime.v6.army/search/${searchTerm}`);

export const ListAnimes = async (searchTerm = '*') =>
  await axios.get(`http://api.codeanime.v6.army/search/${searchTerm}`);
