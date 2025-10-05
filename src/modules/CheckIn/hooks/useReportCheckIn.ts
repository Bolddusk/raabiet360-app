import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectApi } from '../../../api/ProjectApi';
import { CheckInIssueApi } from '../../../api/CheckInIssueApi';

export const useReportCheckIn = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    project: '',
    issue: '',
    description: '',
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Issue types for the dropdown with translations
  const issueTypes = [
    { label: t('ReportCheckIn.IssueTypes.LocationAccess'), value: 'location_access' },
    { label: t('ReportCheckIn.IssueTypes.GpsIssue'), value: 'gps_issue' },
    { label: t('ReportCheckIn.IssueTypes.NetworkIssue'), value: 'network_issue' },
    { label: t('ReportCheckIn.IssueTypes.AppCrash'), value: 'app_crash' },
    { label: t('ReportCheckIn.IssueTypes.WrongProject'), value: 'wrong_project' },
    { label: t('ReportCheckIn.IssueTypes.ButtonNotResponding'), value: 'button_not_responding' },
    { label: t('ReportCheckIn.IssueTypes.AuthFailed'), value: 'auth_failed' },
    { label: t('ReportCheckIn.IssueTypes.ServerError'), value: 'server_error' },
    { label: t('ReportCheckIn.IssueTypes.OtherTechnical'), value: 'other_technical' },
    { label: t('ReportCheckIn.IssueTypes.Other'), value: 'other' },
  ];

  const isFormValid = Object.values(formData).every(
    value => value.trim() !== '',
  ) && formData.description.trim().length >= 20 && formData.description.trim().length <= 250;

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const fetchedProjects = await ProjectApi.getMyProjects();
        // Transform projects to dropdown format
        const projectOptions = fetchedProjects.map(project => ({
          label: project.customer || project.title,
          value: project.id.toString(),
          location: project.address,
        }));
        setProjects(projectOptions);
      } catch (error) {
        // Fallback to empty array
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const resetForm = () => {
    setFormData({
      project: '',
      issue: '',
      description: '',
    });
  };

  const handleFinish = async () => {
    if (!isFormValid) {
      return;
    }

    try {
      setSubmitting(true);
      
      const issueData = {
        project_id: parseInt(formData.project),
        issue_type: formData.issue,
        description: formData.description.trim(),
      };

      const response = await CheckInIssueApi.reportIssue(issueData);
      
      // Reset form after successful submission
      resetForm();
      
      return {
        success: true,
        data: response,
        message: 'Issue reported successfully',
      };
    } catch (error: any) {
      console.error('Error reporting issue:', error);
      return {
        success: false,
        error: error.message || 'Failed to report issue. Please try again.',
      };
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formData,
    isFormValid,
    handleFieldChange,
    handleFinish,
    projects,
    issueTypes,
    loading,
    submitting,
  };
};
