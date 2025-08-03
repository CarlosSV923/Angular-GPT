import { environment } from "environments/environment.development";

export async function* prosConsStreamUseCase(prompt: string, abortSignal?: AbortSignal) {
    try {
            const response = await fetch(`${environment.baseUrlApi}/gpt/pros-cons-discusser-stream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
                signal: abortSignal // Pass the abort signal to the fetch request
            });
    
            if (!response.ok) {
                throw new Error('Api response was not ok');
            }
    
            const reader = response.body?.getReader();

            if (!reader) {
                console.error('No reader available in response body');
                return null;
            }

            const decoder = new TextDecoder();
            let result = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                result += decoder.decode(value, { stream: true });
                yield result; // Yield the current result to the consumer
            }

            return result;

        } catch (error) {
            console.error('Error occurred while fetching pros and cons:', error);
            return null;
        }
};