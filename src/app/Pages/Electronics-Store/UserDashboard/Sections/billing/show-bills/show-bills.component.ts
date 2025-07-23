import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SalesProductService } from '../../../../../../Services/Billing/sales-product.service';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

@Component({
  selector: 'app-show-bills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-bills.component.html',
  styleUrl: './show-bills.component.css'
})
export class ShowBillsComponent implements OnInit {

  billings: any[] = [];

  constructor(private customerService: SalesProductService) {}

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe((data) => {
      this.billings = data;
      console.log(data);
    });
  }

  async previewPDF(billing: any) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 10;
    let y = 800;

    // Title
    page.drawText('Invoice Summary', {
      x: 50,
      y,
      size: fontSize + 2,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });

    y -= 40;

    // Dynamic customer details
    page.drawText(`Invoice no: ${billing.customerId}`, { x: 50, y, size: fontSize, font });
    y -= 15;
    page.drawText(`Date: ${billing.billDate}`, { x: 50, y, size: fontSize, font });
    y -= 15;
    page.drawText(`Customer Name: ${billing.name}`, { x: 50, y, size: fontSize, font });

    y -= 30;

    const backgroundColor = rgb(0.9, 0.9, 0.9);
    const headerHeight = 18;
    const headerY = y - 4;

    page.drawRectangle({
      x: 40,
      y: headerY,
      width: 515,
      height: headerHeight,
      color: backgroundColor,
    });

    page.drawText('Name', { x: 50, y, size: fontSize, font });
    page.drawText('Price', { x: 150, y, size: fontSize, font });
    page.drawText('Qty', { x: 210, y, size: fontSize, font });
    page.drawText('Net Amt', { x: 260, y, size: fontSize, font });
    page.drawText('GST Type', { x: 330, y, size: fontSize, font });
    page.drawText('GST %', { x: 400, y, size: fontSize, font });
    page.drawText('GST Amt', { x: 450, y, size: fontSize, font });
    page.drawText('Amount', { x: 510, y, size: fontSize, font });

    y -= 18;

    billing.customerProductList.forEach((product: any) => {
      page.drawText(product.name.toString(), { x: 50, y, size: fontSize, font });
      page.drawText(product.price.toFixed(2), { x: 150, y, size: fontSize, font });
      page.drawText(product.quantity.toString(), { x: 210, y, size: fontSize, font });
      page.drawText(product.netAmount.toFixed(2), { x: 260, y, size: fontSize, font });
      page.drawText(product.gstType, { x: 330, y, size: fontSize, font });
      page.drawText(`${product.gstRate}%`, { x: 400, y, size: fontSize, font });
      page.drawText(product.gstAmount.toFixed(2), { x: 450, y, size: fontSize, font });
      page.drawText(product.totalAmount.toFixed(2), { x: 510, y, size: fontSize, font });
      y -= 15;
    });

    page.drawLine({
      start: { x: 40, y },
      end: { x: 560, y },
      thickness: 0.6,
      color: rgb(0, 0, 0),
    });

    y -= 20;

    page.drawText(`Total: ${billing.totalAmount.toFixed(2)}`, {
      x: 410,
      y,
      size: fontSize + 1,
      font,
      color: rgb(0, 0, 0.8),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
}
