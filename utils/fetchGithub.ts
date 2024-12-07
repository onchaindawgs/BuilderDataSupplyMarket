import axios from 'axios'
import getTopLanguages from './getTopLang'
import getActivityData from './getActivityData'

interface GithubData {
  languages: { [key: string]: number };
  activity: {
    totalCommits: number;
    totalPRs: number;
    contributedTo: number;
  };
}

export default async function fetchGithubData(username: string): Promise<GithubData> {
  try {
    const [languagesResponse, activityResponse] = await Promise.all([
      axios.get(`/api/topLang?username=${username}`, { responseType: 'text' }),
      axios.get(`/api/activityData?username=${username}`, { responseType: 'text' })
    ]);

    return {
      languages: getTopLanguages(languagesResponse.data),
      activity: getActivityData(activityResponse.data)
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    throw error;
  }
}
