// In a real-world application, this would fetch data from a currency API.
// For this environment, we simulate the API call to provide a realistic,
// yet static, exchange rate for the AI to use, as per the user's request.

export const getOfficialExchangeRate = async (): Promise<number | null> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));

    // Return a realistic, static value.
    const rate = 48.55; 
    
    return rate;
  } catch (error) {
    console.error("Failed to fetch official exchange rate:", error);
    return null;
  }
};
