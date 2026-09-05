// Production-ready API client for FarmDirect frontend
// Seamless connection to Node/Express backend with robust timeout and offline tolerance

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const TOKEN_KEY = 'farmdirect_token';

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  getToken() {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  setToken(token) {
    try {
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch (e) {
      console.warn('LocalStorage error setting token', e);
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const token = this.getToken();

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return {
          success: false,
          status: response.status,
          message: data?.message || `Request failed with status ${response.status}`,
          data: null
        };
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      // Offline / network failure / abort timeout
      return {
        success: false,
        offline: true,
        message: error.name === 'AbortError' ? 'Request timed out' : 'Backend offline or unreachable',
        error: error.message,
        data: null
      };
    }
  }

  get(endpoint, params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, val);
      }
    });
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return this.request(`${endpoint}${queryString}`, { method: 'GET' });
  }

  post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
