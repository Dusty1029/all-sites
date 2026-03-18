import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface AddPlayerDialogData {
    name?: string;
}
@Component({
    selector: 'app-add-player-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    templateUrl: './add-player-dialog.component.html',
    styleUrl: './add-player-dialog.component.scss',
})
export class AddPlayerDialogComponent {
    readonly dialogRef = inject(MatDialogRef<AddPlayerDialogComponent>);
    readonly data = inject<AddPlayerDialogData>(MAT_DIALOG_DATA);
    readonly fb = inject(FormBuilder);

    form = this.fb.group({
        name: [this.data?.name || '', Validators.required],
    });

    close() {
        this.dialogRef.close();
    }

    submit() {
        if (this.form.valid) {
            this.dialogRef.close(this.form.value.name);
        }
    }
}
