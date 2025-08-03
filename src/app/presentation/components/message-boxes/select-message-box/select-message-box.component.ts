import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface Option {
  id: string;
  text: string;
}

export interface ISelectMessageEvent {
  prompt: string | null | undefined;
  file: File | null | undefined;
  selectOption: string | null | undefined;
}

@Component({
  selector: 'app-select-message-box',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './select-message-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectMessageBoxComponent {


  @Input()
  public placeholder: string = 'Escribe un mensaje...';

  @Input({ required: true })
  public options: Option[] = [];

  @Output()
  public onMessageSend = new EventEmitter<ISelectMessageEvent>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: ['', Validators.required],
    file: [],
    selectOption: ['', Validators.required]
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

    const { prompt, file, selectOption } = this.form.value;
    this.onMessageSend.emit({ prompt, file, selectOption });
    this.form.reset();
  }

}
