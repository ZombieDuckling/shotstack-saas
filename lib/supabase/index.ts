export { supabase } from './client';
export { isSupabaseConfigured } from './client';
export { supabaseServer } from './server';
export { isSupabaseServerConfigured } from './server';
export {
  screenshots,
  tags,
  projects,
  serverScreenshots,
  serverTags,
  serverProjects,
} from './dal';
export type { 
  DbScreenshot, 
  DbTag, 
  DbProject, 
  CreateScreenshotInput, 
  CreateTagInput, 
  CreateProjectInput 
} from './dal';
