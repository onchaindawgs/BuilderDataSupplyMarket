export default function getTopLanguages(svgContent: string): { [key: string]: number } {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");

  const languageElements = svgDoc.querySelectorAll('[data-testid="lang-items"] g');
  const languages: { [key: string]: number } = {};

  languageElements.forEach((langElement) => {
    const langName = langElement.querySelector('[data-testid="lang-name"]')?.textContent?.trim();
    const percentageText = langElement.querySelector('.lang-name:last-child')?.textContent?.trim();

    if (langName && percentageText) {
      const percentageValue = parseFloat(percentageText.replace('%', ''));
      languages[langName] = percentageValue;
    }
  });

  return languages;
}