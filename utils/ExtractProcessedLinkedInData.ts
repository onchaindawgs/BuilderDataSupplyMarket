interface processedLinkedInData {
  name: string;
  location: string;
  expertise: string[];
  technologies: string[];
  experience: number;
  spokenLanguages: string[];
}

export function extractProcessedLinkedInData(profileData: any): processedLinkedInData {
  // Comprehensive list of technology keywords across different domains
  const keyTechnologies = [
    // Programming Languages
    "python",
    "javascript",
    "typescript",
    "java",
    "kotlin",
    "swift",
    "ruby",
    "go",
    "rust",
    "c++",
    "c#",
    "php",
    "scala",
    "dart",

    // Web Technologies
    "react",
    "angular",
    "vue",
    "nodejs",
    "express",
    "django",
    "flask",
    "spring",
    "laravel",
    "ruby on rails",

    // Mobile Development
    "android",
    "ios",
    "flutter",
    "react native",
    "xamarin",
    "ionic",
    "kotlin multiplatform",

    // Cloud & DevOps
    "aws",
    "azure",
    "gcp",
    "docker",
    "kubernetes",
    "terraform",
    "jenkins",
    "gitlab",
    "github actions",
    "ci/cd",

    // Databases
    "mongodb",
    "postgresql",
    "mysql",
    "sqlite",
    "redis",
    "cassandra",
    "dynamodb",
    "oracle",

    // Machine Learning & AI
    "tensorflow",
    "pytorch",
    "keras",
    "scikit-learn",
    "pandas",
    "numpy",
    "machine learning",
    "deep learning",
    "ai",

    // Blockchain & Web3
    "blockchain",
    "solidity",
    "web3",
    "smart contract",
    "ethereum",
    "dapp",
    "decentralized",

    // Frontend
    "html5",
    "css3",
    "sass",
    "less",
    "tailwind",
    "bootstrap",
    "webpack",
    "redux",

    // Backend
    "graphql",
    "rest api",
    "microservices",
    "grpc",
    "serverless",

    // Testing
    "jest",
    "mocha",
    "selenium",
    "junit",
    "pytest",
    "cypress",

    // Other Frameworks & Tools
    "git",
    "linux",
    "shell scripting",
    "agile",
    "scrum",
    "microservices",
    "design patterns",
  ];

  // Extract expertise from about section
  const extractExpertise = (about: string): string[] => {
    // Convert to lowercase for case-insensitive matching
    const lowercaseAbout = about.toLowerCase();

    // Filter and return matching technologies
    return keyTechnologies.filter((tech) =>
      lowercaseAbout.includes(tech.toLowerCase())
    );
  };

  // Calculate total experience from professional roles
  const calculateExperience = (experiences: any[]): number => {
    return experiences.reduce((total, exp) => {
      const duration = exp.duration?.split(" ") || [];
      const years = duration.includes("years") ? parseInt(duration[0]) : 0;
      const months = duration.includes("months")
        ? parseInt(duration[0]) / 12
        : 0;
      return total + years + months;
    }, 0);
  };

  const profile = profileData[0]; // Assuming first profile in array

  return {
    name: profile.fullName,
    location: profile.location.split("\n")[0].trim(),
    expertise: extractExpertise(profile.about),
    technologies: extractExpertise(profile.about),
    experience: calculateExperience(profile.experience),
    spokenLanguages: profile.languages.map(
      (lang: { name: string }) => lang.name
    ),
  };
}
