import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownModule } from "ngx-markdown";

@Component({
  selector: 'app-gpt-message',
  imports: [MarkdownModule],
  templateUrl: './gpt.message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageComponent {

  @Input({ required: true }) message!: string;

  @Input() audioUrl?: string;

}
