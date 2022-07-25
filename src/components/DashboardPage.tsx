import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Dashboard } from "../model/Dashboard";

import { gql, useQuery } from "@apollo/client";
import Chart from "./Chart";
import { Stack } from "@mui/material";
import LineChart from "./LineChart";


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

  const { data } = useQuery(QUERY);

  const [dashboardData, setDashboardData] = useState<Dashboard[]>([]);
  const [purchaseDate, setPurchaseDate] = useState<any[]>([]);
  const [totalSales, setTotalSales] = useState<any[]>([]);
  const [showTable, setShowTable] = useState<any>(false);

  useEffect(() => {
    setDashboardData(data?.findByOrganizationId);
    setPurchaseDate(data?.findByOrganizationId.map((d: any) => d.purchaseDate));
    setTotalSales(
      data?.findByOrganizationId.map((d: any) => d.totalSalesAmount)
    );
  }, [data]);

  return (
    <div className={"formContainer"}>
      <div className={"textHead"}>Shopify-Demo</div>
      <br></br>
      
      <div className="chart-div" onClick={() => setShowTable(!showTable)}>
      <Stack direction="row" spacing={2}>
            <Chart purchaseDate={purchaseDate} totalSales={totalSales} />
            <LineChart purchaseDate={purchaseDate} totalSales={totalSales}/>
        </Stack>
      </div>
    
      
      <br></br>
      {showTable && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Purchase Date</TableCell>
                <TableCell align="right">Platform Data Type</TableCell>
                <TableCell align="right">Total Sales Amount</TableCell>
                <TableCell align="right">Total Discount Amount</TableCell>
                <TableCell align="right">Total Tax Amount</TableCell>
                <TableCell align="right">Currency</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dashboardData?.map((row) => (
                <TableRow key={row.purchaseDate}>
                  <TableCell component="th" scope="row">
                    {row.purchaseDate}
                  </TableCell>
                  <TableCell align="right">{row.platformDataType}</TableCell>
                  <TableCell align="right">{row.totalSalesAmount}</TableCell>
                  <TableCell align="right">{row.totalDiscountAmount}</TableCell>
                  <TableCell align="right">{row.totalTaxAmount}</TableCell>
                  <TableCell align="right">{row.currency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default DashboardPage;
