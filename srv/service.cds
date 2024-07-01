using {icm as my} from '../db/schema';

service InsentiveCommision @(path: '/browse') {
    entity Insentive       as projection on my.InsentiveConfiguration;
    entity InsentiveRanFor as projection on my.InsentiveRanForDates;
}

service ManagerCalculation @(path: '/browse1') @(impl: './service.js') {

    action calculatedata(schemeid : String, schemename : String, skuid : String, regioncode : String, empcode : String, minsales : Decimal, percentile : Decimal, from_date : Date, to_date : Date) returns String;

}