import { useState, useEffect } from 'react';
import { ProjectApi } from '../../../api/ProjectApi';

export const useReportCheckIn = () => {
  const [formData, setFormData] = useState({
    project: '',
    destination: '',
    issue: '',
    description: '',
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // Issue types for the dropdown
  const issueTypes = [
    { label: 'Location Access Issue', value: 'location_access' },
    { label: 'GPS/Location Not Working', value: 'gps_issue' },
    { label: 'Network Connection Problem', value: 'network_issue' },
    { label: 'App Crashed During Check-in', value: 'app_crash' },
    { label: 'Wrong Project Information', value: 'wrong_project' },
    { label: 'Check-in Button Not Responding', value: 'button_not_responding' },
    { label: 'Authentication Failed', value: 'auth_failed' },
    { label: 'Server Error', value: 'server_error' },
    { label: 'Other Technical Issue', value: 'other_technical' },
    { label: 'Other', value: 'other' },
  ];

  const isFormValid = Object.values(formData).every(
    value => value.trim() !== '',
  );

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
      destination: '',
      issue: '',
      description: '',
    });
  };

  const handleFinish = () => {
    resetForm();
  };

  return {
    formData,
    isFormValid,
    handleFieldChange,
    handleFinish,
    projects,
    issueTypes,
    loading,
  };
};
