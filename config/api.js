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
    
    // PDF Library endpoints
    GET_PDFS: '/pdfs',           // Get all PDFs
    GET_PDF_BY_ID: '/pdfs/:id',  // Get specific PDF
    GET_PDF_CATEGORIES: '/pdfs/categories', // Get PDF categories
    SEARCH_PDFS: '/pdfs/search', // Search PDFs
    
    // Kirtan Player endpoints
    GET_KIRTANS: '/kirtans',     // Get all kirtans
    GET_KIRTAN_BY_ID: '/kirtans/:id', // Get specific kirtan
    GET_KIRTAN_CATEGORIES: '/kirtans/categories', // Get kirtan categories
    SEARCH_KIRTANS: '/kirtans/search', // Search kirtans
    GET_KIRTAN_AUDIO: '/kirtans/:id/audio', // Get kirtan audio file
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

// PDF API Functions
export const pdfApi = {
  // Get all PDFs
  getAllPdfs: async (token = null) => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_PDFS), {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      return { success: false, error: error.message };
    }
  },

  // Get PDFs by category
  getPdfsByCategory: async (category, token = null) => {
    try {
      const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.GET_PDFS}?category=${category}`), {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching PDFs by category:', error);
      return { success: false, error: error.message };
    }
  },

  // Search PDFs
  searchPdfs: async (query, token = null) => {
    try {
      const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.SEARCH_PDFS}?q=${encodeURIComponent(query)}`), {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error searching PDFs:', error);
      return { success: false, error: error.message };
    }
  },

  // Get PDF categories
  getPdfCategories: async (token = null) => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_PDF_CATEGORIES), {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching PDF categories:', error);
      return { success: false, error: error.message };
    }
  },

  // Get specific PDF
  getPdfById: async (id, token = null) => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_PDF_BY_ID.replace(':id', id)), {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching PDF:', error);
      return { success: false, error: error.message };
    }
  },
};

// Kirtan API Functions
export const kirtanApi = {
  // Get all kirtans
  getAllKirtans: async (token = null) => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_KIRTANS), {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching kirtans:', error);
      return { success: false, error: error.message };
    }
  },

  // Get kirtans by category
  getKirtansByCategory: async (category, token = null) => {
    try {
      const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.GET_KIRTANS}?category=${category}`), {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching kirtans by category:', error);
      return { success: false, error: error.message };
    }
  },

  // Search kirtans
  searchKirtans: async (query, token = null) => {
    try {
      const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.SEARCH_KIRTANS}?q=${encodeURIComponent(query)}`), {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error searching kirtans:', error);
      return { success: false, error: error.message };
    }
  },

  // Get kirtan categories
  getKirtanCategories: async (token = null) => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_KIRTAN_CATEGORIES), {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching kirtan categories:', error);
      return { success: false, error: error.message };
    }
  },

  // Get specific kirtan
  getKirtanById: async (id, token = null) => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_KIRTAN_BY_ID.replace(':id', id)), {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching kirtan:', error);
      return { success: false, error: error.message };
    }
  },

  // Get kirtan audio URL
  getKirtanAudioUrl: (id) => {
    return getApiUrl(API_CONFIG.ENDPOINTS.GET_KIRTAN_AUDIO.replace(':id', id));
  },
}; 