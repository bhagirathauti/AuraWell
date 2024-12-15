const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.APIKEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = `
Analyze the following journal entry and respond with a single-word mood from this list [happy, sad, angry, anxious, motivated, stressed] and some tips for user based on his mood. Strictly follow this format to give response: 'mood:tips' seperated by colon.   Journal Entry: 
`;

async function generateContent(entry) {
  try {
    const response = await model.generateContent(prompt + entry);
    const result = response.response.text();
    const parsed = result.split(":").map((item) => item.trim());
    console.log(parsed);

    if (parsed.length < 2) {
      throw new Error("Invalid response format");
    }

    const [mood, tips] = parsed;

    return {
      mood,
      tips
    };
  } catch (error) {
    console.error("Error parsing AI response:", error.message);
    return {
      error: "Failed to parse AI response. Please try again.",
    };
  }
}

// Example usage
// const journalEntry = "Today was stressful with too many deadlines. I felt overwhelmed.";
// generateContent(prompt, journalEntry).then((res) => console.log(res));

exports.generateContent = generateContent;
