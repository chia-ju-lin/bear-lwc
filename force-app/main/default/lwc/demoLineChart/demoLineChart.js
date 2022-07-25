import {LightningElement, wire, track,api} from 'lwc';
import getAmounts from '@salesforce/apex/OpportunityChartHelper.getAmounts';

export default class DemoLineChart extends LightningElement {
    objopp = [{ y:'100000',x: '1'},{ y:'120000', x:'5'},{ y:'915000', x:'22'},{ y:'230000', x:'35'},{ y:'350000', x:'49'}];
    @track chartConfiguration;
    error;
    
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
                        //label: 'wk',
                        scaleLabel: {
                            display: true,
                            labelString: 'calendar week'
                          },
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
    
    


}