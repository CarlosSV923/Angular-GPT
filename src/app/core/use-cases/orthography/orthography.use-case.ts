import { OrthographyResponse } from "@interfaces/index";
import { environment } from "environments/environment.development";

export const orthographyUseCase = async (prompt: string): Promise<OrthographyResponse> => {
  try {
    const response = await fetch(`${environment.baseUrlApi}/gpt/orthography-check`, {
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
    console.error('Error occurred while fetching orthography:', error);
    return {
      score: 0,
      corrections: [],
      message: 'An error occurred while checking orthography => ' + (error instanceof Error ? error.message : 'Unknown error'),
      ok: false
    };
  }
};
