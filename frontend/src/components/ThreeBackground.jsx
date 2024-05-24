import React, { useEffect, useRef } from 'react';
import { loadHTML } from '/src/components/htmlFile.js'; // Adjust the path as necessary

const ThreeBackground = () => {
  const containerRef = useRef();

  useEffect(() => {
    loadHTML('/three.js/examples/webgl_effects_parallaxbarrier.html')
      .then(htmlContent => {
        if (containerRef.current) {
          containerRef.current.innerHTML = htmlContent;
        }
      })
      .catch(error => {
        console.error('Error loading HTML:', error);
      });
  }, []);

  return <div ref={containerRef}></div>;
};

export default ThreeBackground;
