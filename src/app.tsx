import express, { Express, Request, Response } from "express";

import { Page, Text, View, Document, StyleSheet, renderToStream } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Hello, world!</Text>
      </View>
    </Page>
  </Document>
);

const app: Express = express();
const PORT: number = 3000;

app.get("/", async (req: Request, res: Response) => {
    const pdfStream = await renderToStream(<MyDocument />);
    res.setHeader('Content-Type', 'application/pdf');
    pdfStream.pipe(res);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});