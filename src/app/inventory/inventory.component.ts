import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnChanges {

  param: string;

  constructor(private router: Router,
    private route: ActivatedRoute) { 
      this.router.navigate(["table", "sales"], {relativeTo: this.route})
  }

  ngOnInit(): void {

    this.route.params.subscribe( 
      (params: Params) => {
        this.param = params['ordertype'];
        console.log("params changed")
      }
    )

  }

  
  ngOnChanges() {
    console.log("onchange");
  }


}
