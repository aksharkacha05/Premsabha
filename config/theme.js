// Sabha App - Devotional Theme Colors
// Professional and elegant dark red color palette

export const themeColors = {
  // Primary Colors
  primary: '#8B1E3F',        // Dark red - main brand color
  primaryDarker: '#5E152A',  // Darker shade for depth
  primaryLighter: '#B53054', // Lighter shade for highlights
  
  // Accent Colors
  accent: '#C7A008',         // Gold - sacred/divine accent
  accentBeige: '#EADACB',    // Warm beige - soft accent
  
  // Background Colors
  backgroundDark: '#1A0F13', // Deep dark background
  backgroundCard: '#2F1B23', // Card/component background
  backgroundLight: '#3F2630', // Lighter background areas
  
  // Text Colors
  textPrimary: '#FFFFFF',    // Primary text - white
  textSecondary: '#EADACB',  // Secondary text - beige
  textMuted: '#BFA7A7',      // Muted text - soft gray
  
  // Status Colors
  success: '#27AE60',        // Green for success states
  error: '#E74C3C',          // Red for errors
  warning: '#F39C12',        // Orange for warnings
  info: '#3498DB',           // Blue for info
  
  // Additional Shades
  primaryTransparent: 'rgba(139, 30, 63, 0.8)',
  accentTransparent: 'rgba(199, 160, 8, 0.8)',
  backgroundTransparent: 'rgba(26, 15, 19, 0.9)',
  
  // Gradients
  primaryGradient: ['#8B1E3F', '#5E152A'],
  accentGradient: ['#C7A008', '#B89400'],
  backgroundGradient: ['#1A0F13', '#2F1B23'],
};

// Common Style Patterns
export const commonStyles = {
  // Button Styles
  primaryButton: {
    backgroundColor: themeColors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: themeColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: themeColors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  
  accentButton: {
    backgroundColor: themeColors.accent,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: themeColors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  
  // Text Styles
  headingLarge: {
    fontSize: 28,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
    textAlign: 'center',
  },
  
  headingMedium: {
    fontSize: 22,
    fontWeight: '600',
    color: themeColors.textPrimary,
  },
  
  headingSmall: {
    fontSize: 18,
    fontWeight: '600',
    color: themeColors.textPrimary,
  },
  
  bodyText: {
    fontSize: 16,
    color: themeColors.textSecondary,
    lineHeight: 24,
  },
  
  captionText: {
    fontSize: 14,
    color: themeColors.textMuted,
  },
  
  // Card Styles
  card: {
    backgroundColor: themeColors.backgroundCard,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  
  // Input Styles
  input: {
    backgroundColor: themeColors.backgroundLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: themeColors.textPrimary,
    borderWidth: 1,
    borderColor: themeColors.primaryLighter,
  },
  
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: themeColors.backgroundDark,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: themeColors.backgroundDark,
  },
  
  // Header Styles
  header: {
    backgroundColor: themeColors.primary,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Tab Styles
  tabBar: {
    backgroundColor: themeColors.backgroundCard,
    borderTopWidth: 1,
    borderTopColor: themeColors.primaryDarker,
    paddingBottom: 8,
    paddingTop: 8,
    height: 80,
  },
  
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
};

// Status-specific styles
export const statusStyles = {
  success: {
    backgroundColor: themeColors.success,
    color: themeColors.textPrimary,
  },
  
  error: {
    backgroundColor: themeColors.error,
    color: themeColors.textPrimary,
  },
  
  warning: {
    backgroundColor: themeColors.warning,
    color: themeColors.textPrimary,
  },
  
  info: {
    backgroundColor: themeColors.info,
    color: themeColors.textPrimary,
  },
};

// Export default theme object
export default {
  colors: themeColors,
  styles: commonStyles,
  status: statusStyles,
}; 