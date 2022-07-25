import { createElement } from 'lwc';
import DemoLineChart from 'c/demoLineChart';

describe('c-demo-line-chart', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-demo-line-chart', {
            is: DemoLineChart
        });

        // Act
        document.body.appendChild(element);

        // Assert
        //const header = element.shadowRoot.querySelector('.slds-text-heading_small');
        const card = element.shadowRoot.querySelector('lightning-card');
        expect(card.title).toBe('Demo Line Chart');
    });
});