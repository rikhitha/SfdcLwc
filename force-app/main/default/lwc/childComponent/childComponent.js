import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName'
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName'

export default class ChildComponent extends LightningElement {

    objectName=CONTACT_OBJECT;
    //fieldsList =[FIRSTNAME_FIELD,LASTNAME_FIELD,LEVEL_FIELD]
    fieldsList =[FIRSTNAME_FIELD,LASTNAME_FIELD]

    showToatMessaage(event){

        this.dispatchEvent(new ShowToastEvent({
            title :"Record Created",
            message : "Record created with Id  :" + event.detail.id,
        
            variant:"success"
        }))
    }

}