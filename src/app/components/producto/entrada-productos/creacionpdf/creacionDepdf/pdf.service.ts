import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { EntradaProductos } from '../../../../../models/productoEntrada';
import { SalidadProducto } from '../../../../../models/SalidadProducto';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }
generatepdfDeEntrada(  entrada: EntradaProductos){
      const doc = new jsPDF();

    let currentY = 20; // posición vertical inicial
    const pageCenterX = doc.internal.pageSize.getWidth() / 2;

    // Título
    doc.setFontSize(14);
    doc.text("Reporte de Entrada", pageCenterX, currentY, { align: 'center' });
    currentY += 5;

    doc.text("detalle movimiento", 14, currentY);




    currentY += 5;
    const fecha = new Date(entrada.fecha);

    const fechaFormateada = fecha.toLocaleDateString('es-CL'); // Ej: 22-05-2025
    const horaFormateada = fecha.toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',

    });

    autoTable(doc, {
      startY: currentY,
      head: [['fecha', 'Hora de entradad', 'Registrado por']],
      body: [[fechaFormateada, horaFormateada, entrada.responsable]],
      theme: 'grid',
      styles: { halign: 'center' },
      didDrawPage: (data) => {
        if (data.cursor) {
          currentY = data.cursor.y + 10;
        } // actualizamos currentY al finalizar la tabla
      }
    });

    // Tabla de productos
    const productos: any = entrada.productos.map(item => [
      item.producto.nombre,
      item.producto.proveedor.nombre,
      item.cantidad,
      item.producto.precio,
      item.totalPorProducto,


    ]);
    doc.setFontSize(14);
    doc.text('lista de Productos', 14, currentY);
    currentY += 5;
 autoTable(doc, {
    
      startY: currentY,
      head: [['Producto','proveedor', 'Cantidad de entradad','Precio unitario', 'precio total']],
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
const totalFormateado =  entrada.totalEngeneral.toLocaleString('es-CL', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

const finalY = (doc as any).lastAutoTable.finalY + 10; // +10 para un poco de espacio

    doc.text("Valor Total de Entrada: "+totalFormateado+" $", 14, finalY);
    doc.save('entrada-productos.pdf');


}


generatepdfDeSalidad(  salidad: SalidadProducto){
  const doc = new jsPDF();

   let currentY = 20; // posición vertical inicial
    const pageCenterX = doc.internal.pageSize.getWidth() / 2;

    // Título
    doc.setFontSize(14);
    doc.text("Reporte de salidad", pageCenterX, currentY, { align: 'center' });
    currentY += 5;

    doc.text("detalle movimiento", 14, currentY);




    currentY += 5;
    const fecha = new Date(salidad.fecha);

    const fechaFormateada = fecha.toLocaleDateString('es-CL'); // Ej: 22-05-2025
    const horaFormateada = fecha.toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',

    });
autoTable(doc, {
      startY: currentY,
      head: [['fecha', 'Hora de entradad', 'Registrado por']],
      body: [[fechaFormateada, horaFormateada, salidad.usuarioResponsable]],
      theme: 'grid',
      styles: { halign: 'center' },
      didDrawPage: (data) => {
        if (data.cursor) {
          currentY = data.cursor.y + 10;
        } // actualizamos currentY al finalizar la tabla
      }
    });  

    const productos: any = salidad.productos.map(item => [
      item.producto.nombre,
      item.producto.proveedor.nombre,


      item.cantidad,
      item.producto.precio,
      item.totalPorPRoducto


    ]);
    doc.setFontSize(14);
    doc.text('lista de Productos', 14, currentY);
    currentY += 5;
autoTable(doc, {
    
      startY: currentY,
      head: [['Producto','proveedor', 'Cantidad de entradad','Precio unitario', 'precio total']],
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
const totalFormateado =  salidad.totalGeneral.toLocaleString('es-CL', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

const finalY = (doc as any).lastAutoTable.finalY + 10; // +10 para un poco de espacio

    doc.text("Valor Total de Entrada: "+totalFormateado+" $", 14, finalY);
    doc.save('salidad-productos.pdf');
  
  



  
}


}
