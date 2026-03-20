import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PlayerInterface } from '@shared/interfaces';
import { minSelected } from '@shared/validators';

export interface AddRallyeDialogData {
    players: PlayerInterface[];
}
@Component({
    selector: 'app-add-rallye-dialog',
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
    ],
    templateUrl: './add-rallye-dialog.component.html',
    styleUrl: './add-rallye-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRallyeDialogComponent {
    readonly dialogRef = inject(MatDialogRef<AddRallyeDialogComponent>);
    readonly data = inject<AddRallyeDialogData>(MAT_DIALOG_DATA);
    readonly fb = inject(FormBuilder);

    form = this.fb.group({
        name: ['', Validators.required],
        playerIds: [[], minSelected(1)],
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
