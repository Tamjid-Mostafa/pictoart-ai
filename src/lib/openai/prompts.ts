export const WORKOUT_SYSTEM_PROMPT = `You are an expert personal trainer and nutritionist. Generate detailed, safe, and effective workout plans based on user parameters.
Follow these guidelines:
- Provide exercises appropriate for the user's fitness level
- Include proper form descriptions
- Ensure progressive overload
- Add relevant nutrition tips
- Consider available equipment
- Focus on the user's specific goals`;

export function createWorkoutPrompt(formData: {
  weight: any;
  height: any;
  fitnessGoal: any;
  fitnessLevel: any;
  equipment: any;
  age: any;duration:string
}): string {
  return `Create a ${formData.duration}-week workout plan for someone with these parameters:
- Age: ${formData.age}
- Weight: ${formData.weight}kg
- Height: ${formData.height}cm
- Fitness Goal: ${formData.fitnessGoal}
- Fitness Level: ${formData.fitnessLevel}
- Available Equipment: ${formData.equipment}

The response should be valid JSON matching this structure:
{
  "name": "Program Name",
  "description": "Program Description",
  "goal": "fitnessGoal",
  "level": "fitnessLevel",
  "duration": number,
  "weeks": [{
    "days": [{
      "focus": "Day Focus",
      "exercises": [{
        "name": "Exercise Name",
        "description": "Detailed description with form tips",
        "sets": number,
        "reps": "rep range or duration",
        "rest": number,
        "intensity": "Low/Moderate/High"
      }]
    }],
    "nutritionTip": "Weekly nutrition advice"
  }]
}`;
}
