export async function loadHTML(filePath) {
    console.log(`Fetching HTML from: ${filePath}`);
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load HTML file: ${response.statusText}`);
    }
    const text = await response.text();
    console.log('HTML content loaded successfully');
    return text;
  }
  