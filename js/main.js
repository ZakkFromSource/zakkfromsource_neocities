const year = document.getElementById("year")
const thisYear = new Date().getFullYear()
year.setAttribute("datetime", thisYear)
year.textContent = thisYear


// Function to apply Bionic Reading effect
function applyBionicReading() {
    const paragraphs = document.querySelectorAll('p'); // Select all paragraphs

    paragraphs.forEach(paragraph => {
        // Function to recursively process child nodes
        const processNode = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                // Process text nodes only
                const words = node.textContent.split(' ');
                const bionicWords = words.map(word => {
                    // Handle punctuation
                    const nonAlpha = word.match(/[^a-zA-Z0-9]+$/); // Find punctuation
                    const cleanWord = nonAlpha ? word.slice(0, -nonAlpha[0].length) : word; // Strip punctuation

                    // Split word into bold and normal parts
                    const boldPart = cleanWord.slice(0, Math.ceil(cleanWord.length * 0.5));
                    const normalPart = cleanWord.slice(Math.ceil(cleanWord.length * 0.5));

                    // Reconstruct word with punctuation if present
                    return `<span class="bionic-bold">${boldPart}</span>${normalPart}${nonAlpha ? nonAlpha[0] : ''}`;
                });

                // Replace text content with new HTML
                const span = document.createElement('span');
                span.innerHTML = bionicWords.join(' ');
                return span;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Process child elements recursively
                const clone = node.cloneNode(false);
                node.childNodes.forEach(child => {
                    clone.appendChild(processNode(child));
                });
                return clone;
            }
            return node; // Return the node unchanged for unsupported types
        };

        // Replace the paragraph content with processed nodes
        const newContent = document.createDocumentFragment();
        paragraph.childNodes.forEach(child => {
            newContent.appendChild(processNode(child));
        });
        paragraph.innerHTML = ''; // Clear existing content
        paragraph.appendChild(newContent); // Append processed content
    });
}

// Apply Bionic Reading format on page load
document.addEventListener('DOMContentLoaded', applyBionicReading);