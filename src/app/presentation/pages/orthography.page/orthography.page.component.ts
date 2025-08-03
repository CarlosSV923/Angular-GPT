import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { IMessage } from '@interfaces/index';
import {
  MyMessageComponent,
  TypingLoaderComponent,
  TextMessageBoxComponent,
  GptMessageOrthographyComponent

} from '@components/index';
import { OpenIAService } from 'app/presentation/services/openia.service';


@Component({
  selector: 'app-orthography.page',
  imports: [
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    GptMessageOrthographyComponent
  ],
  templateUrl: './orthography.page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {

  // onMessageSend(message: IMessageEvent) {
  //   console.log('Mensaje enviado:', message);
  // }

  onMessageSend(message: string) {
    this.isLoading.set(true);

    this.messages.update((prev) => [
      ...prev, {
        text: message,
        isGpt: false
      }
    ]);

    this.openIAService.checkOrthography(message)
      .subscribe(response => {
        this.isLoading.set(false);

        this.messages.update((prev) => [
          ...prev, {
            text: response.message,
            isGpt: true,
            info: {
              score: response.score,
              corrections: response.corrections
            }
          }
        ]);
      })

  }

  public messages = signal<IMessage[]>([{ text: "¡Hola! ¿Cómo puedo ayudarte hoy?", isGpt: true, info: { score: -1, corrections: [] } }]);
  public isLoading = signal<boolean>(false);
  public openIAService = inject(OpenIAService);

  // onMessageSend(message: ISelectMessageEvent) {
  //   console.log('Mensaje enviado:', message);
  // }
}
