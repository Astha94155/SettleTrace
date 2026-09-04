from groq_service import ask_groq

result = ask_groq(
    "You are the AI assistant for SettleTrace. Explain in one sentence what SettleTrace does."
)

print(result)