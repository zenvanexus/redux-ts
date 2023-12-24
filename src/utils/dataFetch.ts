import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface DataFetchOptions extends AxiosRequestConfig {
  successFn?: (data: any) => void;
  errorFn?: (error: any) => void;
  credentials?: string;
}

const dataFetch = async (
  url: string,
  options: DataFetchOptions = {},
  successFn?: (data: any) => void,
  errorFn?: (error: any) => void,
) => {
  const axiosInstance = axios.create({
    withCredentials: true,
  });

  try {
    const response: AxiosResponse = await axiosInstance(url, options);

    if (response.status === 401 || response.request.responseURL !== url) {
      if (window.location.host.endsWith("3000")) {
        window.location.href = "/user/login";
      } else {
        window.location.reload();
      }
    }

    if (response.status >= 200 && response.status < 300) {
      const data = response.data;

      if (typeof data === "string") {
        try {
          const parsedData = JSON.parse(data);
          options.successFn && options.successFn(parsedData);
          return parsedData;
        } catch (error) {
          options.successFn && options.successFn(data);
          return data;
        }
      } else {
        // If data is not a string, return it directly
        options.successFn && options.successFn(data);
        return data;
      }
    } else {
      const error = new Error(response.data);
      options.errorFn && options.errorFn(error);
      throw error;
    }
  } catch (error) {
    // Handle any additional error handling if needed
    console.error("Error in dataFetch:", error);
    options.errorFn && options.errorFn(error);
    throw error;
  }
};

/**
 * promisifiedDataFetch adds a promise wrapper to the dataFetch function
 * and ideal for use inside async functions - which is most of the functions
 * @param {string} url url is the endpoint
 * @param {Record<string, any>} options HTTP request options
 * @returns
 */
export function promisifiedDataFetch(
  url: string,
  options: Record<string, any> = {},
) {
  return new Promise((resolve, reject) => {
    dataFetch(
      url,
      options,
      (result) => resolve(result),
      (err) => reject(err),
    );
  });
}

export default dataFetch;
