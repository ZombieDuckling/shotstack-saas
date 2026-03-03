import { supabase } from './client';
import { supabaseServer } from './server';

export interface DbProject {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbTag {
  id: string;
  name: string;
  color: string;
  created_at: string;
}

export interface DbScreenshot {
  id: string;
  project_id: string | null;
  name: string;
  url: string;
  thumbnail: string | null;
  size: string | null;
  created_at: string;
  updated_at: string;
  tags?: DbTag[];
}

export interface CreateScreenshotInput {
  project_id?: string;
  name: string;
  url: string;
  thumbnail?: string;
  size?: string;
  tag_ids?: string[];
}

export interface CreateTagInput {
  name: string;
  color: string;
}

export interface CreateProjectInput {
  name: string;
  description?: string;
}

const screenshotsWithTags = `
  *,
  screenshot_tags!inner(
    tags!inner(
      id,
      name,
      color,
      created_at
    )
  )
`;

function getSupabase() {
  if (!supabase) {
    throw new Error('Supabase client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }
  return supabase;
}

function getSupabaseServer() {
  if (!supabaseServer) {
    throw new Error('Supabase server client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  }
  return supabaseServer;
}

class ScreenshotDal {
  async getAll(): Promise<DbScreenshot[]> {
    const { data, error } = await getSupabase()
      .from('screenshots')
      .select(screenshotsWithTags)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return this.formatScreenshotsWithTags(data || []);
  }

  async getById(id: string): Promise<DbScreenshot | null> {
    const { data, error } = await getSupabase()
      .from('screenshots')
      .select(screenshotsWithTags)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;
    return this.formatScreenshotsWithTags([data])[0];
  }

  async getByProjectId(projectId: string): Promise<DbScreenshot[]> {
    const { data, error } = await getSupabase()
      .from('screenshots')
      .select(screenshotsWithTags)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return this.formatScreenshotsWithTags(data || []);
  }

  async create(input: CreateScreenshotInput): Promise<DbScreenshot> {
    const { data: screenshot, error } = await getSupabase()
      .from('screenshots')
      .insert({
        project_id: input.project_id,
        name: input.name,
        url: input.url,
        thumbnail: input.thumbnail,
        size: input.size,
      })
      .select()
      .single();

    if (error) throw error;

    if (input.tag_ids && input.tag_ids.length > 0) {
      const tagLinks = input.tag_ids.map((tag_id) => ({
        screenshot_id: screenshot.id,
        tag_id,
      }));

      const { error: tagError } = await getSupabase()
        .from('screenshot_tags')
        .insert(tagLinks);

      if (tagError) throw tagError;
    }

    return this.getById(screenshot.id) as Promise<DbScreenshot>;
  }

  async update(id: string, input: Partial<CreateScreenshotInput>): Promise<DbScreenshot> {
    const { data: screenshot, error } = await getSupabase()
      .from('screenshots')
      .update({
        project_id: input.project_id,
        name: input.name,
        url: input.url,
        thumbnail: input.thumbnail,
        size: input.size,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (input.tag_ids !== undefined) {
      await getSupabase().from('screenshot_tags').delete().eq('screenshot_id', id);
      
      if (input.tag_ids.length > 0) {
        const tagLinks = input.tag_ids.map((tag_id) => ({
          screenshot_id: id,
          tag_id,
        }));
        await getSupabase().from('screenshot_tags').insert(tagLinks);
      }
    }

    return this.getById(id) as Promise<DbScreenshot>;
  }

  async delete(id: string): Promise<void> {
    const { error } = await getSupabase().from('screenshots').delete().eq('id', id);
    if (error) throw error;
  }

  formatScreenshotsWithTags(data: any[]): DbScreenshot[] {
    return data.map((item) => {
      const tags = item.screenshot_tags?.map((st: any) => st.tags) || [];
      return {
        ...item,
        tags: tags.filter((t: any) => t !== null),
      };
    });
  }
}

class TagDal {
  async getAll(): Promise<DbTag[]> {
    const { data, error } = await getSupabase()
      .from('tags')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  }

  async getById(id: string): Promise<DbTag | null> {
    const { data, error } = await getSupabase()
      .from('tags')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async create(input: CreateTagInput): Promise<DbTag> {
    const { data, error } = await getSupabase()
      .from('tags')
      .insert(input)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, input: Partial<CreateTagInput>): Promise<DbTag> {
    const { data, error } = await getSupabase()
      .from('tags')
      .update(input)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await getSupabase().from('tags').delete().eq('id', id);
    if (error) throw error;
  }
}

class ProjectDal {
  async getAll(): Promise<DbProject[]> {
    const { data, error } = await getSupabase()
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(id: string): Promise<DbProject | null> {
    const { data, error } = await getSupabase()
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async create(input: CreateProjectInput): Promise<DbProject> {
    const { data, error } = await getSupabase()
      .from('projects')
      .insert(input)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, input: Partial<CreateProjectInput>): Promise<DbProject> {
    const { data, error } = await getSupabase()
      .from('projects')
      .update({
        ...input,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await getSupabase().from('projects').delete().eq('id', id);
    if (error) throw error;
  }
}

export const screenshots = new ScreenshotDal();
export const tags = new TagDal();
export const projects = new ProjectDal();

export const serverScreenshots = {
  async getAll() {
    const { data, error } = await getSupabaseServer()
      .from('screenshots')
      .select(screenshotsWithTags)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return new ScreenshotDal().formatScreenshotsWithTags(data || []);
  },
};

export const serverTags = {
  async getAll() {
    const { data, error } = await getSupabaseServer()
      .from('tags')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  },
};

export const serverProjects = {
  async getAll() {
    const { data, error } = await getSupabaseServer()
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },
};
