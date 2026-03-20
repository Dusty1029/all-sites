import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GageModel, GameModel, PlayerModel } from '@coreParty/models';
import { minSelected } from '@shared/validators';

export interface AddPartyDialogData {
    players: PlayerModel[];
    games: GameModel[];
    gages: GageModel[];
}
@Component({
    selector: 'app-add-party-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
    ],
    templateUrl: './add-party-dialog.component.html',
    styleUrl: './add-party-dialog.component.scss',
})
export class AddPartyDialogComponent {
    readonly dialogRef = inject(MatDialogRef<AddPartyDialogComponent>);
    readonly data = inject<AddPartyDialogData>(MAT_DIALOG_DATA);
    readonly fb = inject(FormBuilder);

    form = this.fb.group({
        name: ['', Validators.required],
        numberOfTeam: [null, [Validators.required, this.evenNumberValidator]],
        playerIds: [[], minSelected(1)],
        gameIds: [[], minSelected(1)],
        gageIds: [[], minSelected(1)],
    });

    close() {
        this.dialogRef.close();
    }

    submit() { 
        if (this.form.valid) {
            this.dialogRef.close(this.form.value);
        }
    }

    evenNumberValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (value == null || value === '') return null;
        return value % 2 === 0 ? null : { notEven: true };
    }
}
