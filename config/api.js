// API Configuration for Premsabha App
// 🔧 SET YOUR PRODUCTION API ENDPOINTS HERE 🔧

export const API_CONFIG = {
  // 🔥 CHANGE THIS TO YOUR PRODUCTION API BASE URL 🔥
  BASE_URL: 'https://your-api-domain.com/api', // Replace with your actual API URL
  
  // Authentication endpoints - Update these to match your API
  ENDPOINTS: {
    LOGIN: '/auth/login',        // Your login endpoint
    SIGNUP: '/auth/signup',      // Your signup endpoint  
    LOGOUT: '/auth/logout',      // Your logout endpoint
    REFRESH_TOKEN: '/auth/refresh', // Your token refresh endpoint
  },
  
  // API Headers
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get headers with authentication token
export const getAuthHeaders = (token = null) => {
  const headers = { ...API_CONFIG.HEADERS };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}; 