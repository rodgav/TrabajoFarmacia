import {Component, Inject, OnInit} from '@angular/core';
import {ServicioService} from '../../Servicio/servicio.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {UsuarioService} from '../../Servicio/usuario.service';

@Component({
  selector: 'app-dialog-add-prod',
  templateUrl: './dialog-add-prod.component.html',
  styleUrls: ['./dialog-add-prod.component.css']
})
export class DialogAddProdComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(private usuarioservicio: UsuarioService,
              private servicio: ServicioService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<DialogAddProdComponent>) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      lote: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  Cerrar() {
    this.dialogRef.close('Cancelado');
  }

  AgregarProd() {
    const formData = new FormData;
    formData.append('accion', 'addprod');
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
          if (respuesta['mensaje'] === 'Producto agregado correctamente') {
            this.dialogRef.close(respuesta[key]);
          }
        });
      }
    );
  }
}
