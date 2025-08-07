import { Injectable } from '@angular/core';
import { OrthographyResponse, ProsConsResponse, TextToAudioResponse, TranslateResponse } from '@interfaces/index';

import { audioToTextUseCase, orthographyUseCase, prosConsStreamUseCase, prosConsUseCase, textToAudioUseCase, translateUseCase } from '@use-cases/index';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenIAService {

    checkOrthography(prompt: string): Observable<OrthographyResponse> {
        return from(orthographyUseCase(prompt));
    }

    prosCons(prompt: string): Observable<ProsConsResponse> {
        return from(prosConsUseCase(prompt));
    }

    prosConsStream(prompt: string, abortSignal?: AbortSignal): AsyncGenerator<string> {
        return prosConsStreamUseCase(prompt, abortSignal);
    }

    translate(prompt: string, lang: string): Observable<TranslateResponse> {
        return from(translateUseCase(prompt, lang));
    }

    textToAudio(prompt: string, voice?: string): Observable<TextToAudioResponse> {
        return from(textToAudioUseCase(prompt, voice));
    }

    audioToText(file: File, prompt?: string): Observable<string> {
        return from(audioToTextUseCase(file, prompt));
    }   

}