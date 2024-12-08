import axios from "axios";
import { extractProcessedLinkedInData } from "./ExtractProcessedLinkedInData";

const api_key = process.env.NEXT_PUBLIC_LINKEDIN_API_KEY!;
const url = "https://api.scrapingdog.com/linkedin";

export default async function fetchLinkedin(profile_id: string) {
  try {
    const params = {
      api_key: api_key,
      type: "profile",
      linkId: profile_id,
      private: "false",
    };

    const response = await axios.get(url, { params });
    if (response.status !== 200)
      throw new Error(`Request failed with status code: ${response.status}`);

    const FinalData = extractProcessedLinkedInData(response.data);
    console.log("structured Data", FinalData);
    return FinalData;
  } catch (error) {
    console.error("Error fetching LinkedIn data:", error);
    throw error;
  }
}
