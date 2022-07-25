public with sharing class OpportunityChartHelper {
    
    

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities(){
        return 
        [SELECT Amount,Name,StageName FROM Opportunity WHERE StageName = 'Closed Won'  LIMIT 20];
        
    }

    @AuraEnabled(cacheable=true)
    public static List<DataSetResult> getAmounts(){
        List<DataSetResult> dList = new List<DataSetResult>(); 
        List<Opportunity> opps = [SELECT Amount,CloseDate FROM Opportunity WHERE StageName = 'Closed Won'  ORDER BY CloseDate ASC LIMIT 10];
        for(Opportunity opp:opps){
            Integer closeWeek =isoWeekNumber(opp.CloseDate);
            DataSetResult d = new DataSetResult();            
            d.y = string.valueof(Integer.valueOf(opp.Amount));
            d.x = string.valueof(closeWeek);
            dList.add(d);
        }
        System.debug(JSON.serializePretty(dList));
        return dList;
    }

    public static Integer isoWeekNumber(Date value) {
        Integer daysSince1900_01_07 = Date.newInstance(1900, 1, 7).daysBetween(value);
        Integer dayNumber = Math.mod(daysSince1900_01_07, 7) + 1;
        
        Date dateForYear = value.addDays(Math.mod(8 - dayNumber, 7) - 3);
        Integer year = dateForYear.year();
        Date year_01_01 = Date.newInstance(year, 1, 1);
        
        Integer week = (Integer)Math.floor((year_01_01.daysBetween(value)
                + Math.mod((Math.mod(Date.newInstance(1900, 1, 7).daysBetween(year_01_01), 7) + 1) + 1, 7) - 3) / 7 + 1);
                
        return week;
    }
}
