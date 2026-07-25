// Definition for Navigation Items used in the Navbar
export interface NavItem {
  label: string;        // Display text
  path?: string;        // Route path (optional if it has children)
  children?: NavItem[]; // Nested dropdown items
}

// Definition for a Government Scheme object
export interface Scheme {
  id: string;
  title: string;
  description: string;
  link: string;
}

// Definition for Helpline numbers
export interface Helpline {
  title: string;
  numbers: string[];
}

// Supported Language Codes for the application
export type LanguageCode = 
  | 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta' | 'ur' | 'gu' | 'kn' | 'ml' 
  | 'or' | 'pa' | 'as' | 'mai' | 'sat' | 'ks' | 'ne' | 'sd' | 'kok' | 'doi' | 'brx' | 'sa';

// Language object structure
export interface Language {
  code: LanguageCode;
  name: string;
}

// State interface for the Accessibility Widget settings
export interface AccessibilityState {
  fontSize: 'normal' | 'large' | 'small';
  lineHeight: boolean;      // Increases line height for better readability
  highlightLinks: boolean;  // Adds yellow background to links
  textSpacing: boolean;     // Increases word and letter spacing
  dyslexiaFriendly: boolean; // Changes font family
  hideImages: boolean;      // Hides images for text-only focus
  cursor: boolean;          // Enlarges cursor
  contrast: 'normal' | 'dark' | 'light' | 'invert'; // Color contrast modes
  grayscale: boolean;       // Removes color
}