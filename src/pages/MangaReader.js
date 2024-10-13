import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MangaReader() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [pages, setPages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch books on component mount
  useEffect(() => {
    axios.get('http://52.195.171.228:8080/books/')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  // Fetch chapters when a book is selected
  useEffect(() => {
    if (selectedBook) {
      const chapterRequests = selectedBook.chapter_ids.map(id =>
        axios.get(`http://52.195.171.228:8080/chapters/${id}/`)
      );
      Promise.all(chapterRequests)
        .then(responses => setChapters(responses.map(res => res.data)))
        .catch(error => console.error('Error fetching chapters:', error));
    }
  }, [selectedBook]);

  // Fetch pages when a chapter is selected
  useEffect(() => {
    if (selectedChapter) {
      setPages(selectedChapter.pages);
      setCurrentIndex(0); // Reset index when a new chapter is selected
    }
  }, [selectedChapter]);

  const handleLeftClick = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };

  const handleRightClick = () => {
    if (currentIndex + 1 === pages.length) return;
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Manga Reader</h1>
      
      <div>
        <h4>Select a Book</h4>
        {books.map(book => (
          <button 
            key={book.id} 
            onClick={() => {
              setSelectedBook(book);
              setCurrentIndex(0); // Reset index when selecting a new book
              setSelectedChapter(null); // Reset chapter selection
            }} 
            className={selectedBook === book ? 'selected' : ''} // Add selected class
          >
            {book.title}
          </button>
        ))}
      </div>

      {selectedBook && (
        <div>
          <h4>Chapters for {selectedBook.title}</h4>
          {chapters.map(chapter => (
            <button 
              key={chapter.id} 
              onClick={() => {
                setSelectedChapter(chapter);
                setCurrentIndex(0); // Reset index when selecting a new chapter
              }} 
              className={selectedChapter === chapter ? 'selected' : ''} // Add selected class
            >
              {chapter.title}
            </button>
          ))}
        </div>
      )}

      {selectedChapter && (
        <div>
          <h4>Reading {selectedChapter.title}</h4>
          <div className="pages">
            <div className='left-click' onClick={handleLeftClick} />
            <img 
              key={pages[currentIndex]?.id} 
              src={pages[currentIndex]?.image.file} 
              alt={`Page ${currentIndex + 1}`} 
              className='chapter-img' 
            />
            <div className='right-click' onClick={handleRightClick} />
            <p>{(currentIndex + 1)} / {pages.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MangaReader;
