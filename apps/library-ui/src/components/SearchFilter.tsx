import { Tag } from '../types';
import './SearchFilter.css';

interface SearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  tags: Tag[];
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
}

export function SearchFilter({
  search,
  onSearchChange,
  tags,
  selectedTags,
  onTagToggle,
}: SearchFilterProps) {
  return (
    <div className="search-filter">
      <div className="search-input-container">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search screenshots..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {search && (
          <button
            className="clear-search"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <div className="tag-filters">
        {tags.map((tag) => (
          <button
            key={tag.id}
            className={`tag-filter ${selectedTags.includes(tag.id) ? 'active' : ''}`}
            style={{
              '--tag-color': tag.color,
            } as React.CSSProperties}
            onClick={() => onTagToggle(tag.id)}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}
