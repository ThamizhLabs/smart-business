import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import {Routes, RouterModule } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { FileService } from './services/file.service'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { OrdersComponent } from './orders/orders.component'
import { InventoryComponent } from './inventory/inventory.component'
import { ExpensesComponent } from './expenses/expenses.component'
import { ReportsComponent } from './reports/reports.component'
import { InventorytableComponent } from './inventory/inventorytable/inventorytable.component';


const routes: Routes= [
  {path: "", component: HomeComponent},
  {path: "orders", component: OrdersComponent},
  {path: "inventory", component: InventoryComponent, 
  children:
    [
      {path: "", component: InventorytableComponent},
      {path: "table/:ordertype", component: InventorytableComponent}
    ]
  },
  {path: "expenses", component: ExpensesComponent},
  {path: "reports", component: ReportsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrdersComponent, 
    InventoryComponent,
    ExpensesComponent,
    ReportsComponent,
    InventorytableComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes)
  ],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
