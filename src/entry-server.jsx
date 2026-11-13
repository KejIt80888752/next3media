// Used only at build time: renders the page to static HTML so Google and AI answer
// engines (ChatGPT, Perplexity, Gemini, Claude…) can read every section without running JS.
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export { faqs, services, cities, contact } from './data.js';

export function render() {
  return renderToString(<App />);
}
