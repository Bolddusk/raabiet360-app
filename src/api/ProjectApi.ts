import { getData } from './AuthApi';
import { API_ENDPOINT } from './endpoints';

export interface Project {
  id: number;
  job_id: string;
  project_id: string;
  quotation_number?: string;
  customer: string; // This is the project name from backend
  name?: string; // Add name field as well
  address: string;
  floor?: string;
  manager?: string;
  duty_staff?: string;
  site_worker?: string;
  driver?: string;
  driver_id?: number;
  driver_name?: string;
  onsite_worker?: string;
  warehouse_id?: number;
  warehouse_name?: string;
  start_date: string;
  planned_end_date: string;
  hours_required: number;
  remaining_hours: number;
  work_days: number;
  key_code?: string;
  status: string;
  company: string;
  company_initials?: string;
  client_company_initials?: string;
  customer_manager_full_name?: string;
  customer_manager_email?: string;
  urgency: 'Low' | 'Normal' | 'High' | 'Urgent';
  progress_track?: string;
  description?: string;
  budget?: number;
  actual_cost?: number;
  completion_percentage?: number;
  priority?: number;
  tags?: string[];
  attachments?: string[];
  notes?: string;
  risk_level?: 'Low' | 'Medium' | 'High';
  quality_rating?: number;
  customer_satisfaction?: number;
  internal_rating?: number;
  project_type?: string;
  created_at: string;
  updated_at: string;
  // Forms status
  forms?: {
    bt_form: boolean;
    quotation: boolean;
    measuring_form: boolean;
    key_handover_form: boolean;
    starting_form: boolean;
  };
  bt_number?: string;
  // Additional project details
  amiante?: boolean;
  paint?: boolean;
  floor_yes_no?: boolean;
  floor_m2?: number;
  flooring_room?: string;
  wall_paper?: boolean;
  wall_paper_measurement?: string;
  cleaning?: boolean;
  subcontractor?: string;
  additional_task?: string;
}

export interface ProjectListResponse {
  success: boolean;
  message: string;
  data: {
    projects: Project[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    filters_applied?: Record<string, any>;
    summary?: {
      total_projects: number;
      active_projects: number;
      completed_projects: number;
      pending_projects: number;
      cancelled_projects: number;
      total_budget: number;
      total_actual_cost: number;
      average_completion_percentage: number;
    };
  };
}

export interface ProjectFilters {
  status?: string;
  urgency?: string;
  company?: string;
  customer?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'ASC' | 'DESC';
  include_forms?: boolean;
  include_financial?: boolean;
  include_performance?: boolean;
  include_resources?: boolean;
  include_analytics?: boolean;
  assigned_to_me?: boolean;
}

export const ProjectApi = {
  /**
   * Get enhanced project list with filtering options
   */
  getProjects: async (filters?: ProjectFilters): Promise<ProjectListResponse> => {
    const queryParams = new URLSearchParams();
    
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.urgency) queryParams.append('urgency', filters.urgency);
    if (filters?.company) queryParams.append('company', filters.company);
    if (filters?.customer) queryParams.append('customer', filters.customer);
    if (filters?.search) queryParams.append('search', filters.search);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());
    if (filters?.sort_by) queryParams.append('sort_by', filters.sort_by);
    if (filters?.sort_order) queryParams.append('sort_order', filters.sort_order);
    if (filters?.include_forms !== undefined) queryParams.append('include_forms', filters.include_forms.toString());
    if (filters?.include_financial !== undefined) queryParams.append('include_financial', filters.include_financial.toString());
    if (filters?.include_performance !== undefined) queryParams.append('include_performance', filters.include_performance.toString());
    if (filters?.include_resources !== undefined) queryParams.append('include_resources', filters.include_resources.toString());
    if (filters?.include_analytics !== undefined) queryParams.append('include_analytics', filters.include_analytics.toString());
    if (filters?.assigned_to_me !== undefined) queryParams.append('assigned_to_me', filters.assigned_to_me.toString());

    const endpoint = queryParams.toString() 
      ? `${API_ENDPOINT.PROJECTS()}?${queryParams.toString()}`
      : API_ENDPOINT.PROJECTS();

    return getData(endpoint);
  },

  /**
   * Get projects assigned to current user (worker)
   */
  getMyProjects: async (): Promise<Project[]> => {
    try {
      console.log('🔄 ProjectApi.getMyProjects() - Making API call with assigned_to_me=true');
      const response = await ProjectApi.getProjects({
        assigned_to_me: true, // This is the key parameter for user-assigned projects
        include_forms: true,
        include_financial: false,
        include_performance: false,
        include_resources: false,
        include_analytics: false,
        limit: 100, // Get more projects
      });
      console.log('📊 ProjectApi.getMyProjects() - API response:', response);
      console.log('📊 ProjectApi.getMyProjects() - response.data:', response.data);
      console.log('📊 ProjectApi.getMyProjects() - response.data?.projects:', response.data?.projects);
      return response.data?.projects || [];
    } catch (error) {
      console.error('❌ ProjectApi.getMyProjects() - Failed to fetch projects:', error);
      return [];
    }
  },

  /**
   * Get project by ID
   */
  getProjectById: async (projectId: number): Promise<Project> => {
    return getData(`${API_ENDPOINT.PROJECTS()}/${projectId}`);
  },

  /**
   * Get project filters/options
   */
  getProjectFilters: async (): Promise<any> => {
    return getData(API_ENDPOINT.PROJECT_FILTERS);
  },
};