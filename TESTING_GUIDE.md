# Testing Guide - Sabha App

## Demo Mode Testing

The app now runs in **Demo Mode** by default, which means:
- No actual PDF or audio files are required
- All features are simulated for demonstration purposes
- You can test the UI and navigation without real content

## How to Test the App

### 1. Authentication Testing
- **Login Screen**: Use any email/password combination
- **Sign Up Screen**: Fill in the form and submit
- Both will show success messages and navigate to the main app

### 2. Main App Navigation
- **Tab Navigation**: Test switching between Home, PDF Library, Kirtan Player, and Profile tabs
- **Theme**: Verify the dark red and gold theme is applied throughout

### 3. PDF Library Testing
- **Browse Categories**: Test filtering by Vachanamrut, Swamini Vato, etc.
- **Search**: Try searching for different PDF titles
- **Open PDF**: Tap any PDF to see the demo viewer
- **Demo Viewer**: Shows sample content with page navigation

### 4. Kirtan Player Testing
- **Browse Kirtans**: View the list of devotional songs
- **Search**: Try searching for different kirtan titles
- **Play Kirtan**: Tap any kirtan to start demo playback
- **Demo Playback**: Simulates playing with progress updates

### 5. PDF Viewer Testing
- **Demo Mode**: Shows sample content when no real PDF is available
- **Page Navigation**: Test previous/next page buttons
- **Actions**: Test share, bookmark, and download buttons
- **Features List**: Shows what features would be available with real PDFs

## Adding Real Content (Optional)

### For PDF Files:
1. Add real PDF files to the `assets/` folder
2. Update the `pdfs` array in `PdfLibraryScreen.js`:
   ```javascript
   {
     id: 1,
     title: 'Your PDF Title',
     category: 'Vachanamrut',
     description: 'Description',
     url: require('../assets/your-file.pdf'), // Add this line
     icon: '📖',
     size: '2.5 MB',
     pages: 150,
   }
   ```

### For Audio Files:
1. Add real MP3 files to the `assets/` folder
2. Update the `kirtans` array in `KirtanPlayerScreen.js`:
   ```javascript
   {
     id: '1',
     title: 'Your Kirtan Title',
     artist: 'Artist Name',
     category: 'Bhajans',
     duration: '5:32',
     thumbnail: '🕉️',
     audioUrl: require('../assets/your-audio.mp3'), // Add this line
   }
   ```

## Expected Behavior

### Demo Mode Features:
- ✅ Smooth navigation between all screens
- ✅ Search functionality works
- ✅ Category filtering works
- ✅ Demo playback with progress simulation
- ✅ Demo PDF viewer with page navigation
- ✅ All UI elements respond to touch
- ✅ Professional theme applied throughout

### Error Handling:
- ✅ Graceful handling of missing files
- ✅ Informative demo mode messages
- ✅ No crashes or errors

## Troubleshooting

### If you see errors:
1. **Clear cache**: `npx expo start --clear`
2. **Restart server**: Stop and restart the development server
3. **Check dependencies**: Ensure all packages are installed

### Common Issues:
- **Audio errors**: Expected in demo mode, will work with real audio files
- **PDF errors**: Expected in demo mode, will work with real PDF files
- **Navigation issues**: Check if all screens are properly connected

## Performance Notes

- Demo mode is lightweight and should run smoothly
- No large file downloads required
- Fast navigation between screens
- Responsive UI elements

## Next Steps

Once you're satisfied with the demo functionality:
1. Add real PDF files for full PDF viewing
2. Add real audio files for full kirtan playback
3. Test with actual content
4. Deploy to app stores

The app is now fully functional in demo mode and ready for testing! 🎉 