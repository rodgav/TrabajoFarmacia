import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Productos} from '../../Data/Productos';
import {ServicioService} from '../../Servicio/servicio.service';

@Component({
  selector: 'app-dialog-detall-prod',
  templateUrl: './dialog-detall-prod.component.html',
  styleUrls: ['./dialog-detall-prod.component.css']
})
export class DialogDetallProdComponent implements OnInit {
  id: string;

  constructor(private servicio: ServicioService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<DialogDetallProdComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id;
  }

  form: FormGroup;
  private formSubmitAttempt: boolean;

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      lote: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required]
    });
    this.form.get('precio').disable();
    this.form.get('cantidad').disable();
    this.form.get('lote').disable();
    this.form.get('descripcion').disable();
    this.form.get('nombre').disable();
    this.LlenarProducto();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  Cerrar() {
    this.dialogRef.close('Cerrado');
  }

  private LlenarProducto() {
    const formData = new FormData;
    formData.append('accion', 'producto');
    formData.append('id', this.id);
    this.servicio.servicio(formData).subscribe(
      productos => {
        Object.keys(productos).map((key) => {
          this.form.patchValue({
            precio: productos['producto'][0]['precio'],
            cantidad: productos['producto'][0]['cantidad'],
            lote: productos['producto'][0]['lote'],
            descripcion: productos['producto'][0]['descripcion'],
            nombre: productos['producto'][0]['nombre']
          });
        });
      }
    );
  }
}
