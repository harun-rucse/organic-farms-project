import React from 'react';
import { PDFViewer, Page, Text, Font, Image, View, Document, StyleSheet } from '@react-pdf/renderer';

Font.register({
  family: 'SolaimanLipi',
  fonts: [{ src: '/fonts/SolaimanLipi.ttf' }],
});

Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  viewer: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  col4: { width: '25%' },
  col8: { width: '75%' },
  col6: { width: '50%' },
  mb8: { marginBottom: 8 },
  mb40: { marginBottom: 40 },
  overline: {
    fontSize: 8,
    marginBottom: 8,
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  h3: { fontSize: 16, fontWeight: 700 },
  h4: { fontFamily: 'Roboto', fontSize: 13, fontWeight: 700 },
  body1: { fontSize: 10 },
  subtitle2: { fontFamily: 'Roboto', fontSize: 9, fontWeight: 700 },
  subtitle3: { fontSize: 9, fontWeight: 700 },
  alignRight: { textAlign: 'right' },
  page: {
    padding: '40px 24px 0 24px',
    fontSize: 9,
    lineHeight: 1.6,
    fontFamily: 'SolaimanLipi',
    backgroundColor: '#fff',
    textTransform: 'capitalize',
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    margin: 'auto',
    borderTopWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
    borderColor: '#DFE3E8',
  },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  table: { display: 'flex', width: 'auto' },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    padding: '8px 0',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DFE3E8',
  },
  noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
  tableCell_1: { width: '5%' },
  tableCell_2: { width: '50%', paddingRight: 16 },
  tableCell_3: { width: '15%' },
});

function OrderDetailsPdf({ order }) {
  return (
    <PDFViewer style={styles.viewer}>
      <Document title={`order_${order._id}`}>
        <Page size="A4" style={styles.page}>
          <View style={[styles.gridContainer, styles.mb40]}>
            <Image source="/assets/logo_full.jpg" style={{ height: 32 }} />
            <View style={{ alignItems: 'right', flexDirection: 'column' }}>
              <Text style={styles.h4}>{order.paymentStatus}</Text>
              <Text>ID-{order._id}</Text>
            </View>
          </View>

          <View style={[styles.gridContainer, styles.mb40]}>
            <View style={styles.col6}>
              <Text style={[styles.overline, styles.mb8]}>Invoice from</Text>
              <Text style={styles.body1}>{order.branchOffice.name}</Text>
              <Text style={styles.body1}>{order.branchOffice.address}</Text>
              <Text style={styles.body1}>{order.branchOffice.phone}</Text>
            </View>
            <View style={styles.col6}>
              <Text style={[styles.overline, styles.mb8]}>Invoice to</Text>
              <Text style={styles.body1}>{order.customer.name + ' '}</Text>
              <Text style={styles.body1}>{order.customer.address + ' '}</Text>
              <Text style={styles.body1}>{order.customer.phone}</Text>
            </View>
          </View>

          <Text style={[styles.overline, styles.mb8]}>Invoice Details</Text>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={styles.tableRow}>
                <View style={styles.tableCell_1}>
                  <Text style={styles.subtitle2}>#</Text>
                </View>
                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>Description</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle2}>Qty</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle2}>Unit price</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text style={styles.subtitle2}>Total</Text>
                </View>
              </View>
            </View>

            <View style={styles.tableBody}>
              {order.products.map((item, index) => (
                <View style={styles.tableRow} key={item._id}>
                  <View style={styles.tableCell_1}>
                    <Text>{index + 1}</Text>
                  </View>
                  <View style={styles.tableCell_2}>
                    <Text style={styles.subtitle3}>{item.product.name}</Text>
                    <Text>{item.product.description.substring(0, 50)}...</Text>
                  </View>
                  <View style={styles.tableCell_3}>
                    <Text>{item.quantity}</Text>
                  </View>
                  <View style={styles.tableCell_3}>
                    <Text>{item.product.price}</Text>
                  </View>
                  <View style={[styles.tableCell_3, styles.alignRight]}>
                    <Text>{item.price}</Text>
                  </View>
                </View>
              ))}

              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_1} />
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3}>
                  <Text>Subtotal</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{order.totalAmount}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_1} />
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3}>
                  <Text>Delevery</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{order.deliveryCharge}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_1} />
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3}>
                  <Text style={styles.h4}>Total</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text style={styles.h4}>{order.grandTotalAmount}</Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default OrderDetailsPdf;
