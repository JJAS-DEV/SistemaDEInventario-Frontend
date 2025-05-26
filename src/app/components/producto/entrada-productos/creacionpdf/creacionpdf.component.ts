import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


// --- INICIO DE CONFIGURACIÓN DE PDFMAKE ---


@Component({
  selector: 'app-creacionpdf',
  standalone: true,
  imports: [],
  templateUrl: './creacionpdf.component.html',
  styleUrl: './creacionpdf.component.css'
})

export class CreacionpdfComponent  {

  
    generatePDF() {
    const doc = new jsPDF();
    let currentY = 20; // posición vertical inicial

    // Título
    doc.setFontSize(14);
    doc.text('Información de Entrada', 14, currentY);
    currentY += 5;

    // Tabla de información (hora, proveedor, registrado por)
    autoTable(doc, {
      startY: currentY,
      head: [['Hora de llegada', 'Proveedor', 'Registrado por']],
      body: [['08:30 AM', 'Muebles ABC Ltda', 'Jonathan Ayona']],
      theme: 'grid',
      styles: { halign: 'center' },
      didDrawPage: (data) => {
         if (data.cursor) {
    currentY = data.cursor.y + 10;
  } // actualizamos currentY al finalizar la tabla
      }
    });

    // Tabla de productos
    const productos: any[] = [];
    for (let i = 1; i <= 25; i++) {
      productos.push([`Producto ${i}`, `${i * 2}`, `$${i * 100}`]);
    }

    doc.setFontSize(14);
    doc.text('Detalle de Productos', 14, currentY);
    currentY += 5;

    autoTable(doc, {
      startY: currentY,
      head: [['Producto', 'Cantidad', 'Precio']],
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

    doc.save('entrada-productos.pdf');
  }

}


