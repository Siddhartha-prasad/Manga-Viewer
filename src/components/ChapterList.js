import React from 'react';

const ChapterList = ({ chapters, onChapterSelect }) => {
  // Ensure that chapters is an array before mapping over it
  if (!chapters || chapters.length === 0) {
    return <div>No chapters available.</div>;
  }

  return (
    <div className="chapter-list">
      {chapters.map((chapter) => (
        <button key={chapter.id} onClick={() => onChapterSelect(chapter.id)}>
          {chapter.title}
        </button>
      ))}
    </div>
  );
};

export default ChapterList;
