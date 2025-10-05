import { axiosInstance } from '@providers';
import { API_ENDPOINT } from './endpoints';

export interface ReportCheckInIssueRequest {
  project_id: number;
  issue_type: string;
  description: string;
  notes?: string;
}

export interface ReportCheckInIssueResponse {
  message: string;
  issueId: string;
  emailSent: boolean;
  reportedAt: string;
  project: {
    id: number;
    name: string;
  };
  issueType: string;
}

export const CheckInIssueApi = {
  /**
   * Report a check-in issue
   * @param issueData - Issue details to report
   * @returns Promise with the response data
   */
  reportIssue: async (issueData: ReportCheckInIssueRequest): Promise<ReportCheckInIssueResponse> => {
    try {
      const response = await axiosInstance.post(API_ENDPOINT.REPORT_CHECKIN_ISSUE, issueData);
      return response.data;
    } catch (error: any) {
      console.error('Error reporting check-in issue:', error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Failed to report issue. Please try again.'
      );
    }
  },
};
