// -- Link resolution rules
// Manages links to internal Prismic documents
// Modify as your project grows to handle any new routes you've made
export const linkResolver = (doc: { type: string; uid: string }) => `/${doc.type}/${doc.uid}`;

// Additional helper function for Next/Link components
export const hrefResolver = (doc: { type: string; uid: string }) => `/${doc.type}?uid=${doc.uid}`;
