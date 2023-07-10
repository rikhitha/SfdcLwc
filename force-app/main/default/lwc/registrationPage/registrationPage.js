import { LightningElement, wire,api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import  getRegisterObjRec  from '@salesforce/apex/GetRegisterRecords.getRegisterObjRec';
import sendEmail from '@salesforce/apex/EmailHandler.sendEmail';
import conObject from '@salesforce/schema/RegisterObject__c';
import conuserName from '@salesforce/schema/RegisterObject__c.UserName__c';
import conemail from '@salesforce/schema/RegisterObject__c.Email_Id__c';
import conpassword from '@salesforce/schema/RegisterObject__c.Password__c';
import conrepassword from '@salesforce/schema/RegisterObject__c.Re_Type_Password__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactForm extends LightningElement {
    userName = '';
    email = '';
    password = '';
    repassword = '';
    @api recrds=[];
   
    contactChangeVal(event) {
        console.log(event.target.label);
        console.log(event.target.value);
        if(event.target.label=='User Name'){
        
                this.userName = event.target.value;  
            
        }
        if(event.target.label=='Email'){
            this.email = event.target.value;
        }
        if(event.target.label=='Password'){
            this.password = event.target.value;
        }
        if(event.target.label=='Re-Type Password'){
            this.repassword = event.target.value;
        }
        
       
    }
    @wire (getRegisterObjRec) wiredRegisterObject__c({data,error}){
            if(data){
                this.recrds = data;

            console.log("DATA ***********"+this.recrds.email)
            }
            else if (error){
                console.log(error)
            }
    }
   
    insertContactAction(){
        // if (this.recrds.email == this.email){
        //     const event = new ShowToastEvent({
        //         title: 'User Already Registered',
        //         message: 'Already Registered !! Try new Email' ,
        //         variant: 'error',
        //         mode: 'dismissable'        
        //    });
        //    this.dispatchEvent(event);
        //    this.dispatchEvent(new CloseActionScreenEvent());
        // }
        // else if (this.recrds.email != this.email)
        // {}

        
        console.log(this.selectedAccountId);
        const fields = {};
        fields[conuserName.fieldApiName] = this.userName;
        fields[conemail.fieldApiName] = this.email;
        fields[conpassword.fieldApiName] = this.password;
        fields[conrepassword.fieldApiName] = this.repassword;
       
        const recordInput = { apiName: conObject.objectApiName, fields };
       
       
        if (this.password != this.repassword){
            const event = new ShowToastEvent({
                title: 'Error Password',
                message: 'Password Doesnot Match',
                variant: 'error',
                mode: 'dismissable'        
           });
           this.dispatchEvent(event);
           this.dispatchEvent(new CloseActionScreenEvent());
        }
        else if  (this.password == this.repassword)
        {
        
        createRecord(recordInput)
            .then(contactobj=> {
                this.contactId = contactobj.id;
                sendEmail({ toAddress: this.email, subject: "Registered Successfully", body: "You Have Registered Successfully !!"});
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Registered Successfully'+ JSON.stringify(this.recrds),
                        variant: 'success',
                    }),
                );
            })
             
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error Occured While Registering',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
            
        }   
    }
}