import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';

export type DataSource = 'supabase' | 'local';

export interface LibraryScreenshot {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  size: string;
  createdAt: string;
  tags: string[];
}

export interface LibraryResult {
  items: LibraryScreenshot[];
  source: DataSource;
}

const STORAGE_KEY = 'shotstack.local.screenshots.v1';

function buildSeedImage(label: string, from: string, to: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='${from}'/><stop offset='100%' stop-color='${to}'/></linearGradient></defs><rect width='1200' height='800' fill='url(#g)'/><g fill='white' opacity='0.92'><rect x='120' y='110' rx='20' width='960' height='90'/><rect x='120' y='240' rx='20' width='420' height='420'/><rect x='570' y='240' rx='20' width='510' height='200'/><rect x='570' y='460' rx='20' width='510' height='200'/></g><text x='600' y='154' text-anchor='middle' font-size='48' font-family='Arial, sans-serif' fill='#1f2937'>${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const seededScreenshots: LibraryScreenshot[] = [
  {
    id: 'seed-1',
    name: 'Dashboard Release Candidate',
    url: buildSeedImage('Dashboard RC', '#34d399', '#0ea5e9'),
    thumbnail: buildSeedImage('Dashboard RC', '#34d399', '#0ea5e9'),
    size: '1.1 MB',
    createdAt: '2026-02-25T10:15:00.000Z',
    tags: ['Dashboard', 'Release'],
  },
  {
    id: 'seed-2',
    name: 'Landing Page Hero Refresh',
    url: buildSeedImage('Landing Hero', '#fb7185', '#f59e0b'),
    thumbnail: buildSeedImage('Landing Hero', '#fb7185', '#f59e0b'),
    size: '980 KB',
    createdAt: '2026-02-24T13:20:00.000Z',
    tags: ['Marketing', 'Landing'],
  },
  {
    id: 'seed-3',
    name: 'Library Grid Exploration',
    url: buildSeedImage('Library Grid', '#818cf8', '#22d3ee'),
    thumbnail: buildSeedImage('Library Grid', '#818cf8', '#22d3ee'),
    size: '1.4 MB',
    createdAt: '2026-02-22T08:45:00.000Z',
    tags: ['Library', 'UI'],
  },
];

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function safeParseLocalData(raw: string | null): LibraryScreenshot[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => item && typeof item === 'object')
      .map((item) => ({
        id: String(item.id ?? `local-${Date.now()}`),
        name: String(item.name ?? 'Untitled Screenshot'),
        url: String(item.url ?? ''),
        thumbnail: String(item.thumbnail ?? item.url ?? ''),
        size: String(item.size ?? 'Unknown'),
        createdAt: String(item.createdAt ?? new Date().toISOString()),
        tags: Array.isArray(item.tags) ? item.tags.map((tag: unknown) => String(tag)) : [],
      }))
      .filter((item) => item.url.length > 0);
  } catch {
    return [];
  }
}

function readLocalScreenshots() {
  if (!canUseStorage()) return [];
  return safeParseLocalData(window.localStorage.getItem(STORAGE_KEY));
}

function writeLocalScreenshots(items: LibraryScreenshot[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function mergeFallbackScreenshots(): LibraryScreenshot[] {
  const localItems = readLocalScreenshots();
  const merged = [...localItems, ...seededScreenshots];

  return merged.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

function mapSupabaseScreenshot(row: {
  id: string;
  name: string;
  url: string;
  thumbnail: string | null;
  size: string | null;
  created_at: string;
}): LibraryScreenshot {
  return {
    id: row.id,
    name: row.name,
    url: row.url,
    thumbnail: row.thumbnail ?? row.url,
    size: row.size ?? 'Unknown',
    createdAt: row.created_at,
    tags: [],
  };
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not read file for local fallback upload.'));
    reader.readAsDataURL(file);
  });
}

function nameWithoutExtension(fileName: string) {
  return fileName.replace(/\.[^/.]+$/, '');
}

export async function listLibraryScreenshots(): Promise<LibraryResult> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('screenshots')
        .select('id, name, url, thumbnail, size, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        items: (data ?? []).map(mapSupabaseScreenshot),
        source: 'supabase',
      };
    } catch {
      return {
        items: mergeFallbackScreenshots(),
        source: 'local',
      };
    }
  }

  return {
    items: mergeFallbackScreenshots(),
    source: 'local',
  };
}

export async function uploadLibraryScreenshot(file: File): Promise<{ item: LibraryScreenshot; source: DataSource }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const filePath = `uploads/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const bucket = supabase.storage.from('screenshots');

      const uploadResult = await bucket.upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type || 'image/png',
      });

      if (uploadResult.error) throw uploadResult.error;

      const publicUrl = bucket.getPublicUrl(filePath).data.publicUrl;
      const screenshotName = nameWithoutExtension(file.name);

      const { data, error } = await supabase
        .from('screenshots')
        .insert({
          name: screenshotName,
          url: publicUrl,
          thumbnail: publicUrl,
          size: formatFileSize(file.size),
        })
        .select('id, name, url, thumbnail, size, created_at')
        .single();

      if (error) throw error;

      return {
        item: mapSupabaseScreenshot(data),
        source: 'supabase',
      };
    } catch {
      // Fall back to local storage if Supabase upload/table setup is incomplete.
    }
  }

  const localUrl = await readFileAsDataUrl(file);
  const fallbackItem: LibraryScreenshot = {
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: nameWithoutExtension(file.name),
    url: localUrl,
    thumbnail: localUrl,
    size: formatFileSize(file.size),
    createdAt: new Date().toISOString(),
    tags: ['Upload'],
  };

  const next = [fallbackItem, ...readLocalScreenshots()];
  writeLocalScreenshots(next);

  return {
    item: fallbackItem,
    source: 'local',
  };
}

export function getReadableSource(source: DataSource) {
  return source === 'supabase' ? 'Supabase' : 'Local fallback';
}
