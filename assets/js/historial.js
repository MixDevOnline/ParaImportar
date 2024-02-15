function guardarEnHistorial(){let e=JSON.parse(localStorage.getItem("historial"))||[],a=parseFloat($('input[name="valor"]').val()||0),t=parseFloat($('input[name="costo"]').val()||0),o=$("#moneda").val(),s=$('select[name="anuales"]').val(),n=parseFloat($('input[name="tasa"]').val()),r=parseFloat($("#bancoSelect").val()||0),i=parseFloat($('input[name="descuento"]').val()||0),l=$("#total").text(),c=$("#bancoSelect option:selected").text(),p=parseFloat($("#vep").text().replace(/[^\d,]/g,"").replace(/(\d{3}),/g,"$1.")),d=parseFloat($("#excedente").text().replace(/[^\d,]/g,"").replace(/(\d{3}),/g,"$1.")),m=$("#valores").val(),u=[];["montoSinImpuestos","impPais","impGanancia","impBienesPersonales","vep","excedente",].forEach(e=>{if(!m.includes(e))switch(e){case"montoSinImpuestos":u.push("Sin Monto sin Impuestos");break;case"impPais":u.push("Sin Imp. Pais");break;case"impGanancia":u.push("Sin Imp. Ganancias");break;case"impBienesPersonales":u.push("Sin Imp. Bienes Personales");break;case"vep":u.push("Sin VEP");break;case"excedente":u.push("Sin Excedente")}});let g={valorProducto:a,costoEnvio:t,moneda:o,anuales:s,tasa:n,valorDolar:r,descuento:i,total:l,banco:c,vep:p,valoresSeleccionados:m,excedente:d,valores:u.join(", "),fecha:new Date().toLocaleString("es-ES",{day:"numeric",month:"numeric",year:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})};e.push(g),localStorage.setItem("historial",JSON.stringify(e))}function cargarHistorial(){let e=JSON.parse(localStorage.getItem("historial"))||[],a=document.getElementById("historial");if(a.innerHTML="",0===e.length){a.innerHTML="<p>No hay registros en el historial</p>";return}for(let t=e.length-1;t>=0;t--){let o=e[t],s=document.createElement("div");s.classList.add("card"),s.innerHTML=`
              <div class="card-header" style="background-color: #fd9900;">
                  <p class="card-header-title" style="color: white;">C\xe1lculo realizado el ${o.fecha}</p>
              </div>
              <div class="card-content">
                  <div class="content">
                      <p><strong>Valor del Producto:</strong> ${o.moneda||"USD"}${formatoMoneda.format(o.valorProducto)}</p>
                      <p><strong>Banco Usado:</strong> ${o.banco} (Valor del D\xf3lar: AR${formatoMoneda.format(o.valorDolar)})</p>
                      <p><strong>Descuento: </strong> ${o.moneda}${formatoMoneda.format(o.descuento)}</p>
                      <p><strong>Costo de Env\xedo: </strong> ${o.moneda}${formatoMoneda.format(o.costoEnvio)}</p>
                      <p><strong>Realiz\xf3 m\xe1s de 12 compras este a\xf1o?: </strong> ${o.anuales.charAt(0).toUpperCase()+o.anuales.slice(1)}</p>
                      <p><strong>Tasa del Correo: </strong> AR$ ${o.tasa}</p>
                      <p><strong>Detalle: </strong> ${o.valores}</p>
                  </div>
              </div>
              <footer class="card-footer">
                  <p class="card-footer-item"><strong>Total: ${o.total}</strong></p>
                  <a href="#" class="card-footer-item" onclick="usarHistorial(${t})"><i class="fa-solid fa-file-import"></i>&nbsp;Importar este valor</i></a>
              </footer>
          `,t!==e.length&&s.classList.add("mb-4"),a.appendChild(s)}}function borrarHistorial(){localStorage.removeItem("historial"),cargarHistorial()}function usarHistorial(e){let a=JSON.parse(localStorage.getItem("historial"))[e];$('input[name="valor"]').val(a.valorProducto),$('input[name="costo"]').val(a.costoEnvio),$('select[name="anuales"]').val(a.anuales),$('input[name="tasa"]').val(a.tasa),$("#moneda option:contains("+a.moneda+")").prop("selected",!0).trigger("change"),$("#bancoSelect option:contains("+a.banco+")").prop("selected",!0).trigger("change"),$('input[name="descuento"]').val(a.descuento),$("#valores").val(a.valoresSeleccionados).trigger("change"),$("#esHistorial").val("true"),calcularTotal(),$("#history").removeClass("is-active"),$("html").removeClass("is-clipped")}