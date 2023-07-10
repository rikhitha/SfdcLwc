import { LightningElement } from 'lwc';


//Parent
export default class SecondLWCComponent extends LightningElement {




    slidervalue;

    handlerChange(event){

        this.slidervalue = event.target.value
    }
}