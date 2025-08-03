import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GptMessageComponent, ISelectMessageEvent, MyMessageComponent, SelectMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { IMessage } from '@interfaces/index';
import { OpenIAService } from 'app/presentation/services/openia.service';


@Component({
  selector: 'app-text-to-audio.page',
  imports: [
    GptMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    // FileMessageBoxComponent,
    SelectMessageBoxComponent,
    // IMessageEvent,

  ],
  templateUrl: './text-to-audio.page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPageComponent {



  public messages = signal<IMessage[]>([]);
  public isLoading = signal<boolean>(false);
  public openIAService = inject(OpenIAService);

  public voices = signal([
    { id: "nova", text: "Nova" },
    { id: "alloy", text: "Alloy" },
    { id: "echo", text: "Echo" },
    { id: "fable", text: "Fable" },
    { id: "onyx", text: "Onyx" },
    { id: "shimmer", text: "Shimmer" },
  ]);

  onMessageSend({ prompt, selectOption }: ISelectMessageEvent) {
    const msgShow = `${prompt} - ${selectOption}`;
    this.isLoading.set(true);
    this.messages.update((msgs) => [...msgs, { text: msgShow, isGpt: false }]);
    this.openIAService.textToAudio(prompt!, selectOption!).subscribe(({ audioUrl }) => {
      this.isLoading.set(false);
      this.messages.update((msgs) => [...msgs, { text: audioUrl, isGpt: true }]);
    });
  }



}
