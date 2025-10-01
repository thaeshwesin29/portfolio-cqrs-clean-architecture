// src/utils/tabWatcher.ts

/**
 * Initializes a tab watcher that changes the document title when the tab is hidden.
 */
export function initTabWatcher(): () => void {
  // Capture the current title when the function is initialized (e.g., "Portfolio | Thae Shwe Sin")
  const originalTitle = document.title;
  const awayTitle = 'Come back to my portfolio 😉';

  const handleVisibilityChange = () => {
    if (document.hidden) {
      // User has switched to another tab/window
      document.title = awayTitle;
    } else {
      // User has returned to the portfolio tab
      document.title = originalTitle;
    }
  };

  // Attach the event listener to watch for tab/window changes
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Return a cleanup function to remove the listener when the component unmounts
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}