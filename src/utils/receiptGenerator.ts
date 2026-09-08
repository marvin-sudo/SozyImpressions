import { jsPDF } from 'jspdf';
import { AdminOrder } from '../types/admin';
import { COMPANY_INFO } from '../data/mockData';

/**
 * Builds a professional branded PDF receipt for SozyImpressions
 */
export const buildReceiptDoc = (order: AdminOrder): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let y = 14;

  // 1. Top Decorative Brand Bar (Navy & Pink)
  doc.setFillColor(45, 48, 148); // #2D3094 Navy
  doc.rect(0, 0, pageWidth, 6, 'F');
  doc.setFillColor(237, 0, 140); // #ED008C Pink
  doc.rect(pageWidth - 45, 0, 45, 6, 'F');

  // 2. Company Brand Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(45, 48, 148);
  doc.text('SOZYIMPRESSIONS LTD', margin, y + 10);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(237, 0, 140);
  doc.text('WE BUILD BRANDS THAT STAND OUT.', margin, y + 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(90, 95, 110);
  doc.text(`${COMPANY_INFO.address}`, margin, y + 20);
  doc.text(`Phone: ${COMPANY_INFO.phone} | WhatsApp: ${COMPANY_INFO.whatsapp}`, margin, y + 24);
  doc.text(`Email: ${COMPANY_INFO.email} | Web: ${COMPANY_INFO.website}`, margin, y + 28);

  // 3. Document Title Badge (Right-aligned)
  doc.setFillColor(245, 247, 252);
  doc.roundedRect(pageWidth - margin - 65, y + 5, 65, 24, 2, 2, 'F');
  doc.setDrawColor(45, 48, 148);
  doc.setLineWidth(0.3);
  doc.roundedRect(pageWidth - margin - 65, y + 5, 65, 24, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(45, 48, 148);
  doc.text('OFFICIAL RECEIPT', pageWidth - margin - 60, y + 13);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(90, 95, 110);
  doc.text(`Receipt #: ${order.orderNumber || order.id}`, pageWidth - margin - 60, y + 19);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`, pageWidth - margin - 60, y + 24);

  y += 36;

  // Thin separator
  doc.setDrawColor(225, 230, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // 4. Two-Column Info Cards: Customer Details & Order Details
  const colWidth = (pageWidth - margin * 2 - 6) / 2;

  // Left Box: Customer Info
  doc.setFillColor(248, 249, 252);
  doc.roundedRect(margin, y, colWidth, 34, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(45, 48, 148);
  doc.text('CUSTOMER INFORMATION', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(40, 45, 60);
  doc.text(`Name: ${order.customerName}`, margin + 4, y + 12);
  if (order.companyName) {
    doc.text(`Company: ${order.companyName}`, margin + 4, y + 17);
  }
  doc.text(`Phone: ${order.customerPhone}`, margin + 4, order.companyName ? y + 22 : y + 17);
  doc.text(`Email: ${order.customerEmail}`, margin + 4, order.companyName ? y + 27 : y + 22);
  doc.text(`Delivery: ${order.deliveryAddress}`, margin + 4, order.companyName ? y + 32 : y + 27, { maxWidth: colWidth - 8 });

  // Right Box: Order & Payment Info
  const rightX = margin + colWidth + 6;
  doc.setFillColor(248, 249, 252);
  doc.roundedRect(rightX, y, colWidth, 34, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(45, 48, 148);
  doc.text('ORDER & PAYMENT DETAILS', rightX + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(40, 45, 60);
  doc.text(`Order Status: ${order.orderStatus.replace('_', ' ').toUpperCase()}`, rightX + 4, y + 12);
  doc.text(`Payment Method: ${order.paymentMethod}`, rightX + 4, y + 17);
  
  // Payment status badge text
  const isPaid = order.paymentStatus === 'paid';
  doc.setFont('helvetica', 'bold');
  if (isPaid) {
    doc.setTextColor(16, 120, 60); // Green
    doc.text('Payment Status: PAID / CONFIRMED', rightX + 4, y + 22);
  } else {
    doc.setTextColor(200, 100, 20); // Amber
    doc.text(`Payment Status: ${order.paymentStatus.toUpperCase()}`, rightX + 4, y + 22);
  }

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 45, 60);
  if (order.transactionId) {
    doc.text(`Txn / Ref: ${order.transactionId}`, rightX + 4, y + 27);
  }
  doc.text(`Delivery Status: ${order.deliveryStatus ? order.deliveryStatus.toUpperCase() : 'PENDING'}`, rightX + 4, order.transactionId ? y + 32 : y + 27);

  y += 40;

  // 5. Products Table Header
  doc.setFillColor(45, 48, 148);
  doc.rect(margin, y, pageWidth - margin * 2, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);

  const colItem = margin + 4;
  const colQty = margin + 105;
  const colUnit = margin + 125;
  const colTotal = pageWidth - margin - 4;

  doc.text('PRODUCT / DESCRIPTION', colItem, y + 5.5);
  doc.text('QTY', colQty, y + 5.5, { align: 'center' });
  doc.text('UNIT (UGX)', colUnit, y + 5.5, { align: 'right' });
  doc.text('TOTAL (UGX)', colTotal, y + 5.5, { align: 'right' });

  y += 8;

  // 6. Products Table Rows
  const items = order.items || [];
  let isEven = false;

  items.forEach((item) => {
    const itemHeight = 12;
    // Alternate row colors
    if (isEven) {
      doc.setFillColor(250, 251, 254);
      doc.rect(margin, y, pageWidth - margin * 2, itemHeight, 'F');
    }
    isEven = !isEven;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 35, 50);
    const productName = item.product?.name || 'Custom Product';
    doc.text(productName, colItem, y + 5, { maxWidth: 96 });

    // Customization & specs subtitle
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(110, 115, 130);
    const customNotes = [
      item.selectedColor ? `Color: ${item.selectedColor}` : null,
      item.selectedSize ? `Size: ${item.selectedSize}` : null,
      item.customText ? `Text: "${item.customText}"` : null,
      item.customization?.color ? `Color: ${item.customization.color}` : null,
    ].filter(Boolean).join(' | ') || 'Standard Specification';

    doc.text(customNotes, colItem, y + 9.5, { maxWidth: 96 });

    // Qty
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 35, 50);
    doc.text(String(item.quantity), colQty, y + 6, { align: 'center' });

    // Unit Price
    const unitPrice = item.unitPriceUGX || item.product?.priceUGX || 0;
    doc.text(unitPrice.toLocaleString(), colUnit, y + 6, { align: 'right' });

    // Subtotal
    const lineTotal = item.subtotalUGX || (unitPrice * item.quantity);
    doc.setFont('helvetica', 'bold');
    doc.text(lineTotal.toLocaleString(), colTotal, y + 6, { align: 'right' });

    // Row divider
    doc.setDrawColor(240, 242, 248);
    doc.setLineWidth(0.2);
    doc.line(margin, y + itemHeight, pageWidth - margin, y + itemHeight);

    y += itemHeight;
  });

  y += 4;

  // 7. Totals & Financial Calculation Section (Right-aligned)
  const totalBoxWidth = 85;
  const totalBoxX = pageWidth - margin - totalBoxWidth;

  doc.setFillColor(248, 249, 252);
  doc.roundedRect(totalBoxX, y, totalBoxWidth, 38, 2, 2, 'F');
  doc.setDrawColor(225, 230, 240);
  doc.roundedRect(totalBoxX, y, totalBoxWidth, 38, 2, 2, 'D');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(90, 95, 110);
  doc.text('Subtotal:', totalBoxX + 5, y + 7);
  doc.setTextColor(30, 35, 50);
  doc.text(`UGX ${(order.subtotalUGX || 0).toLocaleString()}`, totalBoxX + totalBoxWidth - 5, y + 7, { align: 'right' });

  doc.setTextColor(90, 95, 110);
  doc.text('Delivery Fee:', totalBoxX + 5, y + 14);
  doc.setTextColor(30, 35, 50);
  doc.text(`UGX ${(order.deliveryFeeUGX || 0).toLocaleString()}`, totalBoxX + totalBoxWidth - 5, y + 14, { align: 'right' });

  if (order.discountUGX && order.discountUGX > 0) {
    doc.setTextColor(237, 0, 140);
    doc.text('Promo Discount:', totalBoxX + 5, y + 21);
    doc.text(`- UGX ${order.discountUGX.toLocaleString()}`, totalBoxX + totalBoxWidth - 5, y + 21, { align: 'right' });
  }

  // Grand Total Highlight Bar
  doc.setFillColor(45, 48, 148);
  doc.roundedRect(totalBoxX + 2, y + 26, totalBoxWidth - 4, 10, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('TOTAL PAID (UGX):', totalBoxX + 5, y + 33);
  doc.text(`UGX ${(order.totalUGX || 0).toLocaleString()}`, totalBoxX + totalBoxWidth - 5, y + 33, { align: 'right' });

  // Optional USD reference on the left of totals
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(110, 115, 130);
  if (order.totalUSD) {
    doc.text(`Equivalent USD: ~$${order.totalUSD.toFixed(2)} (Exchange rate: 1 USD ~ 3,800 UGX)`, margin, y + 12);
  }
  doc.text(`Payment Method: ${order.paymentMethod}`, margin, y + 18);
  doc.text(`Payment Status: ${order.paymentStatus.toUpperCase()}`, margin, y + 24);

  y += 48;

  // 8. Official Verification & Notes Box
  doc.setFillColor(255, 253, 245);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 20, 2, 2, 'F');
  doc.setDrawColor(240, 220, 160);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 20, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(150, 100, 20);
  doc.text('PRODUCTION & DELIVERY NOTE:', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 80, 20);
  const noteText = order.notes || order.deliveryInstructions || 'Standard digital proof confirmation applied. High-grade industrial color fidelity checked by SozyImpressions Quality Assurance.';
  doc.text(noteText, margin + 4, y + 11, { maxWidth: pageWidth - margin * 2 - 8 });

  // 9. Mandatory Footer (Section 12 requirement)
  const footerY = pageHeight - 20;
  doc.setDrawColor(225, 230, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(45, 48, 148);
  doc.text('Thank you for choosing SozyImpressions.', pageWidth / 2, footerY, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(237, 0, 140);
  doc.text('We Build Brands That Stand Out.', pageWidth / 2, footerY + 4, { align: 'center' });

  doc.setFontSize(7);
  doc.setTextColor(130, 135, 150);
  doc.text('This receipt is automatically generated and does not require a signature.', pageWidth / 2, footerY + 8, { align: 'center' });

  return doc;
};

/**
 * Downloads the receipt as a PDF file to the client's device
 */
export const downloadReceiptPdf = (order: AdminOrder) => {
  try {
    const doc = buildReceiptDoc(order);
    const filename = `SozyImpressions_Receipt_${order.orderNumber || order.id}.pdf`;
    doc.save(filename);
    return true;
  } catch (err) {
    console.error('Failed to generate/download receipt PDF:', err);
    return false;
  }
};

export const downloadReceiptPDF = downloadReceiptPdf;

/**
 * Opens browser print dialog for the receipt
 */
export const printReceipt = (order: AdminOrder) => {
  try {
    const doc = buildReceiptDoc(order);
    const blobUrl = doc.output('bloburl');
    const printWindow = window.open(blobUrl);
    if (printWindow) {
      printWindow.focus();
    }
    return true;
  } catch (err) {
    console.error('Failed to print receipt:', err);
    return false;
  }
};

export const printReceiptPDF = printReceipt;

/**
 * Generates an object URL for previewing in an iframe/modal
 */
export const getReceiptBlobUrl = (order: AdminOrder): string => {
  const doc = buildReceiptDoc(order);
  return doc.output('bloburl');
};
