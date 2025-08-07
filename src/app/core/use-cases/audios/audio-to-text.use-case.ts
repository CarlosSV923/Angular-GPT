import { environment } from "environments/environment.development";

export const audioToTextUseCase = async (file: File, prompt?: string): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (prompt) {
      formData.append('prompt', prompt);
    }

    const response = await fetch(`${environment.baseUrlApi}/gpt/audio-to-text`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Api response was not ok');
    }

    const data = await response.json();
    return data.text || '';
  } catch (error) {
    console.error('Error occurred while fetching audio-to-text:', error);
    return '';
  }
}