import { Screenshot, ViewMode } from '../types';
import './ScreenshotCard.css';

interface ScreenshotCardProps {
  screenshot: Screenshot;
  viewMode: ViewMode;
  onTagClick?: (tagId: string) => void;
}

export function ScreenshotCard({ screenshot, viewMode, onTagClick }: ScreenshotCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={`screenshot-card ${viewMode}`}>
      <div className="card-image-container">
        <img
          src={screenshot.thumbnail}
          alt={screenshot.name}
          className="card-image"
          loading="lazy"
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">{screenshot.name}</h3>
        <div className="card-meta">
          <span className="card-date">{formatDate(screenshot.createdAt)}</span>
          <span className="card-size">{screenshot.size}</span>
        </div>
        <div className="card-tags">
          {screenshot.tags.map((tag) => (
            <span
              key={tag.id}
              className="card-tag"
              style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
              onClick={() => onTagClick?.(tag.id)}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
