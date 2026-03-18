import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';

export interface AddGameDialogData {
    name?: string;
    isTeamGame?: boolean;
}
@Component({
    selector: 'app-add-game-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSlideToggle,
    ],
    templateUrl: './add-game-dialog.component.html',
    styleUrl: './add-game-dialog.component.scss',
})
export class AddGameDialogComponent {
    readonly dialogRef = inject(MatDialogRef<AddGameDialogComponent>);
    readonly data = inject<AddGameDialogData>(MAT_DIALOG_DATA);
    readonly fb = inject(FormBuilder);

    form = this.fb.group({
        name: [this.data?.name || '', Validators.required],
        isTeamGame: [this.data?.isTeamGame || false],
    });

    close() {
        this.dialogRef.close();
    }

    submit() {
        if (this.form.valid) {
            this.dialogRef.close(this.form.value);
        }
    }
}
