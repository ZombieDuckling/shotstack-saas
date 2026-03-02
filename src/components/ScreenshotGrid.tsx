import { Screenshot, ViewMode } from '../types';
import { ScreenshotCard } from './ScreenshotCard';
import './ScreenshotGrid.css';

interface ScreenshotGridProps {
  screenshots: Screenshot[];
  viewMode: ViewMode;
  onTagClick?: (tagId: string) => void;
}

export function ScreenshotGrid({ screenshots, viewMode, onTagClick }: ScreenshotGridProps) {
  if (screenshots.length === 0) {
    return (
      <div className="empty-state">
        <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="empty-title">No screenshots found</p>
        <p className="empty-subtitle">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className={`screenshot-grid ${viewMode}`}>
      {screenshots.map((screenshot) => (
        <ScreenshotCard
          key={screenshot.id}
          screenshot={screenshot}
          viewMode={viewMode}
          onTagClick={onTagClick}
        />
      ))}
    </div>
  );
}
