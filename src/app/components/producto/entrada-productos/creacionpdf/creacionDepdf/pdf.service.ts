import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }



  generatePDF(data: any[], Movimiento: string, hora: any, nmr: number) {
    const doc = new jsPDF();
    let currentY = 20; // posición vertical inicial
    const pageCenterX = doc.internal.pageSize.getWidth() / 2;

    // Título
    doc.setFontSize(14);
    doc.text(Movimiento, pageCenterX, currentY, { align: 'center' });
    currentY += 5;

    doc.text("detalle movimiento", 14, currentY);




    currentY += 5;
    const fecha = new Date(hora.fecha);

    const fechaFormateada = fecha.toLocaleDateString('es-CL'); // Ej: 22-05-2025
    const horaFormateada = fecha.toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',

    });

    // Tabla de información (hora, proveedor, registrado por)
        if (nmr === 0) {

    autoTable(doc, {
      startY: currentY,
      head: [['fecha', 'Hora de entradad', 'Registrado por']],
      body: [[fechaFormateada, horaFormateada, hora.responsable]],
      theme: 'grid',
      styles: { halign: 'center' },
      didDrawPage: (data) => {
        if (data.cursor) {
          currentY = data.cursor.y + 10;
        } // actualizamos currentY al finalizar la tabla
      }
    });

    // Tabla de productos
    const productos: any[] = data.map(item => [
      item.producto.nombre,
      item.cantidad,
      item.producto.precio,
      item.producto.proveedor.nombre


    ]);
    doc.setFontSize(14);
    doc.text('lista de Productos', 14, currentY);
    currentY += 5;
 autoTable(doc, {
    
      startY: currentY,
      head: [['Producto', 'Cantidad de entradad','Precio', 'proveedor']],
      body: productos,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 102, 204], // azul (RGB)
        textColor: 255,           // texto blanco
        fontStyle: 'bold'
      },
      styles: { halign: 'center' },
      margin: { top: 10 },
      didDrawPage: (data) => {
        // Pie de página con número de página
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(10);
        doc.text(
          `Página ${data.pageNumber}`,
          14,
          pageHeight - 10
        );
      }
    });

    }

    if(nmr===1){
       autoTable(doc, {
      startY: currentY,
      head: [['fecha', 'Hora de salidad', 'Registrado por']],
      body: [[fechaFormateada, horaFormateada, hora.usuarioResponsable]],
      theme: 'grid',
      styles: { halign: 'center' },
      didDrawPage: (data) => {
        if (data.cursor) {
          currentY = data.cursor.y + 10;
        } // actualizamos currentY al finalizar la tabla
      }
    });

    // Tabla de productos
    const productos: any[] = data.map(item => [
      item.producto.nombre,
      item.cantidad,
      item.producto.precio,
      item.producto.proveedor.nombre


    ]);
    doc.setFontSize(14);
    doc.text('lista de Productos', 14, currentY);
    currentY += 5;
 autoTable(doc, {
    
      startY: currentY,
      head: [['Producto', 'Cantidad de salidad','Precio', 'proveedor']],
      body: productos,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 102, 204], // azul (RGB)
        textColor: 255,           // texto blanco
        fontStyle: 'bold'
      },
      styles: { halign: 'center' },
      margin: { top: 10 },
      didDrawPage: (data) => {
        // Pie de página con número de página
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(10);
        doc.text(
          `Página ${data.pageNumber}`,
          14,
          pageHeight - 10
        );
      }
    });
      
    }

    doc.save('entrada-productos.pdf');
  }

}
