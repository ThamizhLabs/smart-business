import { Component, OnInit } from '@angular/core';

import { inwardOders, outwardOders, inventoryItem ,materials, products, expenses } from 'interfaces/dbinterfaces'
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private filesvc: FileService) { }

  ngOnInit(): void {
  }

  addProduct(){
    let testitem: inventoryItem = {
      itemCd: "P1",
      itemType: "P",
      itemName: "Product-1",
      itemRecipe: [{
        materialCd: "M1",
        materialName: "Material-1",
        requiredUnitQt: 5
      }],
      minUnitQt: 15,
      availableUnitQt: 1
    }
    
    this.filesvc.writeProduct(testitem).then(
      (arg) => {
          console.log("writeresponse" + arg);
      }
    );
  }

}
