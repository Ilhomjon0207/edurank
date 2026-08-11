import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {
  private readonly ollamaUrl = 'http://localhost:11434/api/generate';

  async analyzeStudent(data: any) {
    const prompt = `
Sen HR va ta'lim ekspertisan.

Talaba ma'lumotlarini tahlil qil.

Talaba:
${JSON.stringify(data, null, 2)}

Faqat berilgan ma'lumotlardan foydalan.
Ma'lumot mavjud bo'lmasa, o'zingdan fakt o'ylab topma.

Javobni FAQAT JSON formatda ber.
Markdown, izoh yoki boshqa text yozma.

Format:

{
  "strengths": [],
  "weaknesses": [],
  "recommendedJobs": [],
  "developmentPlan": []
}
`;

    const response = await axios.post(this.ollamaUrl, {
      model: 'qwen2.5:7b',
      prompt,
      stream: false,
      format: 'json',
      options: {
        temperature: 0,
      },
    });

    let result = response.data.response;

    result = result
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    try {
      return JSON.parse(result);
    } catch {
      throw new InternalServerErrorException('AI returned invalid JSON');
    }
  }

  async analyzeCandidates(data: any) {
    const prompt = `
You are an HR analytics assistant.

Analyze ONLY the provided numerical data.

Rules:
- Do not invent information.
- Do not describe personality.
- Do not mention abilities that are not provided.
- Do not create facts about experience.
- Explain only score, skills match, GPA and ranking.
- Return ONLY JSON.

Candidate data:

${JSON.stringify(data, null, 2)}

JSON format:

{
  "bestCandidate": "",
  "reason": "",
  "strengths": [],
  "risks": [],
  "recommendation": ""
}
`;

    const response = await axios.post(this.ollamaUrl, {
      model: 'qwen2.5:3b',
      prompt,
      stream: false,
      format: 'json',
      options: {
        temperature: 0,
        num_predict: 200,
      },
    });

    let result = response.data.response;

    result = result
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    try {
      return JSON.parse(result);
    } catch {
      throw new InternalServerErrorException('AI returned invalid JSON');
    }
  }
}
