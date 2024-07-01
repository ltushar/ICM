using {managed} from '@sap/cds/common';

namespace icm;


entity InsentiveConfiguration : managed {
    key ID         : Integer;
        schemeid   : String(100);
        schemename : String(100);
        skuid      : String(255);
        regioncode : String(255);
        empcode    : String(255);
        minsales   : Decimal(10, 2);
        percentile : Decimal(10, 2);

}

entity InsentiveRanForDates : managed {
    key ID         : UUID;
        icid       : Integer;
        schemeid   : String(100);
        schemename : String(100);
        skuid      : String(255);
        regioncode : String(255);
        empcode    : String(255);
        minsales   : Decimal(10, 2);
        percentile : Decimal(10, 2);
        from_date  : Date;
        to_date    : Date;

};


entity Transaction_SalesData : managed {
    skuid       : String(255);
    regioncode  : String(255);
    sales_agent : String(100);
    actualsales : Decimal(10, 2);
    sale_date   : Date;
}

entity Trans_Cal_data : managed {
    key cid            : Integer;
        schemeid       : String(100);
        scheme         : String(100);
        from_date      : Date;
        to_date        : Date;
        skuid          : String(255);
        regioncode     : String(255);
        sales_agent    : String(100);
        sale_date      : Date;
        daily_sales    : Decimal(10, 2);
        total_sales    : Decimal(10, 2);
        minsales       : Decimal(10, 2);
        percentile     : Decimal(10, 2);
        totalinsentive : Decimal(10, 2);
        status         : String(100) ;
        isdel          : String(1) default '0';
        icid           : Integer;
}
