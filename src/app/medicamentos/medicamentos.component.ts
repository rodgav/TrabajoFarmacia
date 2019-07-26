import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ServicioService} from '../Servicio/servicio.service';
import {Productos} from '../Data/Productos';
import {DialogEditProdComponent} from '../Dialogs/dialog-edit-prod/dialog-edit-prod.component';
import {DialogComprobacionComponentComponent} from '../Dialogs/dialog-comprobacion-component/dialog-comprobacion-component.component';
import {DialogAddProdComponent} from '../Dialogs/dialog-add-prod/dialog-add-prod.component';
import {DialogDetallProdComponent} from '../Dialogs/dialog-detall-prod/dialog-detall-prod.component';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginacion: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Productos>();
  medicamentos: Productos[];
  columnas = ['id', 'nombre', 'cantidad', 'lote', 'precio', 'detalles', 'actualizar', 'eliminar'];

  constructor(private servicio: ServicioService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.LlenarProductos();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginacion;
  }

  Modificar(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {id};
    dialogConfig.width = '800px';
    dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(DialogEditProdComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.LlenarProductos();
      // console.log(result);
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
            this.dataSource.data = productos[key] as Productos[];
          } else {
            this.medicamentos = null;
          }
        });
      }
    );
  }

  Eliminar(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};
    // dialogConfig.width = '600px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(DialogComprobacionComponentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const formData = new FormData;
        formData.append('accion', 'delete_vent');
        formData.append('id', id.toString());
        this.servicio.servicio(formData).subscribe(
          ventas => {
            Object.keys(ventas).map((key) => {
              if (key === 'mensaje') {
                alert(ventas[key]);
                this.LlenarProductos();
              }
            });
          }
        );
      }
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};
    dialogConfig.width = '600px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(DialogAddProdComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.LlenarProductos();
      // console.log(result);
    });
  }


  Detalles(id: any) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {id};
    dialogConfig.width = '800px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(DialogDetallProdComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      // console.log(result);
    });
  }
}
