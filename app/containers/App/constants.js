/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

// Language Settings
export const DEFAULT_LOCALE = 'en';

// Map Settings
export const GOOGLE_MAP_API_KEY = 'AIzaSyBV-Un_bGnKGXOZNf4ouxYzJqejc8F0Nz0';
export const GOOGLE_MAP_ENABLE_SHOW_MARKER_INFO_BOX = false;
export const GOOGLE_MAP_ENABLE_SHOW_MARKER_INFO_CONTENT = false;
