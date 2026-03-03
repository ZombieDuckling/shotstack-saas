-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Screenshots table
CREATE TABLE IF NOT EXISTS screenshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  thumbnail TEXT,
  size TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Screenshot tags junction table (many-to-many)
CREATE TABLE IF NOT EXISTS screenshot_tags (
  screenshot_id UUID REFERENCES screenshots(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (screenshot_id, tag_id)
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_screenshots_project_id ON screenshots(project_id);
CREATE INDEX IF NOT EXISTS idx_screenshots_created_at ON screenshots(created_at);
CREATE INDEX IF NOT EXISTS idx_tags_name ON tags(name);
CREATE INDEX IF NOT EXISTS idx_screenshot_tags_screenshot_id ON screenshot_tags(screenshot_id);
CREATE INDEX IF NOT EXISTS idx_screenshot_tags_tag_id ON screenshot_tags(tag_id);

-- Row Level Security (RLS) - enable by default
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE screenshot_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access (adjust as needed)
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on tags" ON tags FOR SELECT USING (true);
CREATE POLICY "Allow public read access on screenshots" ON screenshots FOR SELECT USING (true);
CREATE POLICY "Allow public read access on screenshot_tags" ON screenshot_tags FOR SELECT USING (true);

-- RLS Policies for authenticated insert/update/delete
CREATE POLICY "Allow authenticated insert on projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on tags" ON tags FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on tags" ON tags FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on tags" ON tags FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on screenshots" ON screenshots FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on screenshots" ON screenshots FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on screenshots" ON screenshots FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on screenshot_tags" ON screenshot_tags FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on screenshot_tags" ON screenshot_tags FOR DELETE USING (auth.role() = 'authenticated');
