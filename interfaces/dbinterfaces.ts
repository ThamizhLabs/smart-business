export interface inwardOders {
    inwardOrderNo: string,
    inwardOrderBusiness: string,
    inwardOrderBusinessGSTNo: string,
    inwardOrderDate: Date,
    inwarOrderItems: {
      itemName: string,
      itemPrice: number
    }[],
    inwardOrderSubtotal: number,
    inwardOrderGSTPc: number,
    InwardOrderGSTAm: number,
    inwardOrderTotal: number
  } 
  
  export interface outwardOders {
    outwardOrderId: string,
    outwardOrderNo: string,
    outwardOrderBusiness: string,
    outwardOrderBusinessGSTNo: string,
    outwardOrderDate: Date,
    inwarOrderItems: {
      itemName: string,
      itemPrice: number
    }[],
    outwardOrderSubtotal: number,
    outwardOrderGSTPc: number,
    outwardOrderGSTAm: number,
    outwardOrderTotal: number
  }
  
  export interface materials {
    materialCd: string,
    materialName: string,
    minUnitQt: number,
    availableUnitQt: number
  }
  
  export interface products {
    productCd: string,
    productName: string,
    productRecipe: {
      materialCd: string,
      materialName: string,
      requiredUnitQt: number
    }[],
    minUnitQt: number,
    availableUnitQt: number
  }

  export interface inventoryItem {

    itemCd: string,
    itemType: string,
    itemName: string,
    itemRecipe?: {
      materialCd: string,
      materialName: string,
      requiredUnitQt: number
    }[],
    minUnitQt: number,
    availableUnitQt: number

  }
  
  export interface expenses{
    personName: string,
    expenseAmount: number,
    expenseReason: string
  }