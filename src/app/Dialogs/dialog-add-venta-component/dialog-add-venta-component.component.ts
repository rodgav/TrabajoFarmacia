import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Productos} from '../../Data/Productos';
import {ServicioService} from '../../Servicio/servicio.service';
import {UsuarioService} from '../../Servicio/usuario.service';
import {debounceTime, map, startWith} from 'rxjs/operators';

class ListaCompras {
  constructor(
    public id: number,
    public usuario: number,
    public nombre: string,
    public precio: number,
    public cantidad: number,
    public total: number
  ) {
  }
}

@Component({
  selector: 'app-dialog-add-venta-component',
  templateUrl: './dialog-add-venta-component.component.html',
  styleUrls: ['./dialog-add-venta-component.component.css']
})
export class DialogAddVentaComponentComponent implements OnInit {
  medicamentos: Productos[];
  columnas = ['nombre', 'precio', 'cantidad', 'total', 'eliminar'];
  dataSource = new MatTableDataSource<ListaCompras>();
  productofilter: Observable<any[]>;
  form: FormGroup;
  id: number;
  nombre: string;
  mensaje: string;
  compras: ListaCompras[] = [];
  array: number[];
  private formSubmitAttempt: boolean;
  private _success = new Subject<string>();
  usuario: number;
  total = 0;

  constructor(
    private usuarioservicio: UsuarioService,
    private servicio: ServicioService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddVentaComponentComponent>) {
  }

  ngOnInit() {
    this.LlenarProductos();
    this.form = this.fb.group({
      producto: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      total: ['', Validators.required]
    });
    this.form.get('precio').disable();
    this.form.get('total').disable();

    this._success.subscribe((message) => this.mensaje = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.mensaje = null);
  }

  private _filter(value: string): any[] {
    return this.medicamentos.filter(item => item.nombre.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  Seleccionado(id: number, precio: number, nombre: string) {
    // console.log(id + ' ' + precio);
    this.id = id;
    this.nombre = nombre;
    this.form.patchValue({
      precio: precio,
      cantidad: 1,
      total: precio
    });
  }

  private LlenarProductos() {
    const formData = new FormData;
    formData.append('accion', 'productos');
    this.medicamentos = null;
    this.servicio.servicio(formData).subscribe(
      productos => {
        Object.keys(productos).map((key) => {
          if (key === 'productos') {
            this.medicamentos = productos[key];
            this.productofilter = this.form.get('producto').valueChanges
              .pipe(
                startWith(''),
                map(value => this._filter(value))
              );
            // console.log(key);
            // console.log(productos[key]);
          } else {
            this.medicamentos = null;
          }
        });
      }
    );
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  AgregarVenta() {
    const precio = this.form.get('precio').value;
    const cantidad = this.form.get('cantidad').value;
    const total = this.form.get('total').value;
    const guardado = this.usuarioservicio.getUsuarioLogeadoen();
    for (const row of guardado) {
      this.usuario = row.id;
    }
    if (precio !== 0 && cantidad !== 0 && total !== 0 && this.nombre !== null) {
      if (!(this.compras.some(x => x.id === this.id))) {
        this.compras.push(new ListaCompras(this.id, this.usuario, this.nombre, precio, cantidad, total));
        // console.log(this.compras);
        this.dataSource.data = this.compras as ListaCompras[];
        // console.log(this.dataSource.data);
        this.form.patchValue({
          producto: ''
        });
        this.LlenarTotal();
        this.LlenarProductos();
        this.Seleccionado(0, 0, '');
      } else {
        this._success.next('Este medicamento ya esta agregado');
      }
    } else {
      this._success.next('Seleccione un medicamento');
    }
  }

  CantidadCambio() {
    let cantidad = this.form.get('cantidad').value;
    // console.log(cantidad);
    if (cantidad == null) {
      cantidad = 0;
    }
    const precio = this.form.get('precio').value;
    const totalf = precio * cantidad;
    this.form.patchValue({
      total: totalf
    });
  }

  EliminarCompra(row: any) {
    this.compras.splice(row, 1);
    // console.log(this.compras);
    this.dataSource.data = this.compras as ListaCompras[];
  }

  Vender() {
    this.array = [];
    const formData = new FormData;
    formData.append('accion', 'addvent');
    for (const row of this.dataSource.data) {
      // console.log(row);
      this.array.push(row.id);
      this.array.push(row.cantidad);
      this.array.push(row.total);
    }
    // console.log(this.array);
    formData.append('usuario', this.usuario.toString());
    formData.append('total', this.total.toString());
    formData.append('array', this.array.toString());
    this.servicio.servicio(formData).subscribe(
      respuesta => {
        Object.keys(respuesta).map((key) => {
          // console.log(key);
          // console.log(respuesta[key]);
          if (respuesta['mensaje'] === 'Venta Realizada correctamente') {
            this.dialogRef.close(respuesta[key]);
          }
        });
      }
    );
  }

  Cancelar() {
    this.dialogRef.close('Cancelado');
  }

  private LlenarTotal() {
    let suma = 0;
    for (const row of this.dataSource.data) {
      suma = +suma + +row.total;
    }
    this.total = suma;
  }
}
