import axios from "axios";

const api_key = process.env.NEXT_PUBLIC_LINKEDIN_API_KEY!;
const url = "https://api.scrapingdog.com/linkedin";

export const fetchLinkedin = async (profile_id: string) => {
    console.log("This is api key",api_key);
  const params = {
    api_key: api_key,
    type: "profile",
    linkId: profile_id,
    private: "false",
  };
  console.log("linkedin fxn run")
  axios
  .get(url, { params: params })
  .then(function (response) {
      if (response.status === 200) {
          const data = response.data;
          console.log(data);
        } else {
            console.log("Request failed with status code: " + response.status);
        }
    })
    .catch(function (error) {
        console.error("Error making the request: " + error.message);
    });
    console.log("linkedin fxn end")
};
