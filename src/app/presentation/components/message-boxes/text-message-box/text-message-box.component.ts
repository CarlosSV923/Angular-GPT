import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-message-box',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './text-message-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxComponent {

  @Input()
  public placeholder: string = 'Escribe un mensaje...';

  @Input()
  public disableCorrections: boolean = false;

  @Output()
  public onMessageSend = new EventEmitter<string>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: ['', Validators.required],
  });

  handleSubmit() {
    if (this.form.invalid) {
      return;
    }

    const { prompt } = this.form.value;
    this.onMessageSend.emit(prompt ?? '');
    this.form.reset();
  }


}
