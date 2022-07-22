import React, {useEffect, useState} from 'react';
import {makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Dashboard} from '../model/Dashboard';

import {gql, useQuery} from "@apollo/client";
import Chart from './Chart';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const DashboardPage = () => {
    const classes = useStyles();

    const QUERY = gql`
        {
            findByOrganizationId(organizationId: 1) {
                purchaseDate
                platformStoreId
                platformDataType
                totalSalesAmount
                totalDiscountAmount
                totalTaxAmount
                currency
                totalOrderItemsQty
            }
        }
    `;

    const {data} = useQuery(QUERY);

    useEffect(() => {
        setDashboardData(data?.findByOrganizationId)
    }, [data]);


    const [dashboardData, setDashboardData] = useState<Dashboard[]>([]);

    return (
        <div className={"formContainer"}>
            <div className={"textHead"}>Shopify-Demo</div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Purchase Date</TableCell>
                            <TableCell align="right">Platform Store Id</TableCell>
                            <TableCell align="right">Platform Data Type</TableCell>
                            <TableCell align="right">Total Sales Amount</TableCell>
                            <TableCell align="right">Total Discount Amount</TableCell>
                            <TableCell align="right">Total Tax Amount</TableCell>
                            <TableCell align="right">Currency</TableCell>
                            <TableCell align="right">Total Order Items Qty</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dashboardData?.map((row) => (
                            <TableRow key={row.purchaseDate}>
                                <TableCell component="th" scope="row">
                                    {row.purchaseDate}
                                </TableCell>
                                <TableCell align="right">{row.platformStoreId}</TableCell>
                                <TableCell align="right">{row.platformDataType}</TableCell>
                                <TableCell align="right">{row.totalSalesAmount}</TableCell>
                                <TableCell align="right">{row.totalDiscountAmount}</TableCell>
                                <TableCell align="right">{row.totalTaxAmount}</TableCell>
                                <TableCell align="right">{row.currency}</TableCell>
                                <TableCell align="right">{row.totalOrderItemsQty}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
                
                <br></br>
                <Chart data ={dashboardData}/>
            

        </div>
    );
};

export default DashboardPage;


