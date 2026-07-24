import { Injectable } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class AiService {


    async analyzeStudent(data:any){


        const prompt = `
Sen HR va ta'lim ekspertisan.

Talaba ma'lumotlarini tahlil qil.

Talaba:
${JSON.stringify(data,null,2)}


Javobni JSON formatda ber:

{
 "strengths": [],
 "weaknesses": [],
 "recommendedJobs": [],
 "developmentPlan": []
}

`;



        const response =
            await axios.post(
                'http://localhost:11434/api/generate',
                {
                    model:"qwen2.5:7b",
                    prompt,
                    stream:false
                }
            );


        const result = response.data.response;

        console.log(result);

        return result;

    }

    async analyzeCandidates(data:any){
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

${JSON.stringify(data,null,2)}

JSON format:

{
 "bestCandidate":"",
 "reason":"",
 "strengths":[],
 "risks":[],
 "recommendation":""
}

`;

        const start = Date.now();
        const response =
            await axios.post(

                'http://localhost:11434/api/generate',

                {
                    model: 'qwen2.5:3b',
                    prompt,
                    stream: false,
                    options: {
                        temperature: 0,
                        num_predict: 200,
                    },
                }

            );

        let result = response.data.response;


        result = result
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();


        return JSON.parse(result);

    }

}