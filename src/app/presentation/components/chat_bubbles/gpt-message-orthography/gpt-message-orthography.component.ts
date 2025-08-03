import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-gpt-message-orthography',
  imports: [],
  templateUrl: './gpt-message-orthography.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageOrthographyComponent { 

  @Input({ required: true }) message!: string;
  @Input() corrections: string[] | undefined = [];
  @Input({ required: true }) score: number | undefined = -1;

}
