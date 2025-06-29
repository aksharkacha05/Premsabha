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