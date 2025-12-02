/* Utility to initialize Google Identity Services button.
   Usage: call googleLoginInit(callback) where callback receives credential response.
*/
export const googleLoginInit = (cb) => {
  /* global google */
  if (!window.google) {
    console.warn('Google Identity script not loaded. Ensure <script src="https://accounts.google.com/gsi/client"> is included in index.html');
    return;
  }
  google.accounts.id.initialize({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    callback: cb,
  });
  google.accounts.id.renderButton(
    document.getElementById('googleBtn'),
    { theme: 'outline', size: 'large' }
  );
};
