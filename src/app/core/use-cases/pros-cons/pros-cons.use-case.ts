import { ProsConsResponse } from "@interfaces/pros-cons.response";
import { environment } from "environments/environment.development";

export const prosConsUseCase = async (prompt: string): Promise<ProsConsResponse> => {
    try {
        const response = await fetch(`${environment.baseUrlApi}/gpt/pros-cons-discusser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error('Api response was not ok');
        }

        const data = await response.json();
        return {
            ...data,
            ok: true
        };
    } catch (error) {
        console.error('Error occurred while fetching pros and cons:', error);
        return {
            content: 'An error occurred while processing the pros and cons discussion => ' + (error instanceof Error ? error.message : 'Unknown error'),
            ok: false
        };
    }
}