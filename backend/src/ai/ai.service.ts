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


}