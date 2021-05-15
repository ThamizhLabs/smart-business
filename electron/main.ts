import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'

const inventoryItemHead = ['itemCd', 'itemType' , 'itemName', 'itemRecipe', 'minUnitQt', 'availableUnitQt'];

let win: BrowserWindow

const newLine= "\r\n";
const fs = require('fs');

app.on('ready', createWindow)

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('browser-window-created',function(e,window) {
    window.setMenu(null);
});

ipcMain.on("testPing", (event, reqid) => {
    console.log("testping received on main process!!");
    const files = require("fs").readdirSync(__dirname)
    win.webContents.send('testPingResponse' + reqid, files)
})

ipcMain.on("getDB", (event, reqid, file) => {

  let resp = "00"
  let filenm = 'dblib/' + file + '.csv';

  let csv2json = require('csvtojson');

  csv2json()
  .fromFile(filenm)
  .then( (dbData) => {
    win.webContents.send("getDBResponse" + reqid, dbData, resp);
  })

  // try{
  //   dbData = fs.readFileSync(filenm)
  //     .toString() // convert Buffer to string
  //     .split(newLine) // split string to lines
  //     .map(e => e.trim()) // remove white spaces for each line
  //     .map(e => e.split(',').map(e => e.trim())); // split each line to array
  // }catch(err){
  //   resp = "08"
  // }

})

ipcMain.on('writeDB', (event, reqid, file , csvData) => {
  
  let resp = '00';
  let filenm = 'dblib/' + file + '.csv';   

  resp = writeCsv( filenm, csvData + newLine);
  win.webContents.send('writeDBResponse' + reqid, resp);

})



















// ipcMain.on('writeInwardOrders', (event, data) => {
  
//   let resp = '00';
//   let file = 'dblib/inwardOrders.csv';
//   let csvData = json2csv.parse(data, {header: false}) + newLine;

//   resp = writeCsv(file, csvData);
//   win.webContents.send('writeInwardOrdersResponse', resp);

// })

// ipcMain.on('writeOutwardOrders', (event, data) => {
  
//   let resp = '00';
//   let file = 'dblib/outwardOrders.csv';
//   let csvData = json2csv.parse(data, {header: false}) + newLine;

//   resp = writeCsv(file, csvData);
//   win.webContents.send('writeOutwardOrdersResponse', resp);

// })

// ipcMain.on('writeExpenses', (event, data) => {
  
//   let resp = '00';
//   let file = 'dblib/expenses.csv';
//   let csvData = json2csv.parse(data, {header: false}) + newLine;

//   resp = writeCsv(file, csvData);
//   win.webContents.send('writeExpensesResponse', resp);

// })















const inwardOdersHead = ['inwardOrderNo', 'inwardOrderBusiness', 'inwardOrderBusinessGSTNo', 'inwarOrderItems', 'inwardOrderSubtotal', 'inwardOrderGSTPc', 'InwardOrderGSTAm', 'inwardOrderTotal']
const outwardOdersHead = ['outwardOrderId', 'outwardOrderNo', 'outwardOrderBusiness', 'outwardOrderBusinessGSTNo', 'inwarOrderItems', 'outwardOrderSubtotal', 'outwardOrderGSTPc', 'outwardOrderGSTAm', 'outwardOrderTotal']
const materialsHead = ['materialCd', 'materialName', 'minUnitQt', 'availableUnitQt']
const productsHead = ['productCd', 'productName', 'productRecipe', 'minUnitQt', 'availableUnitQt']
const expensesHead = ['personName', 'expenseAmount', 'expenseReason']




//Functions 

function createWindow() {
    win = new BrowserWindow({ 
        width: 800, 
        height: 600,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true
          },
        icon: __dirname + "/img.png"
    })
  
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, `/../../dist/smart-business/index.html`),
        protocol: 'file:',
        slashes: true,
      })
    )
  
    // win.webContents.openDevTools()
  
    win.on('closed', () => {
      win = null
    })
  }  

  
function writeCsv(file, csvData){
  let resp = '00';

  try{
    fs.statSync(file);
  }catch(err){
    try{
      fs.writeFileSync(file, inventoryItemHead + newLine)
    }catch(err){
      resp = "08";
    }
  }

  if(resp == "00"){
    try{
      fs.appendFileSync(file, csvData)
    }catch(err){
      resp = "08";
    }
  }
  
  return resp;
}