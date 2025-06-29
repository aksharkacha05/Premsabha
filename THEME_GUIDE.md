# Sabha App - Theme & Navigation Guide

## 🎨 **Theme System**

### **Color Palette**
The app uses a professional and elegant dark red color palette perfect for devotional content:

#### **Primary Colors**
- `primary: '#8B1E3F'` - Dark red (main brand color)
- `primaryDarker: '#5E152A'` - Darker shade for depth
- `primaryLighter: '#B53054'` - Lighter shade for highlights

#### **Accent Colors**
- `accent: '#C7A008'` - Gold (sacred/divine accent)
- `accentBeige: '#EADACB'` - Warm beige (soft accent)

#### **Background Colors**
- `backgroundDark: '#1A0F13'` - Deep dark background
- `backgroundCard: '#2F1B23'` - Card/component background
- `backgroundLight: '#3F2630'` - Lighter background areas

#### **Text Colors**
- `textPrimary: '#FFFFFF'` - Primary text (white)
- `textSecondary: '#EADACB'` - Secondary text (beige)
- `textMuted: '#BFA7A7'` - Muted text (soft gray)

#### **Status Colors**
- `success: '#27AE60'` - Green for success states
- `error: '#E74C3C'` - Red for errors
- `warning: '#F39C12'` - Orange for warnings
- `info: '#3498DB'` - Blue for info

### **Usage**

#### **Import Theme**
```javascript
import { themeColors, commonStyles } from '../config/theme';
```

#### **Using Colors**
```javascript
// Direct color usage
<View style={{ backgroundColor: themeColors.primary }}>

// In StyleSheet
const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.backgroundDark,
  },
  text: {
    color: themeColors.textPrimary,
  },
});
```

#### **Using Common Styles**
```javascript
// Pre-defined button styles
<TouchableOpacity style={commonStyles.primaryButton}>
  <Text style={commonStyles.bodyText}>Button Text</Text>
</TouchableOpacity>

// Pre-defined text styles
<Text style={commonStyles.headingLarge}>Large Heading</Text>
<Text style={commonStyles.bodyText}>Body text</Text>
```

## 🧭 **Tab Navigation**

### **Structure**
The app now uses a **Bottom Tab Navigator** with 4 main sections:

1. **Home** - Dashboard with quick actions and recent content
2. **PDF Library** - Sacred texts and documents
3. **Kirtan Player** - Devotional music and songs
4. **Profile** - User settings and preferences

### **Navigation Flow**
```
Login/SignUp → MainApp (Tab Navigator)
                    ├── Home
                    ├── PDF Library
                    ├── Kirtan Player
                    └── Profile

Modal Screens:
├── PDF Viewer (from PDF Library)
└── Other modals...
```

### **Tab Configuration**
- **Active Color**: Gold accent (`#C7A008`)
- **Inactive Color**: Muted text (`#BFA7A7`)
- **Background**: Card background (`#2F1B23`)
- **Border**: Primary darker (`#5E152A`)

### **Icons**
- **Home**: `home` / `home-outline`
- **PDF Library**: `library` / `library-outline`
- **Kirtan Player**: `musical-notes` / `musical-notes-outline`
- **Profile**: `person` / `person-outline`

## 📱 **Screen Updates**

### **Home Screen**
- ✅ Updated with new theme colors
- ✅ Quick action cards with color-coded borders
- ✅ Recent readings with progress bars
- ✅ Recent kirtans list
- ✅ Daily devotional quote
- ✅ Navigation to other tabs

### **PDF Library Screen**
- ✅ Updated with new theme colors
- ✅ Category filtering
- ✅ Search functionality
- ✅ PDF cards with actions
- ✅ Navigation to PDF Viewer

### **Kirtan Player Screen**
- ✅ Updated with new theme colors
- ✅ Category filtering
- ✅ Search functionality
- ✅ Kirtan list with play controls
- ✅ Now playing bar at bottom

### **Profile Screen**
- ✅ New screen with user profile
- ✅ Statistics and progress
- ✅ Settings menu with toggles
- ✅ Quick actions
- ✅ Logout functionality

### **PDF Viewer Screen**
- ✅ Modal presentation
- ✅ Page navigation controls
- ✅ Download, favorite, search, bookmark actions
- ✅ Sample content display

## 🎯 **Key Features**

### **Theme Benefits**
1. **Consistent Design** - All screens use the same color palette
2. **Professional Look** - Elegant dark red theme suitable for devotional content
3. **Accessibility** - High contrast colors for better readability
4. **Scalability** - Easy to modify colors across the entire app

### **Navigation Benefits**
1. **Easy Access** - All main features accessible from bottom tabs
2. **Intuitive Flow** - Logical grouping of related features
3. **Quick Switching** - Users can easily switch between sections
4. **Context Awareness** - Each tab maintains its own state

### **User Experience**
1. **Devotional Atmosphere** - Colors and design reflect spiritual themes
2. **Smooth Navigation** - Seamless transitions between screens
3. **Feature Discovery** - Easy to find and access all features
4. **Personalization** - Profile screen for user preferences

## 🔧 **Implementation Notes**

### **File Structure**
```
config/
├── theme.js          # Theme configuration
└── api.js           # API configuration

navigation/
└── MainTabNavigator.js  # Tab navigation setup

screens/
├── HomeScreen.js
├── PdfLibraryScreen.js
├── KirtanPlayerScreen.js
├── ProfileScreen.js
└── PdfViewerScreen.js
```

### **Dependencies**
- `@react-navigation/bottom-tabs` - For tab navigation
- `@expo/vector-icons` - For icons
- `react-native` - Core components

### **Customization**
To modify the theme:
1. Edit `config/theme.js`
2. Update color values
3. All screens will automatically use new colors

To add new tabs:
1. Add screen to `MainTabNavigator.js`
2. Configure icon and title
3. Update navigation logic if needed

## 🚀 **Next Steps**

### **Potential Enhancements**
1. **Dark/Light Mode Toggle** - Add theme switching capability
2. **Custom Themes** - Allow users to choose different color schemes
3. **Animations** - Add smooth transitions between screens
4. **Offline Mode** - Cache content for offline access
5. **Push Notifications** - Daily devotional reminders
6. **Social Features** - Share readings and kirtans
7. **Analytics** - Track reading progress and preferences

### **Performance Optimizations**
1. **Image Optimization** - Compress and cache images
2. **Lazy Loading** - Load content on demand
3. **Memory Management** - Optimize component rendering
4. **Bundle Size** - Reduce app size with code splitting

---

**Sabha App** - Your complete devotional companion with beautiful design and intuitive navigation! 🕉️ 