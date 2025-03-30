/**
 * Simple client-side server include functionality
 * This script replaces any element with the data-include attribute
 * with the contents of the HTML file specified in that attribute
 */
document.addEventListener('DOMContentLoaded', function() {
  const includes = document.querySelectorAll('[data-include]');
  
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
      })
      .catch(error => {
        console.error(`Error including file ${file}:`, error);
        element.innerHTML = `<div class="p-4 bg-red-100 text-red-700 rounded">
          Failed to load include: ${file}
        </div>`;
      });
  });
}); 