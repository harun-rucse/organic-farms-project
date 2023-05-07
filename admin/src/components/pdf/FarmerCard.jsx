import React from 'react';
import { useParams } from 'react-router-dom';
import { PDFViewer, Page, Text, Image, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useGetFarmerCardQuery } from '@/store/apiSlices/farmerCardApiSlice';
import { fDate } from '@/utils/formatTime';

const styles = StyleSheet.create({
  viewer: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 30,
  },
  wrapper: {
    width: 350,
    height: 300,
    border: '1px solid #000',
    padding: 10,
    borderRadius: 5,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderBottom: '1px dashed #000',
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 5,
    marginBottom: 5,
    color: '#212A3E',
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 'normal',
    letterSpacing: 1.5,
    color: '#394867',
    marginBottom: 2,
  },
  redText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E53E3E',
    marginTop: 5,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    gap: 30,
  },
  image: {
    width: 'auto',
    height: 70,
    objectFit: 'contain',
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#000',
    marginBottom: 5,
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 10,
    paddingTop: 10,
  },
  heading: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#000',
    marginBottom: 5,
  },
  footerText: {
    fontSize: 8,
    fontWeight: 'normal',
    letterSpacing: 1,
    color: '#000',
    marginBottom: 5,
  },
});

function FarmerCard() {
  const { id } = useParams();
  const { data, isLoading } = useGetFarmerCardQuery(id);

  if (isLoading) return null;
  const { farmer, branchOffice, createdBy, cardNumber, createdAt } = data;

  return (
    <PDFViewer style={styles.viewer}>
      <Document title={`${cardNumber}_card`}>
        <Page size="A4" style={styles.page}>
          <View style={styles.wrapper}>
            <View style={styles.header}>
              <Text style={styles.title}>Organic Farms</Text>
              <Text style={styles.subtitle}>{`(${branchOffice.name})`}</Text>
              <Text style={styles.subtitle}>Address: {branchOffice?.address}</Text>
              <Text style={styles.subtitle}>Phone: {branchOffice?.phone}</Text>
              <Text style={styles.redText}>Farmer ID Card</Text>
            </View>
            <View style={styles.container}>
              <Image style={styles.image} src={farmer.image} />
              <View style={styles.infoWrapper}>
                <Text style={styles.text}>Name: {farmer.name}</Text>
                <Text style={styles.text}>Phone: {farmer.phone}</Text>
                <Text style={styles.text}>Address: {farmer.address}</Text>
                <Text style={styles.text}>Card Number: {cardNumber}</Text>
                <Text style={styles.text}>ID NO: {farmer.identity}</Text>
              </View>
            </View>
            <View style={styles.footer}>
              <View>
                <Text style={styles.heading}>Issued By</Text>
                <Text style={styles.footerText}>Name: {createdBy.name}</Text>
                <Text style={styles.footerText}>Designation: {createdBy.role}</Text>
                <Text style={styles.footerText}>Phone: {createdBy.phone}</Text>
                <Text style={styles.footerText}>Date: {fDate(createdAt)}</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default FarmerCard;
