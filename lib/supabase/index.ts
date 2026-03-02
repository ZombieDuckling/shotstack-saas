export { supabase } from './client';
export { supabaseServer } from './server';
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
