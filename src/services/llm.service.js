const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");
const config = require("../config");

class LLMService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: config.openaiApiKey,
    });
    this.profileContent = null;
    this.loadProfile();
  }

  /**
   * Load the profile.md file at startup
   */
  loadProfile() {
    try {
      const profilePath = path.join(__dirname, "../data/profile.md");
      this.profileContent = fs.readFileSync(profilePath, "utf-8");
      console.log("✅ Profile loaded successfully");
    } catch (error) {
      console.error("❌ Error loading profile:", error.message);
      this.profileContent = "No profile information available.";
    }
  }

  /**
   * Get the system prompt with profile context
   */
  getSystemPrompt() {
    return `You are a helpful AI assistant that answers questions about a person based on their profile information. You should be friendly, professional, and accurate.

IMPORTANT GUIDELINES:
- Only answer questions based on the profile information provided below
- If the information requested is not in the profile, politely say you don't have that information
- Be conversational and helpful
- Do not make up or assume information that is not in the profile
- If asked about topics unrelated to the profile, politely redirect the conversation

PROFILE INFORMATION:
${this.profileContent}

Remember: You are answering on behalf of this person, so respond in a way that represents them well.`;
  }

  /**
   * Generate a response using OpenAI
   * @param {Array} conversationHistory - Array of message objects with role and content
   * @param {string} userQuestion - The user's question
   * @returns {Promise<string>} The assistant's response
   */
  async generateResponse(conversationHistory, userQuestion) {
    try {
      // Build messages array with system prompt and conversation history
      const messages = [
        { role: "system", content: this.getSystemPrompt() },
        ...conversationHistory.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        { role: "user", content: userQuestion },
      ];

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages,
        temperature: 0.9,
        max_tokens: 1000,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error("❌ OpenAI API error:", error.message);

      if (error.status === 401) {
        throw new Error("Invalid OpenAI API key");
      } else if (error.status === 429) {
        throw new Error("OpenAI rate limit exceeded. Please try again later.");
      } else {
        throw new Error("Failed to generate response. Please try again.");
      }
    }
  }
}

// Export singleton instance
module.exports = new LLMService();
