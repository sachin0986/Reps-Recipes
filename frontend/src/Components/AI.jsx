import React, { useState } from "react";

const AIpage = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Predefined questions
  const predefinedQuestions = [
    "I am a Paicient of ",
    "Provide me a high protein intake diet plan, my physical activity is ",
    "What is the best diet for weight loss?",
    "What are the benefits of a high-protein diet?",
    "How can I increase my protein intake?",
    "What are the best sources of protein?",
    "What is the difference between complete and incomplete proteins?",
    "How much protein do I need per day?",
    "What are the risks of a high-protein diet?",
    "Can a high-protein diet help with muscle gain?",
    "How can I make my meals more protein-rich?",
    "What are the signs of protein deficiency?",
    "How does protein affect weight loss?",
    "What are the best protein-rich Shakes?",
    "How can I balance my protein intake with other nutrients?",
    "What are the best protein sources for vegetarians?",
  ];

  async function generateParameters() {
    if (!question.trim()) {
      setError("Please enter a question first.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // In production, this request should go through your backend
      const result = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyC9XQoTdM7AUwhj7KgHnjCuOfJEJseXabM",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: question }]
            }]
          })
        }
      );
      
      if (!result.ok) {
        throw new Error(`API request failed with status: ${result.status}`);
      }
      
      const data = await result.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No text found";
      setResponse(text);
    } catch (err) {
      console.error("Error generating content:", err);
      setError("Failed to generate content. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const handlePredefinedQuestion = (q) => {
    setQuestion(q);
    setResponse("");
  };

  return (
    <div className="p-6 mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">AI Assistant</h1>
      
      {/* Predefined questions */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3 text-gray-700">Popular Questions:</h2>
        <div className="flex flex-wrap gap-2">
          {predefinedQuestions.map((q, index) => (
            <button
              key={index}
              onClick={() => handlePredefinedQuestion(q)}
              className="bg-white px-3 py-2 rounded-full text-sm border border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-600 shadow-sm transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
      
      {/* Question input */}
      <div className="mb-4">
        <textarea 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          className="w-full p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all h-32 resize-none shadow-inner"
        />
      </div>
      
      {/* Siri-inspired button */}
      <div className="flex justify-center mb-6">
        <button 
          onClick={generateParameters}
          disabled={loading}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-70 disabled:transform-none flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : "Ask AI"}
        </button>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {/* Response area */}
      {response && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Response:</h2>
          <div className="prose prose-blue max-w-none whitespace-pre-wrap">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIpage;