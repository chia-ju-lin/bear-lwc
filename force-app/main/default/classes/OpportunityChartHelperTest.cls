
@isTest
public with sharing class OpportunityChartHelperTest {
    @TestSetup
    static void makeData(){        
        List<Opportunity> opps = new List<Opportunity>();
        for (Integer i=0;i<10;i++) {
            opps.add(new Opportunity(Name='Test Opportunity ' + i,
                                    StageName='Closed Won',
                                    CloseDate=System.today().addMonths(i)
                                    ));            
        }
        // Insert all opportunities for all accounts.
        insert opps; 
    }
    @isTest
    private static void getOpportunitiesTest(){
        List<Opportunity> oppResult = OpportunityChartHelper.getOpportunities();
        System.assertequals(10,oppResult.size(),'size should be 10');
        System.assertnotequals(oppResult.size(),0,'List should not be empty');
    }

    @isTest
    private static void getAmountsTest(){
        List<DataSetResult> datasetResults = OpportunityChartHelper.getAmounts();
        String firstDataWeek = String.valueof(OpportunityChartHelper.isoWeekNumber(System.today()));
        System.assertequals(firstDataWeek,datasetResults[0].x,'first data should be week ');
    }
}
