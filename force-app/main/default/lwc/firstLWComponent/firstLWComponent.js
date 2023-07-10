import { LightningElement, track, api } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName'
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName'
//import LEVEL_FIELD from '@salesforce/schema/Contact.Level__c'


//child
export default class FirstLWComponent extends LightningElement {


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
    result 

    num1=0

    num2=0
@api slidervalue;

    fname = true

    myclass 

    

    @track person =['rik','jack','nivi','gola']

    @track emp = [
        {
        name:'rik',
        position :'analyst'
    },
    {
        name:'rikitha 2',
        position :'analyst prgrmr'
    },
]

    handleClick(event){

        // if (event.target.name == 'button'){
        //     this.fname = "Rikhitha Manojkumar"
        // }
        // if (event.target.name == 'button1'){
        //     this.person[0] = "array change"
        // }
        if (event.target.name == 'button2'){
            this.emp.position= "position change"
        }
        
    }
    handleClickColor(event){
        if(event.target.name == 'format1'){

            this.myclass = 'class1'
        }

        if(event.target.name == 'format2'){
            this.myclass = 'class2'
        }

        if(event.target.name == 'format3'){
            this.myclass = 'class3'
        }

    }

    get personName(){

        return this.person[0]
    }

    getValue1(event){


        this.num1 = event.target.value



    }
    getValue2(event){

        this.num2 = event.target.value

    }

    handleClickResult(event){
        if(event.target.name == 'add'){

            this.result = Number(this.num1) + Number(this.num2)


        }
        if(event.target.name == 'sub'){

            this.result = this.num1 - this.num2

        }
        if(event.target.name == 'mul'){

            this.result = this.num1 * this.num2

        }
    }
}