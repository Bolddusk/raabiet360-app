import { axiosInstance } from '@providers';

export const getData = async (endpoint: string) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (
  endpoint: string,
  data?: any,
) => {
  try {
    const response = await axiosInstance.post(endpoint, data ?? {});

    if (response?.status >= 200 && response?.status < 300) {
      return response?.data;
    }
    throw new Error(`Unexpected status ${response?.status}`);
  } catch (error: any) {
    const apiError = error?.response?.data;

    if (apiError) {
      const message =
        Array.isArray(apiError.message) && apiError.message.length > 0
          ? apiError.message[0]
          : apiError.message || apiError.description || 'Something went wrong';

      throw {
        status: apiError.statusCode || error?.response?.status,
        error: apiError.error || 'Error',
        message,
      };
    }

    throw error;
  }
};

export const patchData = async (
  endpoint: string,
  data?: any,
) => {
  try {
    const response = await axiosInstance.patch(endpoint, data ?? {});

    if (response?.status >= 200 && response?.status < 300) {
      return response?.data;
    }
    throw new Error(`Unexpected status ${response?.status}`);
  } catch (error: any) {
    const apiError = error?.response?.data;

    if (apiError) {
      const message =
        Array.isArray(apiError.message) && apiError.message.length > 0
          ? apiError.message[0]
          : apiError.message || apiError.description || 'Something went wrong';

      throw {
        status: apiError.statusCode || error?.response?.status,
        error: apiError.error || 'Error',
        message,
      };
    }
    throw error;
  }
};

export const putData = async (
  endpoint: string,
  data?: any,
) => {
  try {
    const response = await axiosInstance.put(endpoint, data ?? {});

    if (response?.status >= 200 && response?.status < 300) {
      return response?.data;
    }
    throw new Error(`Unexpected status ${response?.status}`);
  } catch (error: any) {
    const apiError = error?.response?.data;

    if (apiError) {
      const message =
        Array.isArray(apiError.message) && apiError.message.length > 0
          ? apiError.message[0]
          : apiError.message || apiError.description || 'Something went wrong';

      throw {
        status: apiError.statusCode || error?.response?.status,
        error: apiError.error || 'Error',
        message,
      };
    }
    throw error;
  }
};
