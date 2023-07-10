import { LightningElement, wire } from 'lwc';

import { getRecord } from 'lightning/uiRecordApi';

export default class LwcWireAdapters extends LightningElement {

    @wire(getRecord,{recordId:'0015h00001B2032AAB',fields:['Account.Name']})
    getAccountRecord (response){ //response can either be stored inside property or function
   console.log('wire method called woow')
   console.log(response)
   console.log(response.data)
   console.log(response.data)

    }
}