import axios from 'axios';

const api = axios.create({
  baseURL: 'https://brazillian-wordle-api.vercel.app',
});


export const validWord = async (word) => {
    try {
      const response = await api.get(`/valid/${word}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter dados válidos para ${word}:`, error);
      throw error;
    }
  };