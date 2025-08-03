import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GptMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { IMessage } from '@interfaces/index';
import { OpenIAService } from 'app/presentation/services/openia.service';

@Component({
  selector: 'app-pros-cons-stream.page',
  imports: [
    GptMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    // FileMessageBoxComponent,
    // SelectMessageBoxComponent,
    // IMessageEvent,
  ],
  templateUrl: './pros-cons-stream.page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPageComponent {

  // onMessageSend(message: IMessageEvent) {
  //   console.log('Mensaje enviado:', message);
  // }

  public messages = signal<IMessage[]>([{ text: "¡Hola! ¿Que deseas comparar?", isGpt: true, info: { score: -1, corrections: [] } }]);
  public isLoading = signal<boolean>(false);
  public openIAService = inject(OpenIAService);
  public abortSignal = new AbortController();

  // onMessageSend(message: ISelectMessageEvent) {
  //   console.log('Mensaje enviado:', message);
  // }

  async onMessageSend(prompt: string) {
    this.abortSignal.abort(); // Abort any previous request
    this.abortSignal = new AbortController(); // Create a new AbortController for the new request
    this.isLoading.set(true);
    this.messages.update((msgs) => [
      ...msgs,
      { text: prompt, isGpt: false, info: { score: -1, corrections: [] } },
      { text: 'Espera un momento, estoy procesando tu solicitud...', isGpt: true, info: { score: -1, corrections: [] } }
    ]);
    const stream = this.openIAService.prosConsStream(prompt, this.abortSignal.signal);
    this.isLoading.set(false);

    for await (const text of stream) {
      this.handleStreamResponse(text);
    }

  }

  handleStreamResponse(response: string) {
    this.messages().pop();
    this.messages.update((msgs) => [
      ...msgs,
      { text: response, isGpt: true, info: { score: -1, corrections: [] } }
    ]);
  }

}
