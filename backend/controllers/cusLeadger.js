const PDFDocument = require("pdfkit");
const { getLedgerData } = require("../services/cusLeader");
require("pdfkit-table");

const exportLedgerPdf = async (req, res) => {
  try {
    const { sellData, stockData, repairData } = await getLedgerData(req);

    // Initialize PDF document
    const doc = new PDFDocument({ margin: 30, size: "A4" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=customer_ledger.pdf"
    );
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    // Title of the PDF document
    doc.fontSize(20).text("Customer Ledger", { align: "center" }).moveDown();

    // Function to render table with a polished layout
    const renderTable = (title, data) => {
      if (!Array.isArray(data) || data.length === 0) {
        doc.fontSize(12).text(`${title} has no data.`).moveDown();
        return;
      }

      // Add title for the section
      doc.fontSize(16).text(title, { underline: true }).moveDown(0.5);

      // Define the headers for the table
      const headers = [
        "#",
        "Customer",
        "Model",
        "Device",
        "Total",
        "Paid",
        "Remaining",
        "Estimated Cost",
      ];

      // Map data to rows
      const rows = data.map((item, index) => {
        const paid =
          item.customerPaid !== undefined || item.paidToCustomer !== undefined
            ? item.customerPaid ?? item.paidToCustomer
            : "-";
        return [
          index + 1,
          item.customerName?.customerName || "N/A",
          item.modelName?.modelName || "N/A",
          item.deviceName?.deviceName || "N/A",
          item.amount || item.totalAmount || "N/A",
          paid,
          item.remainingAmount !== undefined ? item.remainingAmount : "-",
          item.estimatedCost !== undefined ? item.estimatedCost : "-",
        ];
      });

      // Add the table using pdfkit-table plugin
      doc.table(
        {
          headers,
          rows,
        },
        {
          prepareHeader: () => doc.font("Helvetica-Bold").fontSize(11),
          prepareRow: (row, i) => doc.font("Helvetica").fontSize(10),
          padding: 5,
          columnSpacing: 10,
          align: [
            "center",
            "left",
            "left",
            "left",
            "right",
            "right",
            "right",
            "right",
          ], // Align columns properly
          width: [40, 120, 120, 120, 100, 100, 100, 100], // Adjust column widths to make it more readable
        }
      );

      // Ensure that if content overflows, we create a new page
      if (doc.y > doc.page.height - 100) {
        doc.addPage();
      }

      doc.moveDown();
    };

    // Log the data lengths to verify the data fetched
    console.log("Sell:", sellData.length);
    console.log("Stock:", stockData.length);
    console.log("Repair:", repairData.length);

    // Render tables for each data category
    renderTable("Sell Ledger", sellData);
    renderTable("Stock Ledger", stockData);
    renderTable("Repair Ledger", repairData);

    // Finish and close the document
    doc.end();
  } catch (err) {
    console.error("Export PDF Error:", err);
    res.status(500).send("Failed to export PDF.");
  }
};

module.exports = {
  exportLedgerPdf,
};
