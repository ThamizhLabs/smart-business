import { Injectable, OnInit } from '@angular/core'
import { IpcRenderer } from 'electron'

import { inwardOders, outwardOders, inventoryItem ,materials, products, expenses } from 'interfaces/dbinterfaces'

@Injectable({
  providedIn: 'root',
})
export class FileService{
  private ipc: IpcRenderer
  private json2csv = require('json2csv');
  d = new Date;
  

  inwardorders: {}[];
  outwardorders: {}[];
  materials: inventoryItem[];
  products: inventoryItem[];
  expenses: {}[];

  constructor() {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer
      } catch (error) {
        throw error
      }
    } else {
      console.warn('Could not load electron ipc')
    }
  }

  async getFiles() {
    let reqid: string;
    
    reqid = this.d.getTime.toString();
    return new Promise<string[]>((resolve, reject)=> {
      this.ipc.once("testPingResponse" + reqid , (event, arg) => {
        console.log("testping response received on renderer process..")
        resolve(arg);
      });
      this.ipc.send("testPing", reqid);
    });
  }

  // async getInventory(){

  //   let reqid: string;
    
  //   reqid = this.d.getTime.toString();

  //   // return new Promise<string[]>((resolve, reject)=> {
  //     this.ipc.once("getInventoryResponse" + reqid , (event, arg1, arg2) => {
  //       this.materials = arg1;
  //       this.products = arg2;
  //     });
  //     this.ipc.send("getInventory", reqid);
  //   // });
  // }

  writeProduct(data) {

    let reqid: string;
    reqid = this.d.getTime().toString();
    let csvData = this.json2csv.parse(data, {header: false})

    console.log(csvData);
    
    
    return new Promise<string[]>((resolve, reject)=> {
      this.ipc.once("writeDBResponse" + reqid , (event, arg) => {
        this.getInventory();
        resolve(arg);
      });
      this.ipc.send("writeDB", reqid, "inventory", csvData);
    });

  }

  getInventory(){
    let reqid: string;
    reqid = this.d.getTime().toString();

    // return new Promise<string[]>((resolve, reject)=> {
      this.ipc.once("getDBResponse" + reqid , (event, dbData, resp) => {
        
        console.log("inventory refreshed!!");

        this.materials = dbData.filter((item) => {return item.itemType == "M"});
        this.products = dbData.filter((item) => {return item.itemType == "P"});

        console.log(this.materials);
        console.log(this.products);

        // resolve(resp);
      });
      this.ipc.send("getDB", reqid, "inventory");
    // });
  }

}