import { LightningElement } from 'lwc';


export default class AccountDetails extends LightningElement {
    name;
    rating;
    handleShowDetails(event){
        const detail = event.detail;
        this.name = detail.fields.Name.value;
        this.rating = detail.fields.Rating.value;
    }
  
}