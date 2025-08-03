import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GptMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { IMessage } from '@interfaces/index';
import { OpenIAService } from 'app/presentation/services/openia.service';

@Component({
  selector: 'app-chat-template',
  imports: [
    GptMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    // FileMessageBoxComponent,
    // SelectMessageBoxComponent,
    // IMessageEvent,
  ],
  templateUrl: './chat-template.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {

  // onMessageSend(message: IMessageEvent) {
  //   console.log('Mensaje enviado:', message);
  // }

  public messages = signal<IMessage[]>([]);
  public isLoading = signal<boolean>(false);
  public openIAService = inject(OpenIAService);

  // onMessageSend(message: ISelectMessageEvent) {
  //   console.log('Mensaje enviado:', message);
  // }

  onMessageSend(prompt: string) {
    console.log('Mensaje enviado:', prompt);
  }
}
