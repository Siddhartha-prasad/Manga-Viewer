import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../services/api';

const BookList = ({ onBookSelect }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks()
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="book-list">
      {books.map(book => (
        <button key={book.id} onClick={() => onBookSelect(book.id)}>
          {book.title}
        </button>
      ))}
    </div>
  );
};

export default BookList;
