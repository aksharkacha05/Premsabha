# 🔧 API Setup Guide - Where to Set Your Custom API

## 📍 **PRIMARY LOCATION: `config/api.js`**

This is the **main file** where you set your custom API endpoints:

```javascript
// File: config/api.js
export const API_CONFIG = {
  // 🔥 CHANGE THIS TO YOUR API BASE URL 🔥
  BASE_URL: 'https://dummyjson.com', // ← REPLACE WITH YOUR API
  
  // Authentication endpoints - Update these to match your API
  ENDPOINTS: {
    LOGIN: '/auth/login',        // ← Your login endpoint
    SIGNUP: '/users/add',        // ← Your signup endpoint  
    LOGOUT: '/auth/logout',      // ← Your logout endpoint
    REFRESH_TOKEN: '/auth/refresh', // ← Your token refresh endpoint
  },
};
```

## 🔄 **SECONDARY LOCATIONS: Update these files too**

### 1. **Login Screen: `Auth/LoginAuth.js`**
```javascript
// Line ~45: Update the fetch URL
const response = await fetch('https://dummyjson.com/auth/login', {
  // Change to: const response = await fetch('YOUR_API_BASE_URL/login', {
```

### 2. **SignUp Screen: `Auth/SignUp.js`**
```javascript
// Line ~70: Update the fetch URL  
const response = await fetch('https://dummyjson.com/users/add', {
  // Change to: const response = await fetch('YOUR_API_BASE_URL/signup', {
```

## 🚀 **Quick Setup Steps:**

### **Step 1: Update `config/api.js`**
```javascript
BASE_URL: 'https://your-api-domain.com/api', // Your API base URL
ENDPOINTS: {
  LOGIN: '/auth/login',        // Your login endpoint
  SIGNUP: '/auth/signup',      // Your signup endpoint
  LOGOUT: '/auth/logout',      // Your logout endpoint
  REFRESH_TOKEN: '/auth/refresh', // Your token refresh endpoint
},
```

### **Step 2: Update Login Screen**
```javascript
// In Auth/LoginAuth.js, line ~45
const response = await fetch('https://your-api-domain.com/api/auth/login', {
```

### **Step 3: Update SignUp Screen**
```javascript
// In Auth/SignUp.js, line ~70
const response = await fetch('https://your-api-domain.com/api/auth/signup', {
```

## 📋 **Example API Endpoints:**

### **Your API should accept:**

**Login Request:**
```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

**SignUp Request:**
```json
POST /auth/signup
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}
```

### **Expected Response Format:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "your-auth-token",
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "fullName": "User Name"
    }
  }
}
```

## ⚠️ **Important Notes:**

1. **Use HTTPS** for production APIs
2. **Test your endpoints** before deploying
3. **Handle errors properly** - the app already has error handling
4. **Update request/response format** if your API is different
5. **Add authentication headers** if needed

## 🔍 **Testing Your API:**

1. Test with Postman or curl first
2. Check console logs in the app
3. Verify response format matches expected structure
4. Test error cases (invalid credentials, network errors)

---

**🎯 Main File to Edit: `config/api.js`**
**📍 Key Line: `BASE_URL: 'your-api-url'`** 

# API Setup Guide - Sabha App

## 🔧 Backend API Configuration

This guide will help you set up the backend API for the Sabha App to serve PDFs and Kirtans.

### 📋 Required API Endpoints

Your backend should implement the following endpoints:

#### 🔐 Authentication Endpoints
```
POST /api/auth/login
POST /api/auth/signup  
POST /api/auth/logout
POST /api/auth/refresh
```

#### 📚 PDF Library Endpoints
```
GET /api/pdfs                    # Get all PDFs
GET /api/pdfs/:id               # Get specific PDF
GET /api/pdfs/categories        # Get PDF categories
GET /api/pdfs/search?q=query    # Search PDFs
```

#### 🎵 Kirtan Player Endpoints
```
GET /api/kirtans                # Get all kirtans
GET /api/kirtans/:id           # Get specific kirtan
GET /api/kirtans/categories    # Get kirtan categories
GET /api/kirtans/search?q=query # Search kirtans
GET /api/kirtans/:id/audio     # Get kirtan audio file
```

### 📊 Expected API Response Formats

#### PDF Response Format
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Vachanamrut - Gadhada I",
      "category": "Vachanamrut",
      "description": "Sacred discourses of Lord Swaminarayan",
      "url": "https://your-api.com/pdfs/1/file",
      "icon": "📖",
      "size": "2.5 MB",
      "pages": 150,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Kirtan Response Format
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Jai Shree Krishna",
      "artist": "Traditional",
      "category": "Bhajans",
      "duration": "5:32",
      "thumbnail": "🕉️",
      "audioUrl": "https://your-api.com/kirtans/1/audio",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Categories Response Format
```json
{
  "success": true,
  "data": ["Vachanamrut", "SwaminiVato", "Shikshapatri", "Aarti", "Stotra"]
}
```

### 🔧 Frontend Configuration

#### 1. Update API Base URL
In `config/api.js`, update the `BASE_URL`:
```javascript
BASE_URL: 'https://your-actual-api-domain.com/api',
```

#### 2. Authentication Token Management
Implement token storage and retrieval:
```javascript
// Example using AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStoredToken = async () => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};
```

#### 3. Update API Calls
Replace `token = null` with actual token retrieval:
```javascript
// In PdfLibraryScreen.js and KirtanPlayerScreen.js
const token = await getStoredToken();
```

### 🗄️ Database Schema Suggestions

#### PDFs Table
```sql
CREATE TABLE pdfs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  file_path VARCHAR(500) NOT NULL,
  file_size VARCHAR(50),
  pages INT,
  icon VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Kirtans Table
```sql
CREATE TABLE kirtans (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  duration VARCHAR(10),
  audio_path VARCHAR(500) NOT NULL,
  thumbnail VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 📁 File Storage Structure

Organize your files as follows:
```
/uploads/
├── pdfs/
│   ├── vachanamrut/
│   │   ├── gadhada-1.pdf
│   │   └── gadhada-2.pdf
│   ├── swamini-vato/
│   │   └── part-1.pdf
│   └── shikshapatri/
│       └── shikshapatri.pdf
└── kirtans/
    ├── bhajans/
    │   ├── jai-shree-krishna.mp3
    │   └── hare-krishna.mp3
    ├── mantras/
    │   └── om-namah-shivaya.mp3
    └── aartis/
        └── kunj-bihari-aarti.mp3
```

### 🔒 Security Considerations

1. **Authentication**: Implement JWT or session-based authentication
2. **File Access**: Protect file endpoints with authentication
3. **Rate Limiting**: Implement rate limiting for API endpoints
4. **CORS**: Configure CORS for web access if needed
5. **File Validation**: Validate file types and sizes

### 🚀 Implementation Steps

1. **Set up your backend server** (Node.js, Python, PHP, etc.)
2. **Create the database tables** using the schema above
3. **Implement the API endpoints** with proper error handling
4. **Set up file upload and storage** for PDFs and audio files
5. **Update the frontend configuration** with your API URL
6. **Test all endpoints** using Postman or similar tools
7. **Deploy your backend** to a hosting service

### 🧪 Testing Your API

Use these curl commands to test your endpoints:

```bash
# Test PDF endpoints
curl -X GET "https://your-api.com/api/pdfs"
curl -X GET "https://your-api.com/api/pdfs/categories"
curl -X GET "https://your-api.com/api/pdfs/search?q=vachanamrut"

# Test Kirtan endpoints
curl -X GET "https://your-api.com/api/kirtans"
curl -X GET "https://your-api.com/api/kirtans/categories"
curl -X GET "https://your-api.com/api/kirtans/search?q=krishna"
```

### 📱 App Integration

Once your API is ready:

1. **Update the BASE_URL** in `config/api.js`
2. **Implement token management** for authentication
3. **Test the app** - it will automatically fetch data from your API
4. **Add real PDF and audio files** through your backend
5. **Deploy the app** to app stores

### 🔄 Fallback Behavior

The app includes fallback mechanisms:
- **Demo Mode**: Shows sample data if API is unavailable
- **Local Search**: Falls back to client-side search if API search fails
- **Error Handling**: Graceful error messages and retry options

### 📞 Support

If you need help with:
- **Backend implementation**: Contact your backend developer
- **Frontend integration**: Check the code comments and this guide
- **API testing**: Use the provided curl commands
- **Deployment**: Follow standard deployment procedures for your platform

The app is now ready to connect to your backend API! 🎉 