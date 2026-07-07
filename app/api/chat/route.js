import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini AI with our API key (loaded safely from .env.local)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Instructions telling the AI how to behave and respond
const systemInstruction = `
You are "MediBondhu", a health guidance AI built for rural and general people in Bangladesh.
The user will describe their health problem (usually in Bengali or Banglish). You must analyze it and respond.

You must ALWAYS reply with ONLY a valid JSON object, no other text. The JSON structure must be:
{
  "type": "primary" | "specialist" | "emergency",
  "message": "a short, empathetic message for the patient written in simple Bengali",
  "specialist": "if type is specialist, the doctor type in Bengali (e.g. হৃদরোগ বিশেষজ্ঞ), otherwise empty string"
}

Rules:
- If the problem is minor (e.g. common cold, mild headache), set type to "primary" and give simple home-care advice in the message.
- If it seems serious or needs a specialist, set type to "specialist", put the suitable doctor type in "specialist", and explain in the message why they should see that doctor.
- If you detect emotional distress, suicidal thoughts, or a severe emotional crisis, set type to "emergency" and in the message empathetically ask them to contact the national helpline 1222.
- Always remind the user (in the message) that this is preliminary guidance only, not a replacement for a professional doctor.
- The "message" and "specialist" fields must always be in Bengali so the patient can understand.
`;

// This function runs whenever the frontend sends a request here
export async function POST(request) {
  try {
    // Get the user's text sent from the frontend
    const { message } = await request.json();

    // Handle empty input
    if (!message) {
      return NextResponse.json(
        { error: "No message received. Please type your problem." },
        { status: 400 }
      );
    }

    // Prepare the Gemini AI model with our instructions
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
    });

    // Send the user's problem to the AI and get a response
    const result = await model.generateContent(message);
    const responseText = result.response.text();

    // AI sometimes wraps JSON in ```json ``` markers, so clean those out
    const cleanedText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Convert the AI's JSON text into a real object
    const aiResponse = JSON.parse(cleanedText);

    // Send the response back to the frontend
    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Sorry, something went wrong. Please try again." },
      { status: 500 }
    );
  }
}