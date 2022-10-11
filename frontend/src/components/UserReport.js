import jsPDF from "jspdf";

import "jspdf-autotable";

const generatePDF = (report) => {
  // initialize jsPDF
  console.log(report);
  const doc = new jsPDF();

  // define the columns we want and their titles

  const tableColumn = [
    "Number",
    "Name",
    "Email",
    "NIC Number",
  ];

  // define an empty array of rows

  const tableRows = [];

  // for each ticket pass all its data into an array

  let no = 0;

  report.forEach((report) => {
    no++;
    

    const reportData = [
      no,
      report.name,
      report.email,
      report.nic
     
    ];

    // push each tickcet's info into a row

    tableRows.push(reportData);
  });

  //startY is basically margin-top
  var img = new Image();
  img.src =
    "https://res.cloudinary.com/dl99x/image/upload/v1665252716/Report_image_t36ow7.jpg";
  doc.addImage(img, "jpg", 3, 3, 200, 60);

  //doc.autoTable(tableColumn, tableRows, { startY: 70 });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    headerStyles: {
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
      fillColor: [168, 168, 168],
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

  doc.setFontSize(12);

  // we define the name of our PDF file.

  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
