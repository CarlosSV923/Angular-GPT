import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-message',
  imports: [],
  templateUrl: './my-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyMessageComponent {

  @Input({ required: true }) message!: string;

}
