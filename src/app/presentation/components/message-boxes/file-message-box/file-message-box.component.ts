import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface IMessageEvent {
  prompt?: string | null;
  file: File | null | undefined;
}

@Component({
  selector: 'app-file-message-box',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './file-message-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileMessageBoxComponent {

  @Input()
  public placeholder: string = 'Escribe un mensaje...';

  @Input()
  public disableCorrections: boolean = false;

  @Output()
  public onMessageSend = new EventEmitter<IMessageEvent>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: [],
    file: [null, Validators.required],
  });

  public file: File | null = null;

  handleSelectedFile(event: any) {
    const file = event.target.files.item[0];
    this.form.controls.file.setValue(file);
  }

  handleSubmit() {
    if (this.form.invalid) {
      return;
    }

    const { prompt, file } = this.form.value;
    this.onMessageSend.emit({ prompt, file });
    this.form.reset();
  }

}
