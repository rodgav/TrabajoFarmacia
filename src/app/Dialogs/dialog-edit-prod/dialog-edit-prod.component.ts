import {Component, Inject, OnInit} from '@angular/core';
import {ServicioService} from '../../Servicio/servicio.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-edit-prod',
  templateUrl: './dialog-edit-prod.component.html',
  styleUrls: ['./dialog-edit-prod.component.css']
})
export class DialogEditProdComponent implements OnInit {
  id: string;

  constructor(private servicio: ServicioService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<DialogEditProdComponent>,
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

  Actualizar() {
    const formData = new FormData;
    formData.append('accion', 'actprod');
    formData.append('id', this.id);
    formData.append('nombre', this.form.get('nombre').value);
    formData.append('descripcion', this.form.get('descripcion').value);
    formData.append('cantidad', this.form.get('cantidad').value);
    formData.append('lote', this.form.get('lote').value);
    formData.append('precio', this.form.get('precio').value);
    this.servicio.servicio(formData).subscribe(
      respuesta => {
        Object.keys(respuesta).map((key) => {
          // console.log(key);
          // console.log(respuesta[key]);
          if (respuesta['mensaje'] === 'Producto actualizado correctamente') {
            this.dialogRef.close(respuesta[key]);
          }
        });
      }
    );
  }
}
