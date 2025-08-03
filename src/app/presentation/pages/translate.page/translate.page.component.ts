import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GptMessageComponent, ISelectMessageEvent, MyMessageComponent, SelectMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { IMessage, TranslateResponse } from '@interfaces/index';
import { OpenIAService } from 'app/presentation/services/openia.service';

@Component({
  selector: 'app-translate.page',
  imports: [
    GptMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    SelectMessageBoxComponent,
  ],
  templateUrl: './translate.page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent {

  public messages = signal<IMessage[]>([]);
  public isLoading = signal<boolean>(false);
  public openIAService = inject(OpenIAService);

  public languages = signal<
    { id: string; text: string }[]
  >([
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ]);

  onMessageSend(message: ISelectMessageEvent) {
    const translatedMessage = `Traduce el siguiente texto al ${message.selectOption!}: ${message.prompt!}`;
    this.messages.update(msgs => [...msgs, { text: translatedMessage, isGpt: false }]);
    this.isLoading.set(true);

    this.openIAService.translate(message.prompt!, message.selectOption!).subscribe((response: TranslateResponse) => {
        this.messages.update(msgs => [...msgs, { text: response.result, isGpt: true }]);
        this.isLoading.set(false);
    });
  }


}
