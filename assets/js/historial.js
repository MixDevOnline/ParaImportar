function guardarEnHistorial(){let e=JSON.parse(localStorage.getItem("historial"))||[],a=parseFloat($('input[name="valor"]').val()||0),t=parseFloat($('input[name="costo"]').val()||0),o=$('select[name="anuales"]').val(),s=parseFloat($('input[name="tasa"]').val()),r=parseFloat($("#bancoSelect").val()||0),n=parseFloat($('input[name="descuento"]').val()||0),i=$("#total").text(),l=$("#bancoSelect option:selected").text(),c=parseFloat($("#vep").text().replace(/[^\d,]/g,"").replace(/(\d{3}),/g,"$1.")),p=parseFloat($("#excedente").text().replace(/[^\d,]/g,"").replace(/(\d{3}),/g,"$1.")),d=$("#valores").val(),m=[];["montoSinImpuestos","impPais","impGanancia","impBienesPersonales","vep","excedente",].forEach(e=>{if(!d.includes(e))switch(e){case"montoSinImpuestos":m.push("Sin Monto sin Impuestos");break;case"impPais":m.push("Sin Imp. Pais");break;case"impGanancia":m.push("Sin Imp. Ganancias");break;case"impBienesPersonales":m.push("Sin Imp. Bienes Personales");break;case"vep":m.push("Sin VEP");break;case"excedente":m.push("Sin Excedente")}});let u={valorProducto:a,costoEnvio:t,anuales:o,tasa:s,valorDolar:r,descuento:n,total:i,banco:l,vep:c,valoresSeleccionados:d,excedente:p,valores:m.join(", "),fecha:new Date().toLocaleString("es-ES",{day:"numeric",month:"numeric",year:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})};e.push(u),localStorage.setItem("historial",JSON.stringify(e))}function cargarHistorial(){let e=JSON.parse(localStorage.getItem("historial"))||[],a=document.getElementById("historial");if(a.innerHTML="",0===e.length){a.innerHTML="<p>No hay registros en el historial</p>";return}e.sort((e,a)=>new Date(a.fecha)-new Date(e.fecha)),e.forEach((t,o)=>{let s=document.createElement("div");s.classList.add("card"),s.innerHTML=`
              <div class="card-header" style="background-color: #fd9900;">
                  <p class="card-header-title" style="color: white;">C\xe1lculo realizado el ${t.fecha}</p>
              </div>
              <div class="card-content">
                  <div class="content">
                      <p><strong>Valor del Producto:</strong> US${formatoMoneda.format(t.valorProducto)}</p>
                      <p><strong>Banco Usado:</strong> ${t.banco} (Valor del D\xf3lar: AR${formatoMoneda.format(t.valorDolar)})</p>
                      <p><strong>Descuento: </strong> US${formatoMoneda.format(t.descuento)}</p>
                      <p><strong>Costo de Env\xedo: </strong> US${formatoMoneda.format(t.costoEnvio)}</p>
                      <p><strong>Realiz\xf3 m\xe1s de 12 compras este a\xf1o?: </strong> ${t.anuales.charAt(0).toUpperCase()+t.anuales.slice(1)}</p>
                      <p><strong>Tasa del Correo: </strong> AR$ ${t.tasa}</p>
                      <p><strong>Detalle: </strong> ${t.valores}</p>
                  </div>
              </div>
              <footer class="card-footer">
                  <p class="card-footer-item"><strong>Total: ${t.total}</strong></p>
                  <a href="#" class="card-footer-item" onclick="usarHistorial(${o})"><i class="fa-solid fa-file-import"></i>&nbsp;Importar este valor</i></a>
              </footer>
          `,o!==e.length-1&&s.classList.add("mb-4"),a.appendChild(s)})}function borrarHistorial(){localStorage.removeItem("historial"),cargarHistorial()}function usarHistorial(e){let a=JSON.parse(localStorage.getItem("historial"))[e];$('input[name="valor"]').val(a.valorProducto),$('input[name="costo"]').val(a.costoEnvio),$('select[name="anuales"]').val(a.anuales),$('input[name="tasa"]').val(a.tasa),$("#bancoSelect option:contains("+a.banco+")").prop("selected",!0).trigger("change"),$('input[name="descuento"]').val(a.descuento),$("#valores").val(a.valoresSeleccionados).trigger("change"),$("#esHistorial").val("true"),calcularTotal(),$("#history").removeClass("is-active"),$("html").removeClass("is-clipped")}