import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FileMessageBoxComponent, GptMessageComponent, IMessageEvent, MyMessageComponent, TypingLoaderComponent } from '@components/index';
import { IMessage } from '@interfaces/index';
import { OpenIAService } from 'app/presentation/services/openia.service';

@Component({
  selector: 'app-audio-to-text.page',
  imports: [
    GptMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    FileMessageBoxComponent,
    // SelectMessageBoxComponent,
    // IMessageEvent,
  ],
  templateUrl: './audioToText.page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {


  onMessageSend({ file, prompt }: IMessageEvent) {
    const text = prompt ?? file?.name ?? 'Traduce el audio';

    this.isLoading.set(true);
    this.messages.update(messages => [
      ...messages,
      {
        isGpt: false,
        text
      }
    ]);

    this.openIAService.audioToText(file!, prompt!).subscribe( resp => {
      this.isLoading.set(false);
      
      const text = `
        ## Transcripción de audio:

        ${resp}

      `;
      this.messages.update(messages => [
        ...messages,
        {
          isGpt: true,
          text
        }
      ]);
    });

  }

  public messages = signal<IMessage[]>([]);
  public isLoading = signal<boolean>(false);
  public openIAService = inject(OpenIAService);



}
