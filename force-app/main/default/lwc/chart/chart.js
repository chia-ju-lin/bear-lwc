import {LightningElement, api, track} from 'lwc';
import chartjs from '@salesforce/resourceUrl/ChartJs';
import {loadScript} from 'lightning/platformResourceLoader';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class Chart extends LightningElement {
 //@api loaderVariant = 'base';
 @api chartConfig;

 @track isChartJsInitialized;
 
 renderedCallback() {
  if (this.isChartJsInitialized) {
   return;
  }
  this.isChartJsInitialized = true;
  // load static resources.
  Promise.all([loadScript(this, chartjs)])
   .then(() => {
    this.isChartJsInitialized = true;
    let config;
    if (typeof this.chartConfig !== 'undefined'){
        config = JSON.parse(JSON.stringify(this.chartConfig));
    }
    const ctx = this.template.querySelector('canvas.linechart').getContext('2d');
    this.chart = new window.Chart(ctx,config);
    this.chart.canvas.parentNode.style.height = '100%';
    this.chart.canvas.parentNode.style.width = '100%';
   })
   .catch(error => {
    this.dispatchEvent(
     new ShowToastEvent({
      title: 'Error loading ChartJS',
      message: error.message,
      variant: 'error',
     })
    );
   });
 }
}