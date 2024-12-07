import axios from 'axios'
import getTopLanguages from './getTopLang'

export async function fetchGithubLanguages(username: string): Promise<{ [key: string]: number }> {
  try {
    const response = await axios.get(
      `/api/topLang?username=${username}`,
      { responseType: 'text' }
    )
    
    const languages = getTopLanguages(response.data)
    return languages
  } catch (error) {
    console.error('Error fetching GitHub languages:', error)
    throw error
  }
}