import axios from 'axios';

const API_BASE_URL = 'http://52.195.171.228:8080/';

// Fetch the list of books
export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}books/`);
    return response;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Fetch details of a book (chapters, etc.)
export const fetchBookDetails = async (bookId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}books/${bookId}/`);
    return response;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

// Fetch details of a specific chapter
export const fetchChapterDetails = async (chapterId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}chapters/${chapterId}/`);
    return response;
  } catch (error) {
    console.error('Error fetching chapter details:', error);
    throw error;
  }
};
