# Premsabha - React Native Authentication App

A modern React Native app with beautiful authentication screens and stack navigation.

## Features

- ✅ Beautiful Login Screen with form validation
- ✅ Comprehensive SignUp Screen with password confirmation
- ✅ Stack Navigation between screens
- ✅ Form validation (email, password, phone)
- ✅ Loading states and error handling
- ✅ Ready for custom API integration
- ✅ Modern UI with shadows and proper spacing
- ✅ Keyboard handling and safe area support

## Setup Instructions

### 1. Install Dependencies

The required navigation packages have already been installed:
- `@react-navigation/native`
- `@react-navigation/stack`
- `react-native-screens`
- `react-native-safe-area-context`
- `react-native-gesture-handler`

### 2. Configure Your Custom API

1. Open `config/api.js`
2. Replace `YOUR_API_BASE_URL` with your actual API endpoint
3. Update the endpoints if your API uses different paths

Example:
```javascript
BASE_URL: 'https://your-api-domain.com/api',
ENDPOINTS: {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  // ... other endpoints
}
```

### 3. Update API Calls in Screens

In both `Auth/LoginAuth.js` and `Auth/SignUp.js`, replace the fetch calls with your actual API endpoints:

```javascript
// Replace this:
const response = await fetch('YOUR_API_BASE_URL/login', {
  // ... fetch configuration
});

// With your actual API URL:
const response = await fetch('https://your-api-domain.com/api/auth/login', {
  // ... fetch configuration
});
```

### 4. Expected API Response Format

Your API should return responses in this format:

**Success Response:**
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

**Error Response:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

## App Structure

```
Premsabha/
├── App.js                 # Main app with navigation setup
├── Auth/
│   ├── LoginAuth.js       # Login screen
│   └── SignUp.js          # Signup screen
├── screens/
│   └── HomeScreen.js      # Home screen after login
├── config/
│   └── api.js            # API configuration
└── README.md             # This file
```

## Navigation Flow

1. **Login Screen** → User enters email and password
2. **SignUp Screen** → User creates new account
3. **Home Screen** → Main app screen after successful authentication

## Customization

### Styling
- All styles are in the respective component files
- Colors can be customized in the StyleSheet objects
- The app uses a modern color palette with blue and green accents

### Form Validation
- Email validation using regex
- Password minimum length (6 characters)
- Phone number validation
- Password confirmation matching

### Adding More Screens
1. Create new screen component in `screens/` folder
2. Add it to the Stack.Navigator in `App.js`
3. Use `navigation.navigate('ScreenName')` to navigate

## Running the App

```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## API Integration Checklist

- [ ] Set your API base URL in `config/api.js`
- [ ] Update endpoint paths if needed
- [ ] Test login API endpoint
- [ ] Test signup API endpoint
- [ ] Handle authentication tokens
- [ ] Implement token storage (AsyncStorage recommended)
- [ ] Add logout functionality
- [ ] Test error handling

## Security Notes

- Always use HTTPS for API calls in production
- Implement proper token storage and refresh mechanisms
- Add input sanitization on the server side
- Consider implementing biometric authentication
- Add rate limiting for login attempts

## Troubleshooting

### Common Issues

1. **Navigation not working**: Make sure all navigation packages are installed
2. **API calls failing**: Check your API URL and network connectivity
3. **Styling issues**: Ensure you're using the latest React Native version

### Getting Help

If you encounter any issues:
1. Check the console for error messages
2. Verify your API endpoints are working
3. Test with a simple API call first
4. Check React Navigation documentation

## Next Steps

- Add token storage with AsyncStorage
- Implement biometric authentication
- Add password reset functionality
- Create user profile screen
- Add more app features and screens

---

Happy coding! 🚀 