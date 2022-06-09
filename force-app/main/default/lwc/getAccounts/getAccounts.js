import { LightningElement, wire } from 'lwc';
import { getRecord } from'lightning/uiRecordApi';

import NAME_FIELD from'@salesforce/schema/Account.Name';
import RATING_FIELD from'@salesforce/schema/Account.Rating';
import PHONE_FIELD from'@salesforce/schema/Account.Phone';
import INDUSTRY_FIELD from'@salesforce/schema/Account.Industry';

export default class GetAccounts extends LightningElement {
    accountId;    
    @wire(getRecord, { recordId: '$accountId', fields: [        
        NAME_FIELD, RATING_FIELD, PHONE_FIELD, INDUSTRY_FIELD    
     ] })    
    account;    
    handleAccountIdChange(event) {
        this.accountId = event.target.value;    
     }    
 
    dispatchShowDetailsEvent() {
   
        if (this.accountId && this.account.data) {
            
            const event = new CustomEvent('showdetails', {                 
                detail: this.account.data             
             });
             this.dispatchEvent(event);        
         }    
     }
    }