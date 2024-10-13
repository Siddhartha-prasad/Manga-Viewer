import React, { useEffect, useState } from 'react';
import { fetchChapterDetails } from '../services/api';

const MangaViewer = ({ chapterId, onNextChapter, onPreviousChapter }) => {
  const [pages, setPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    if (chapterId) {
      fetchChapterDetails(chapterId)
        .then(response => {
          setPages(response.data.pages);
          setCurrentPageIndex(0);
        })
        .catch(error => console.error('Error fetching chapter pages:', error));
    }
  }, [chapterId]);

  const goToNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else {
      onNextChapter();
    }
  };

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    } else {
      onPreviousChapter();
    }
  };

  if (!pages.length) return <div>Loading...</div>;

  return (
    <div className="manga-viewer">
      <img
        src={pages[currentPageIndex].url}
        alt={`Page ${currentPageIndex + 1}`}
        onClick={goToNextPage}
        style={{ width: '100%', cursor: 'pointer' }}
      />
      <div className="navigation-buttons">
        <button onClick={goToPreviousPage} disabled={currentPageIndex === 0}>
          Previous
        </button>
        <button onClick={goToNextPage} disabled={currentPageIndex === pages.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MangaViewer;
