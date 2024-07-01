const cds = require("@sap/cds");


function lPad(str, size) {
    var s = str.toString();
    while (s.length < size) {
        s = "0" + s;
    }
    return s; // return new number
}

class ManagerCalculation extends cds.ApplicationService {

    init() {


        const { InsentiveRanFor } = this.entities;

        this.before("calculatedata", async (context) => {


            const db = await cds.connect.to('db')
            var query = await db.run('SELECT COUNT(1) FROM "ICM_TRANS_CAL_DATA" WHERE PERCENTILE = ? AND schemeid = ? ',[context.data.percentile,context.data.schemeid]);
            var count = query[0]["COUNT(1)"];

            if(count === 0){
                var x = await db.run(" UPDATE ICM_TRANS_CAL_DATA SET ISDEL = '1' WHERE ID = '" +req.data.ID +"' ");   
            }

        });

        this.before('CREATE', InsentiveRanFor, async (context) => {

            const db = await cds.connect.to("db");
            var x = await db.run('SELECT "NEXTVAL".NEXTVAL FROM DUMMY');
            var numberfinal = x[0]["CCID.NEXTVAL"];
            context.data.ICID = numberfinal;

        });


        var d = new Date();
        var dt = d.getFullYear() + '-' + lPad((d.getMonth() + 1), 2) + '-' + lPad(d.getDate(), 2);

        // this.on("calculatedata", async (req) => {
        //     try {
        //         var SalesData = new Array();
        //         var SalesTransData = new Array();

        //         const db = await cds.connect.to('db')
        //         const dbClass = require('sap-hdbext-promisfied');
        //         let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials));

        //         var statementpreparation = ' SELECT SKUID,REGIONCODE,SALES_AGENT, DAILY_SALES ,SALE_DATE,SUM(DAILY_SALES) OVER (PARTITION BY SALES_AGENT ORDER BY SALE_DATE,SKUID,REGIONCODE,SALES_AGENT) AS TOTAL_SALES , '
        //             + ' (CASE WHEN SUM(DAILY_SALES) OVER (PARTITION BY SALES_AGENT ORDER BY SALE_DATE,SKUID,REGIONCODE,SALES_AGENT) >= ? '
        //             + '  THEN TO_DECIMAL(SUM(DAILY_SALES) OVER (PARTITION BY SALES_AGENT ORDER BY SALE_DATE,SKUID,REGIONCODE,SALES_AGENT)* ?/100 ,10,2) ELSE 0 END ) AS TOTAL_INCENTIVE FROM '
        //             + ' (SELECT SKUID,REGIONCODE,SALES_AGENT,SUM(ACTUALSALES) AS DAILY_SALES ,SALE_DATE FROM ICM_TRANSACTION_SALESDATA WHERE 1=1 ';

        //         if (req.data.skuid !== null && req.data.skuid !== undefined && req.data.skuid !== '') {
        //             statementpreparation += 'AND SKUID IN (\'' + req.data.skuid + '\') '
        //         }
        //         if (req.data.regioncode !== null && req.data.regioncode !== undefined && req.data.regioncode !== '') {
        //             statementpreparation += 'AND REGIONCODE IN (\'' + req.data.regioncode + '\') '
        //         }
        //         if (req.data.empcode !== null && req.data.empcode !== undefined && req.data.empcode !== '') {
        //             statementpreparation += 'AND SALES_AGENT IN (\'' + req.data.empcode + '\') '
        //         }
        //         statementpreparation += 'AND SALE_DATE BETWEEN ? AND ? GROUP BY SKUID,REGIONCODE,SALES_AGENT,SALE_DATE ORDER BY SALE_DATE ASC '
        //             + ' )GROUP BY SKUID,REGIONCODE,SALES_AGENT,SALE_DATE,DAILY_SALES ORDER BY SALE_DATE ASC ';
        //         console.log(statementpreparation);
        //         const sp = await dbConn.preparePromisified(statementpreparation);

        //         if(req.data.to_date < dt){
        //             SalesData = await dbConn.statementExecPromisified(sp, [req.data.minsales, req.data.percentile, req.data.from_date, req.data.to_date]);
        //         }else{
        //             SalesData = await dbConn.statementExecPromisified(sp, [req.data.minsales, req.data.percentile, req.data.from_date, dt]); 
        //         }

        //         for (let i = 0; i < SalesData.length; i++) {
        //             var targetObj = new Array();
        //             var targetObj = Object.assign({}, SalesData[i], req.data);
        //             SalesTransData.push(targetObj);
        //         }
            
        //         if (SalesTransData.length > 0) {

        //             for (let j = 0; j < SalesTransData.length; j++) {
                       
        //                 if (dt === SalesTransData[j].to_date) {
        //                     SalesTransData[j].status = "Incentive Calculation Completed";
        //                 }
        //                 if(SalesTransData[j].to_date > dt) {
        //                     SalesTransData[j].status = "Incentive Calculation Pending";
        //                 }
                       
        //                const db = await cds.connect.to('db')
        //             //    const sQuery = await db.run('CALL "prCreateTransIncentiveData" (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
        //             //         SalesTransData[j].schemeid,
        //             //         SalesTransData[j].schemename,
        //             //         SalesTransData[j].from_date,
        //             //         SalesTransData[j].to_date,
        //             //         SalesTransData[j].SKUID,
        //             //         SalesTransData[j].REGIONCODE,
        //             //         SalesTransData[j].SALES_AGENT,
        //             //         SalesTransData[j].SALE_DATE,
        //             //         SalesTransData[j].DAILY_SALES,
        //             //         SalesTransData[j].TOTAL_SALES,
        //             //         SalesTransData[j].minsales,
        //             //         SalesTransData[j].percentile,
        //             //         SalesTransData[j].TOTAL_INCENTIVE,
        //             //         SalesTransData[j].status
        //             //     ]);

        //             }
                    
        //         }
        //     } catch (error) {
        //         console.error(error)
        //         return {}
        //     }
        // })

        return super.init();
    }

}

module.exports = { ManagerCalculation };