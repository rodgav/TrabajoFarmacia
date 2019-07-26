import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {Compras} from '../../Data/Compras';
import {Ventas} from '../../Data/Ventas';
import {ServicioService} from '../../Servicio/servicio.service';

@Component({
  selector: 'app-dialog-detall-venta',
  templateUrl: './dialog-detall-venta.component.html',
  styleUrls: ['./dialog-detall-venta.component.css']
})
export class DialogDetallVentaComponent implements OnInit {
  columnas = ['idventa', 'nombre', 'precio', 'cantidad', 'subtotal'];
  dataSource = new MatTableDataSource<Compras>();
  compras: Compras[];
  total = 0;
  id: string;
  constructor(private servicio: ServicioService,
              public dialogRef: MatDialogRef<DialogDetallVentaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  this.id = data.id;
  }

  ngOnInit() {
    this.LlenarVentas();
  }

  Cerrar() {
    this.dialogRef.close('Cerrado');
  }

  private LlenarVentas() {
    const formData = new FormData;
    formData.append('accion', 'ventasdetall');
    formData.append('id', this.id);
    this.compras = null;
    this.servicio.servicio(formData).subscribe(
      compras => {
        Object.keys(compras).map((key) => {
          if (key === 'ventasdetall') {
            this.compras = compras[key];
            // this.dataSource = new Datasource(this.paginacion, this.ordenar, this.ventas);
            this.dataSource.data = compras[key] as Compras[];
            this.LlenarTotal();
            // console.log(key);
            // console.log(ventas[key]);
          } else {
            this.compras = null;
          }
        });
      }
    );
  }

  private LlenarTotal() {
    let suma = 0;
    for (const row of this.dataSource.data) {
      suma = +suma + +row.subtotal;
    }
    this.total = suma;
  }
}
