/**
 * Calculate the similarity between two strings
 * @param {string} str1 - First string to compare
 * @param {string} str2 - Second string to compare
 * @returns {number} Similarity score between 0 and 1
 */
export const calculateSimilarity = (str1, str2) => {
  if (str1 === str2) return 1.0;
  if (str1.length === 0 || str2.length === 0) return 0.0;
  
  // Count matching words
  const words1 = str1.split(/\s+/).filter(word => word.length > 0);
  const words2 = str2.split(/\s+/).filter(word => word.length > 0);
  
  if (words1.length === 0 || words2.length === 0) return 0.0;
  
  let matches = 0;
  
  words1.forEach(word => {
    if (words2.includes(word)) matches++;
  });
  
  return matches / Math.max(words1.length, words2.length);
};