import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatDialogModule, MatDividerModule,
  MatFormFieldModule,
  MatInputModule, MatOptionModule,
  MatPaginatorModule, MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {MedicamentosComponent} from './medicamentos/medicamentos.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {VentasComponent} from './ventas/ventas.component';
import {DialogComprobacionComponentComponent} from './Dialogs/dialog-comprobacion-component/dialog-comprobacion-component.component';
import {DialogAddVentaComponentComponent} from './Dialogs/dialog-add-venta-component/dialog-add-venta-component.component';
import {DialogDetallVentaComponent} from './Dialogs/dialog-detall-venta/dialog-detall-venta.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {DialogEditProdComponent} from './Dialogs/dialog-edit-prod/dialog-edit-prod.component';
import {DialogAddProdComponent} from './Dialogs/dialog-add-prod/dialog-add-prod.component';
import {DialogDetallProdComponent} from './Dialogs/dialog-detall-prod/dialog-detall-prod.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MedicamentosComponent,
    VentasComponent,
    DialogComprobacionComponentComponent,
    DialogAddVentaComponentComponent,
    DialogDetallVentaComponent,
    DialogEditProdComponent,
    DialogAddProdComponent,
    DialogDetallProdComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, ReactiveFormsModule,
    HttpClientModule, FormsModule,
    FlexLayoutModule, MatDialogModule,
    RouterModule.forRoot(
      [
        {path: 'login', component: LoginComponent},
        {path: 'ventas', component: VentasComponent},
        {path: 'medicamentos', component: MedicamentosComponent},
        // {path: '', redirectTo: 'productos', pathMatch: 'full'}
      ]// , { useHash: true, initialNavigation: false}
    ), MatToolbarModule, MatTableModule, MatPaginatorModule,
    MatDividerModule, MatSortModule, MatOptionModule, MatAutocompleteModule, NgbAlertModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: [DialogComprobacionComponentComponent,
    DialogAddVentaComponentComponent,
    DialogDetallVentaComponent, DialogEditProdComponent, DialogAddProdComponent,
    DialogDetallProdComponent]
})
export class AppModule {
}
