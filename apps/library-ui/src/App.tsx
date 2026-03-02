import { useState, useMemo } from 'react';
import { Screenshot, ViewMode } from './types';
import { mockScreenshots, mockTags } from './data/mockData';
import { UploadForm } from './components/UploadForm';
import { ViewToggle } from './components/ViewToggle';
import { SearchFilter } from './components/SearchFilter';
import { ScreenshotGrid } from './components/ScreenshotGrid';
import './App.css';

function App() {
  const [screenshots, setScreenshots] = useState<Screenshot[]>(mockScreenshots);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleUpload = (file: File) => {
    const newScreenshot: Screenshot = {
      id: String(Date.now()),
      name: file.name.replace(/\.[^/.]+$/, ''),
      url: URL.createObjectURL(file),
      thumbnail: URL.createObjectURL(file),
      tags: [],
      createdAt: new Date(),
      size: `${(file.size / 1024).toFixed(0)} KB`,
    };
    setScreenshots((prev) => [newScreenshot, ...prev]);
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const filteredScreenshots = useMemo(() => {
    return screenshots.filter((screenshot) => {
      const matchesSearch =
        search === '' ||
        screenshot.name.toLowerCase().includes(search.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tagId) =>
          screenshot.tags.some((t) => t.id === tagId)
        );
      return matchesSearch && matchesTags;
    });
  }, [screenshots, search, selectedTags]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <svg className="logo" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h1>Screenshot Library</h1>
          </div>
          <span className="screenshot-count">
            {filteredScreenshots.length} {filteredScreenshots.length === 1 ? 'screenshot' : 'screenshots'}
          </span>
        </div>
      </header>

      <main className="main">
        <div className="toolbar">
          <SearchFilter
            search={search}
            onSearchChange={setSearch}
            tags={mockTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
          />
          <ViewToggle viewMode={viewMode} onChange={setViewMode} />
        </div>

        <UploadForm onUpload={handleUpload} />

        <ScreenshotGrid
          screenshots={filteredScreenshots}
          viewMode={viewMode}
          onTagClick={handleTagToggle}
        />
      </main>
    </div>
  );
}

export default App;
