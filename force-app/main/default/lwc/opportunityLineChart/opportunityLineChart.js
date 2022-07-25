import {LightningElement, wire, track,api} from 'lwc';
import getAmounts from '@salesforce/apex/OpportunityChartHelper.getAmounts';
import chartjs from '@salesforce/resourceUrl/ChartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class OpportunityLineChart extends LightningElement {
@track isChartJsInitialized;
chart;
@api config;
objopp = [{ y:'100000',x: '1'},{ y:'120000', x:'5'},{ y:'915000', x:'22'},{ y:'230000', x:'35'},{ y:'350000', x:'49'}];
@track chartConfiguration;

@wire(getAmounts, {}) 
getAmounts({error, data}) {
    if (error) {
     this.error = error;
     console.log('error => ' + JSON.stringify(error));
     this.chartConfiguration = undefined;
    } else if (data) {     
     console.log('dataset => ', data);
     this.error = undefined;
     let dSet = data;
     this.chartConfiguration = {
        type: 'line',
        data: {
            datasets: [{
                fill: false,
                label: 'Line Dataset hard code',
                data: [{ y:'100000',x: '1'},{ y:'120000', x:'5'},{ y:'915000', x:'22'},{ y:'230000', x:'35'},{ y:'350000', x:'49'}],                
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                pointBackgroundColor: 'rgba(255, 99, 132, 0.2)',
                pointBorderColor: 'rgba(255, 99, 132, 1)'
            },
            {
                fill: false,
                label: 'Line Dataset from apex',
                data: dSet,                
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                backgroundColor: [
                    '#80aaff'
                ],
                borderColor: [
                    'blue'
                ],
                pointBackgroundColor: '#80aaff',
                pointBorderColor: 'blue'
            }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Samples value per calendar week.'
            },
            scales: {
                xAxes: [{
                    type: 'linear',
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 52,
                        stepSize: 4
                    }
                }],
                yAxes: [{
                    type: 'linear',
                    ticks: {
                        autoSkip: true,
                        suggestedMin: 100000,
                        suggestedMax: 1000000,
                        stepSize: 100000,
                        callback: function (value) {
                            return value/10000 ;
                        }
                    }
                }]
            },
        }
    };
   }
}   


 /*
 objopp = [{ y:'100000',x: '1'},{ y:'120000', x:'5'},{ y:'915000', x:'22'},{ y:'230000', x:'35'},{ y:'350000', x:'49'}];
 config = {
    type: 'line',
    data: {
        datasets: [{
            fill: false,
            label: 'Line Dataset',
            data: this.amountDataSet,
            //data:this.objopp,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            pointBackgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointBorderColor: 'rgba(255, 99, 132, 1)'
        },
        {
            fill: false,
            label: 'Line Dataset 2',
            data: [{  
                y:200,
                x:0
             },{  
                y:98,
                x:10
             },{  
                y:95,
                x:20
             },{  
                y:92,
                x:30
             },{  
                y:88,
                x:50
             },{  
                y:84,
                x:60
             },{  
                y:75,
                x:70
             },{  
                y:50,
                x:80
             },{  
                y:25,
                x:90
             },{  
                y:14,
                x:100
             },{  
                y:8,
                x:110
             },{  
                y:5,
                x:120
             },{  
                y:2,
                x:130
             }],
            backgroundColor: [
                '#80aaff'
            ],
            borderColor: [
                'blue'
            ],
            pointBackgroundColor: '#80aaff',
            pointBorderColor: 'blue'
        }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Samples value per calendar week.'
        },
        scales: {
            xAxes: [{
                type: 'linear',
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 52,
                    stepSize: 4
                }
            }],
            yAxes: [{
                type: 'linear',
                ticks: {
                    autoSkip: true,
                    suggestedMin: 100000,
                    suggestedMax: 1000000,
                    stepSize: 100000,
                    callback: function (value) {
                        return value/10000 ;
                    }
                }
            }]
        },
    }
};*/

async renderedCallback() {
    if (this.isChartJsInitialized) {
        return;
    }
    this.isChartJsInitialized = true;   
    
    Promise.all([
        loadScript(this, chartjs)       
    ]).then(() => {        
        const ctx = this.template.querySelector('canvas.linechart').getContext('2d');
        //console.dir(this.getOpportunities);
        //console.dir(this.amountDataSet);
        //console.dir(this.wiredAmounts.data);
        console.log(`config ${this.chartConfiguration.data.datasets} => `, this.chartConfiguration.data.datasets[0].data);
        this.chart = new window.Chart(ctx, this.chartConfiguration);
        this.chart.canvas.parentNode.style.height = '100%';
        this.chart.canvas.parentNode.style.width = '100%';
       
    }).catch(error => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error loading ChartJS',
                message: error.message,
                variant: 'error',
            }),
        );
    });
}
}