

class UXManager {
    constructor() {
          
    }

    showFlyingText(text, image = null, x = null, y = null) {
      const textElement = document.createElement('div');
      textElement.innerText = ` ${text}`;
        
      // Apply initial styles directly with JavaScript
      textElement.style.position = 'fixed';
      textElement.style.left = `${x}px`;
      textElement.style.top = `${y}px`;
      textElement.style.fontSize = '24px';
      textElement.style.fontWeight = 'bold';
      textElement.style.color = 'green';
      textElement.style.opacity = '1'; // Start fully visible
      textElement.style.pointerEvents = 'none'; // Ensure it doesn't interfere with user interactions
      textElement.style.transition = 'transform 2s ease-out, opacity 2s ease-out'; // Smooth transition for both transform and opacity
      textElement.style.zIndex = '9999'; // Ensure it appears on top of other elements

      if (image) {
        const imgElement = document.createElement('img');
        imgElement.src = image; 
        imgElement.style.width = '16px'; // Set the image size
        imgElement.style.height = '16px'; 
        imgElement.style.marginLeft = '8px';
        textElement.appendChild(imgElement);
      }
      
      document.body.appendChild(textElement);
      textElement.offsetHeight;
      textElement.style.transform = 'translateY(-50px)';
      textElement.style.opacity = '0';

      setTimeout(() => {
        if (textElement && textElement.parentElement) {
          textElement.parentElement.removeChild(textElement);
        }
      }, 2000);
    }

    showAreaLog(ref, text, image = null) {
      if (ref.$el) {
        const logsDiv = ref.$el.querySelector('.logs');
        if (logsDiv) {
          const textNode = document.createTextNode(text);

          const newParagraph = document.createElement('p');
          newParagraph.style.fontSize = '24px';
          newParagraph.style.fontWeight = 'bold';
          newParagraph.style.color = 'green';
          newParagraph.style.opacity = '1'; // Start fully visible
          newParagraph.style.pointerEvents = 'none'; // Ensure it doesn't interfere with user interactions
          newParagraph.style.transition = 'transform 2s ease-out, opacity 2s ease-out'; // Smooth transition for both transform and opacity
          newParagraph.style.zIndex = '9999'; // Ensure it appears on top of other elements  
          newParagraph.appendChild(textNode);

          if (image) {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.style.width = '16px'; // Set the image size
            imgElement.style.height = '16px'; 
            imgElement.style.marginLeft = '8px';
            newParagraph.appendChild(imgElement);
          }
            
          logsDiv.appendChild(newParagraph);

          setTimeout(() => {
            if (newParagraph && newParagraph.parentElement) {
              newParagraph.parentElement.removeChild(newParagraph);
            }
          }, 800); // Match with the duration of the animation
        }
      } else {
        console.error('Element is not available');
        return { x: 0, y: 0 }; // Fallback values
      }
    }
}

export default new UXManager();