import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DataTable } from 'react-native-paper';
import { DocumentData } from 'firebase/firestore';

const TransactionsPage = ({transactions}: {transactions : DocumentData[]}) => {
    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPageList] = useState([4, 7, 10, 15]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
      numberOfItemsPerPageList[0]
    );
  

    const [items, setItems] = useState(transactions);
  
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);
  
    useEffect(() => {
      setItems(transactions)
      setPage(0);
    }, [itemsPerPage, transactions]);

  
    return (
      <DataTable >
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title numeric>Currency</DataTable.Title>
          <DataTable.Title numeric>Amount</DataTable.Title>
          <DataTable.Title numeric>Status</DataTable.Title>
        </DataTable.Header>
  
        {items.slice(from, to).map((item) => (
          <DataTable.Row key={item._id}>
            <DataTable.Cell>{item.transactionId}</DataTable.Cell>
            <DataTable.Cell numeric>{item.currency}</DataTable.Cell>
            <DataTable.Cell numeric>{item.amount}</DataTable.Cell>
            <DataTable.Cell numeric>{item.status}</DataTable.Cell>
          </DataTable.Row>
        ))}
  
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    );
  };


export default TransactionsPage

const styles = StyleSheet.create({})