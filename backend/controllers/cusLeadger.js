const PDFDocument = require("pdfkit-table");
const { getLedgerData } = require("../services/cusLeader");
require("pdfkit-table");

const exportLedgerPdf = async (req, res) => {
  try {
    const { sellData, stockData, repairData } = await getLedgerData(req);

    // Initialize PDF document
    const doc = new PDFDocument({ margin: 20, size: "A4" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=customer_ledger.pdf"
    );
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    // Title
    doc.fontSize(20).text("Customer Ledger", { align: "center" }).moveDown(1);

    // Table rendering function
    const renderTable = (title, data) => {
      if (!Array.isArray(data) || data.length === 0) {
        doc.fontSize(12).text(`${title} has no data.`).moveDown();
        return;
      }

      // Section title
      doc.fontSize(16).text(title, { underline: true }).moveDown(0.5);

      // Define headers
      const headers = [
        { label: "#", property: "index", width: 30, align: "center" },
        { label: "Customer", property: "customer", width: 100 },
        { label: "Model", property: "model", width: 80 },
        { label: "Device", property: "device", width: 80 },
        { label: "Total", property: "total", width: 70, align: "right" },
        { label: "Paid", property: "paid", width: 70, align: "right" },
        {
          label: "Remaining",
          property: "remaining",
          width: 70,
          align: "right",
        },
        {
          label: "Estimated",
          property: "estimated",
          width: 70,
          align: "right",
        },
      ];

      // Format data into object-based rows
      const datas = data.map((item, i) => ({
        index: i + 1,
        customer: item.customerName?.customerName || "N/A",
        model: item.modelName?.modelName || "N/A",
        device: item.deviceName?.deviceName || "N/A",
        total: item.amount || item.totalAmount || "-",
        paid:
          item.customerPaid !== undefined || item.paidToCustomer !== undefined
            ? item.customerPaid ?? item.paidToCustomer
            : "-",
        remaining:
          item.remainingAmount !== undefined ? item.remainingAmount : "-",
        estimated: item.estimatedCost !== undefined ? item.estimatedCost : "-",
      }));

      // Debug log
      console.log(`${title} rows:`, datas.length);
      if (datas.length > 0) console.log("First row:", Object.values(datas[0]));

      // Draw the table
      doc.table(
        {
          headers,
          datas,
        },
        {
          width: doc.page.width - doc.options.margin * 2,
          prepareHeader: () =>
            doc.font("Helvetica-Bold").fontSize(10).fillColor("black"),
          prepareRow: () =>
            doc.font("Helvetica").fontSize(9).fillColor("black"),
          columnSpacing: 2,
          padding: 2,
        }
      );

      doc.moveDown();
    };

    // Ensure space for first table
    if (doc.y > doc.page.height - 300) {
      doc.addPage();
    }

    // Render all ledgers
    renderTable("Sell Ledger", sellData);
    renderTable("Stock Ledger", stockData);
    renderTable("Repair Ledger", repairData);

    // Finalize PDF
    doc.end();
  } catch (err) {
    console.error("Export PDF Error:", err);
    res.status(500).send("Failed to export PDF.");
  }
};

module.exports = {
  exportLedgerPdf,
};

/**
 * You need to install on terminal (node.js):
 * -----------------------------------------------------
 * $ npm install pdfkit-table
 * -----------------------------------------------------
 * Run this file:
 * -----------------------------------------------------
 * $ node index-example.js
 * -----------------------------------------------------
 *
 */

// const fs = require("fs");
// const PDFDocument = require("pdfkit-table");

// // start pdf document
// let doc = new PDFDocument({ margin: 30, size: "A4" });
// // to save on server
// doc.pipe(fs.createWriteStream("./document.pdf"));

// // -----------------------------------------------------------------------------------------------------
// // Simple Table with Array
// // -----------------------------------------------------------------------------------------------------
// const tableArray = {
//   headers: ["Country", "Conversion rate", "Trend"],
//   rows: [
//     ["Switzerland", "12%", "+1.12%"],
//     ["France", "67%", "-0.98%"],
//     ["England", "33%", "+4.44%"],
//   ],
// };
// doc.table(tableArray, { width: 300 }); // A4 595.28 x 841.89 (portrait) (about width sizes)

// // move to down
// doc.moveDown(); // separate tables

// // -----------------------------------------------------------------------------------------------------
// // Complex Table with Object
// // -----------------------------------------------------------------------------------------------------
// // A4 595.28 x 841.89 (portrait) (about width sizes)
// const table = {
//   headers: [
//     { label: "Name", property: "name", width: 60, renderer: null },
//     {
//       label: "Description",
//       property: "description",
//       width: 150,
//       renderer: null,
//     },
//     { label: "Price 1", property: "price1", width: 100, renderer: null },
//     { label: "Price 2", property: "price2", width: 100, renderer: null },
//     { label: "Price 3", property: "price3", width: 80, renderer: null },
//     {
//       label: "Price 4",
//       property: "price4",
//       width: 63,
//       renderer: (value, indexColumn, indexRow, row) => {
//         return `U$ ${Number(value).toFixed(2)}`;
//       },
//     },
//   ],
//   datas: [
//     {
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas. ",
//       price1: "$1",
//       price3: "$ 3",
//       price2: "$2",
//       price4: "4",
//       name: "Name 1",
//     },
//     {
//       name: "bold:Name 2",
//       description: "bold:Lorem ipsum dolor.",
//       price1: "bold:$1",
//       price3: "$3",
//       price2: "$2",
//       price4: "4",
//       options: { fontSize: 10, separation: true },
//     },
//     {
//       name: "Name 3",
//       description: "Lorem ipsum dolor.",
//       price1: "bold:$1",
//       price4: "4.111111",
//       price2: "$2",
//       price3: { label: "PRICE $3", options: { fontSize: 12 } },
//     },
//   ],
//   rows: [
//     [
//       "Apple",
//       "Nullam ut facilisis mi. Nunc dignissim ex ac vulputate facilisis.",
//       "$ 105,99",
//       "$ 105,99",
//       "$ 105,99",
//       "105.99",
//     ],
//     [
//       "Tire",
//       "Donec ac tincidunt nisi, sit amet tincidunt mauris. Fusce venenatis tristique quam, nec rhoncus eros volutpat nec. Donec fringilla ut lorem vitae maximus. Morbi ex erat, luctus eu nulla sit amet, facilisis porttitor mi.",
//       "$ 105,99",
//       "$ 105,99",
//       "$ 105,99",
//       "105.99",
//     ],
//   ],
// };

// doc.table(table, {
//   prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
//   prepareRow: (row, indexColumn, indexRow, rectRow) => {
//     doc.font("Helvetica").fontSize(8);
//     indexColumn === 0 &&
//       doc.addBackground(rectRow, indexRow % 2 ? "blue" : "green", 0.15);
//   },
// });

// doc.moveDown(1);

// const tableArrayColor = {
//   headers: ["Country", "Conversion rate", "Trend"],
//   rows: [
//     ["Switzerland", "12%", "+1.12%"],
//     ["France", "67%", "-0.98%"],
//     ["Brazil", "88%", "2.77%"],
//   ],
// };
// doc.table(tableArrayColor, {
//   width: 400,
//   x: 150,
//   columnsSize: [200, 100, 100],

//   prepareRow: (row, indexColumn, indexRow, rectRow) => {
//     doc.font("Helvetica").fontSize(10);
//     indexColumn === 0 &&
//       doc.addBackground(rectRow, indexRow % 2 ? "red" : "green", 0.5);
//   },
// }); // A4 595.28 x 841.89 (portrait) (about width sizes)

// // if your run express.js server:
// // HTTP response only to show pdf
// // doc.pipe(res);

// // done
// doc.end();
