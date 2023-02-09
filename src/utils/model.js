import axios from "axios";
import { URL } from "./constants";
export const getSummary = async (code, setSummary, setCode) => {
  try {
    // Replace <API_KEY> with your OpenAI API key
    setSummary({ loading: true, text: "" });
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: `Give the time complexity of this code and explain why : ${code}`,
        max_tokens: 100,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${URL}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data.choices[0].text;
    console.log(summary);
    setSummary({ text: summary, loading: false });

    setCode("");
    setTimeout(() => {
      setSummary("");
    }, 8500);
  } catch (error) {
    console.error(error.response.data.error.message);
  }
};
export const detectLang = async (code, setLang) => {
  const res = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      model: "text-davinci-003",
      prompt: `Detect the programming language of this code in word : ${code}`,
      max_tokens: 100,
      temperature: 0.5,
    },
    {
      headers: {
        Authorization: `Bearer ${URL}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = res.data.choices[0].text.split("\n");
  console.log(data);
  setLang(data[data.length - 1]);
};
