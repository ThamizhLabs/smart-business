"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var inventoryItemHead = ['itemCd', 'itemType', 'itemName', 'itemRecipe', 'minUnitQt', 'availableUnitQt'];
var win;
var newLine = "\r\n";
var fs = require('fs');
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
electron_1.app.on('browser-window-created', function (e, window) {
    window.setMenu(null);
});
electron_1.ipcMain.on("testPing", function (event, reqid) {
    console.log("testping received on main process!!");
    var files = require("fs").readdirSync(__dirname);
    win.webContents.send('testPingResponse' + reqid, files);
});
electron_1.ipcMain.on("getDB", function (event, reqid, file) {
    var resp = "00";
    var filenm = 'dblib/' + file + '.csv';
    var csv2json = require('csvtojson');
    csv2json()
        .fromFile(filenm)
        .then(function (dbData) {
        win.webContents.send("getDBResponse" + reqid, dbData, resp);
    });
    // try{
    //   dbData = fs.readFileSync(filenm)
    //     .toString() // convert Buffer to string
    //     .split(newLine) // split string to lines
    //     .map(e => e.trim()) // remove white spaces for each line
    //     .map(e => e.split(',').map(e => e.trim())); // split each line to array
    // }catch(err){
    //   resp = "08"
    // }
});
electron_1.ipcMain.on('writeDB', function (event, reqid, file, csvData) {
    var resp = '00';
    var filenm = 'dblib/' + file + '.csv';
    resp = writeCsv(filenm, csvData + newLine);
    win.webContents.send('writeDBResponse' + reqid, resp);
});
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
var inwardOdersHead = ['inwardOrderNo', 'inwardOrderBusiness', 'inwardOrderBusinessGSTNo', 'inwarOrderItems', 'inwardOrderSubtotal', 'inwardOrderGSTPc', 'InwardOrderGSTAm', 'inwardOrderTotal'];
var outwardOdersHead = ['outwardOrderId', 'outwardOrderNo', 'outwardOrderBusiness', 'outwardOrderBusinessGSTNo', 'inwarOrderItems', 'outwardOrderSubtotal', 'outwardOrderGSTPc', 'outwardOrderGSTAm', 'outwardOrderTotal'];
var materialsHead = ['materialCd', 'materialName', 'minUnitQt', 'availableUnitQt'];
var productsHead = ['productCd', 'productName', 'productRecipe', 'minUnitQt', 'availableUnitQt'];
var expensesHead = ['personName', 'expenseAmount', 'expenseReason'];
//Functions 
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true
        },
        icon: __dirname + "/img.png"
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/smart-business/index.html"),
        protocol: 'file:',
        slashes: true,
    }));
    // win.webContents.openDevTools()
    win.on('closed', function () {
        win = null;
    });
}
function writeCsv(file, csvData) {
    var resp = '00';
    try {
        fs.statSync(file);
    }
    catch (err) {
        try {
            fs.writeFileSync(file, inventoryItemHead + newLine);
        }
        catch (err) {
            resp = "08";
        }
    }
    if (resp == "00") {
        try {
            fs.appendFileSync(file, csvData);
        }
        catch (err) {
            resp = "08";
        }
    }
    return resp;
}
//# sourceMappingURL=main.js.map