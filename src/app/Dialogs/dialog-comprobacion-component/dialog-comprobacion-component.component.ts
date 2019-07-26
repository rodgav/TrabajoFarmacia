import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-comprobacion-component',
  templateUrl: './dialog-comprobacion-component.component.html',
  styleUrls: ['./dialog-comprobacion-component.component.css']
})
export class DialogComprobacionComponentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogComprobacionComponentComponent>) { }

  ngOnInit() {
  }
  Cancelar() {
    this.dialogRef.close('Cancelado');
  }

  Eliminar() {
    this.dialogRef.close(true);
  }

}
