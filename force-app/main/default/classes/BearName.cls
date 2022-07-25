public without sharing class BearName {
   
    @InvocableMethod(label ='Get Bear Id' description = 'get bear id from bear name' category ='aa')
    public static List<String> getBearIdByBearNames(List<String> names) {

        List<Id> bearIds = new List<Id>();
        List<Bear__c> bears =[SELECT Id FROM Bear__c WHERE Name IN :names];
        for(Bear__c b:bears){
            bearIds.add(b.Id);
        }
        return bearIds;
    }
}
