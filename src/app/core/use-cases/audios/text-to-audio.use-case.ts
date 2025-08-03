import { TextToAudioResponse } from "@interfaces/index";
import { environment } from "environments/environment.development";

export const textToAudioUseCase = async (prompt: string, voice?: string): Promise<TextToAudioResponse> => {
  try {
    const response = await fetch(`${environment.baseUrlApi}/gpt/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, voice }),
    });

    if (!response.ok) {
      throw new Error('Api response was not ok');
    }

    const audioFile = await response.blob();

    const audioUrl = URL.createObjectURL(audioFile);

    return {
      audioUrl,
      ok: true
    };
  } catch (error) {
    console.error('Error occurred while fetching text-to-audio:', error);
    return {
      audioUrl: '',
      ok: false
    };
  }
};
