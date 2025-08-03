import { TranslateResponse } from "@interfaces/index";
import { environment } from "environments/environment.development";

export const translateUseCase = async (text: string, lang: string): Promise<TranslateResponse> => {
    try {
        const response = await fetch(`${environment.baseUrlApi}/gpt/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, lang }),
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
            result: 'An error occurred while processing the pros and cons discussion => ' + (error instanceof Error ? error.message : 'Unknown error'),
            ok: false,
            lang
        };
    }
};
