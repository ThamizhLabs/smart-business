import { Component } from '@angular/core'
import { FileService } from './services/file.service'

import { faCoffee, faHome, faShoppingCart, faTruckMoving, faFileInvoiceDollar, faChartLine, faRupeeSign } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smart-business';
  fahome = faHome;
  facart = faShoppingCart;
  fatruck = faTruckMoving;
  fainvoice = faFileInvoiceDollar;
  fachart = faChartLine;
  farupee = faRupeeSign;


  constructor(private filesvc: FileService){
    this.filesvc.getInventory();
  }

  ping(){
    console.log('trying to ping..');
    this.filesvc.getFiles().then((arg)=>{
      console.log("Holy fuck!!! ping received by app.." + arg)
    });
  }

}
