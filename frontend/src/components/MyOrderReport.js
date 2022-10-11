import jsPDF from "jspdf";

import "jspdf-autotable";

const generatePDF = (report) => {
  // initialize jsPDF

  const doc = new jsPDF();

  // define the columns we want and their titles

  const tableColumn = [
    "No",
    "Service Name",
    "Service Provider Name",
    "Amount (Rs.)",
  ];

  // define an empty array of rows

  const tableRows = [];

  // for each ticket pass all its data into an array

  let no = 0;
  let total = 0;

  report.forEach((report) => {
    no++;
    //get only accepted orders
    if (report.orderStatus === "accept") {
      const reportData = [
        no,
        report.serviceTitle,
        report.firstName + " " + report.lastName,
        report.amount,
      ];
      total = total + report.amount;
      tableRows.push(reportData);
    }
  });

  // total += report.amount;

  //   const reportData = [
  //     no,
  //     report.serviceTitle,
  //     report.firstName + " " + report.lastName,
  //     report.amount,

  //   // called date-fns to format the date on the report

  //   // format(new Date(report.updated_at), "yyyy-MM-dd")
  // ];

  // push each tickcet's info into a row

  //     tableRows.push(reportData);
  //   });
  console.log("total", total);

  // startY is basically margin-top
  var img = new Image();
  img.src =
    "https://res.cloudinary.com/waste123/image/upload/v1665403969/Classy/x0kgsldfpspqarh9rko6.png";
  doc.addImage(img, "png", 10, 10, 180, 50);

  //doc.autoTable(tableColumn, tableRows, { startY: 70 });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    headerStyles: {
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
      fillColor: [255, 140, 0],
    },
    bodyStyles: {
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
      fillColor: [255, 255, 255],
    },
    startY: 70,
  });

  const date = Date().split(" ");

  // we use a date string to generate our filename.

  const dateStr = date[2] + date[3] + date[4];

  // ticket title. and margin-top + margin-left

  //doc.text("Marking Scheme", 80, 15);

  doc.setFontSize(15);

  doc.text(
    "Total Amount : " + " Rs." + total,
    140,
    doc.lastAutoTable.finalY + 10
  );

  // we define the name of our PDF file.

  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
