/**
 * Simple client-side server include functionality
 * This script replaces any element with the data-include attribute
 * with the contents of the HTML file specified in that attribute
 */
document.addEventListener('DOMContentLoaded', function() {
  const includes = document.querySelectorAll('[data-include]');
  let completedIncludes = 0;
  const totalIncludes = includes.length;
  
  // Process each include
  includes.forEach(function(element) {
    const file = element.getAttribute('data-include');
    
    // Fetch the include file
    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${file}: ${response.status} ${response.statusText}`);
        }
        return response.text();
      })
      .then(html => {
        // Replace the element's HTML with the included file's content
        element.innerHTML = html;
        
        // Dispatch an event to signal that the include was loaded
        const event = new CustomEvent('include-loaded', {
          detail: { element: element, file: file }
        });
        document.dispatchEvent(event);
        
        // If this is the header, dispatch a specific event
        if (file.includes('header.html')) {
          console.log('Header loaded, dispatching header-loaded event');
          const headerEvent = new CustomEvent('header-loaded');
          document.dispatchEvent(headerEvent);
        }
        
        // Track completed includes
        completedIncludes++;
        if (completedIncludes === totalIncludes) {
          // All includes are loaded
          const allLoadedEvent = new CustomEvent('all-includes-loaded');
          document.dispatchEvent(allLoadedEvent);
          
          // Reinitialize any scripts that depend on included content
          if (typeof initializeMobileMenu === 'function') {
            console.log('Reinitializing mobile menu after all includes loaded');
            setTimeout(initializeMobileMenu, 100);
          }
        }
      })
      .catch(error => {
        console.error(`Error including file ${file}:`, error);
        element.innerHTML = `<div class="p-4 bg-red-100 text-red-700 rounded">
          Failed to load include: ${file}
        </div>`;
        
        // Count as completed even if there was an error
        completedIncludes++;
        if (completedIncludes === totalIncludes) {
          const allLoadedEvent = new CustomEvent('all-includes-loaded');
          document.dispatchEvent(allLoadedEvent);
        }
      });
  });
}); 