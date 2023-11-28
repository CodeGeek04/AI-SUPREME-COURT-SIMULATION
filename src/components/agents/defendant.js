import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true});

  export async function getResponse(chatList) {
    const completion = await openai.chat.completions.create({
      messages: [{role: 'system', content: "YOU ARE THE DEFENDANT. LOOK AT THE PREVIOUS CONVERSATION AND DECIDE YOUR ANSWER"},
      { role: 'user', content: JSON.stringify(chatList) }],
      model: 'gpt-3.5-turbo',
    });

  // console.log("choices :", completion.choices);
  return completion.choices[0].message.content;
}