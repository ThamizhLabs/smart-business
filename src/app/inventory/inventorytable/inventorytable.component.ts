import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { table } from 'console';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-inventorytable',
  templateUrl: './inventorytable.component.html',
  styleUrls: ['./inventorytable.component.css']
})
export class InventorytableComponent implements OnInit {

  tableTitle;


  rows: {}[] = [];
  propertyHead: string[] = ['itemCd', 'itemName', 'minUnitQt', 'availableUnitQt'];
  productDisplayHead: string[] = ["Product Code", "Product Name", "Min Quantity Limit", "Available Units"];
  materialDisplayHead: string[] = ["Material Code", "Material Name", "Min Quantity Limit", "Available Units"];
  displayHead: string[];

  constructor(private router: Router,
     private route: ActivatedRoute,
     private filesvc: FileService) {
       console.log('tbl constr')
      this.tableTitle = this.route.snapshot.params["ordertype"];
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) => { 
        this.tableTitle = param["ordertype"]
        switch(this.tableTitle){
          case "purchase":
              this.displayHead = this.materialDisplayHead;
              this.rows = this.filesvc.materials
              break;

          case "manufacture":
              this.rows = [];
              break;

          default:
            this.displayHead = this.productDisplayHead;
            this.rows = this.filesvc.products

        }
      }
    );   
  }

  getestimatedqt(arg){
    return " (+1)"
  }

  determineRowColor(arg){
    return {
      "alertrow": true,
    }
  }

}