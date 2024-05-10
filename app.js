import _ from "https://esm.sh/lodash";
import moment from "https://esm.sh/moment";

const comentarios = [
  "¡Esta delicioso ya me dirá!",
  "¡Es una excelente elección!",
  "¡Muy buena elección!",
  "Va a ser una experiencia única.",
  "Tiene un sabor increíble.",
  "¡Le va a encantar!",
  "¡Para chuparse los dedos!",
  "Una delicia para el paladar.",
  "Perfecto en todos los sentidos."
];

function mostrarComentarioAleatorio() {
  const comentarioAleatorio =
    comentarios[Math.floor(Math.random() * comentarios.length)];
  alert(comentarioAleatorio);
}

const precios = {
  Breakfast: {
    principal: {
      CAFE: 2.5,
      TE: 2,
      COLACAO: 2.5
    },
    acompañamiento: {
      CROISSANT: 1.8,
      TOSTADA: 2,
      CHURROS: 3
    },
    extra: {
      FRUTA: 1.5,
      ZUMO: 3,
      YOGOURT: 1
    }
  },
  Lunch: {
    principal: {
      ENSALADA: 7.5,
      PAELLA: 8,
      PASTA: 6
    },
    acompañamiento: {
      POLLO: 7,
      DORADA: 9,
      LOMO: 7.5
    },
    extra: {
      NARANJA: 1.5,
      PATATAS: 2,
      CAFE: 2
    }
  },
  Dinner: {
    principal: {
      ENSALADA: 8,
      PAELLA: 8.5,
      PASTA: 7
    },
    acompañamiento: {
      POLLO: 8,
      DORADA: 10,
      LOMO: 8
    },
    extra: {
      NARANJA: 2,
      PATATAS: 2.5,
      CAFE: 2.5
    }
  }
};


function main() {
  let horaValida = false;
  let hora;

  while (!horaValida) {
    hora = prompt("Por favor, ingresa la hora en formato HH:MM:");
    if (moment(hora, "HH:mm", true).isValid()) {
      horaValida = true;
    } else {
      alert(
        "Formato de hora incorrecto. Por favor, usa el formato HH:MM."
      );
    }
  }

  let tipoComida;
  if (moment(hora, "HH:mm").isBefore(moment("11:30", "HH:mm"))) {
    tipoComida = "Breakfast";
  } else if (
    moment(hora, "HH:mm").isBetween(
      moment("11:31", "HH:mm"),
      moment("16:00", "HH:mm")
    )
  ) {
    tipoComida = "Lunch";
  } else {
    tipoComida = "Dinner";
  }

  switch (tipoComida) {
    case "Breakfast":
      mostrarMenu("Breakfast");
      break;
    case "Lunch":
      mostrarMenu("Lunch");
      break;
    case "Dinner":
      mostrarMenu("Dinner");
      break;
    default:
      alert("Error: Tipo de comida no reconocido.");
  }
}

function mostrarMenu(tipoComida) {
  let opcionesElegidas = {};
  let menu;
  switch (tipoComida) {
    case "Breakfast":
      menu = `Menú de desayuno:\n\n
                                  Principal a elegir\n\n 1.- Cafe -> 2.50 € \n 2.- Te-> 2 € \n 3.- Colacao -> 2.50 €\n\n
                                  Acompañaminento a elegir\n\n 1.- Croissant -> 1.80 € \n 2.- Tostada -> 2 € \n 3.- Churros -> 3 €\n
                                  Extras - opcional\n\n 1.- Naranja -> 1.5 €\n 2.- Zumo  -> 3 €\n 3.- Yogourt -> 1 €`;
      break;
    case "Lunch":
      menu = `Menú de Comida:\n\n
                                  Principal a elegir\n\n 1.- Ensalada  -> 7,50 € \n 2.- Paella-> 8 € \n 3.- Pasta  -> 6 €\n\n
                                  Acompañamiento a elegir\n\n 1.- Pollo  -> 7,00 € \n 2.- Dorada -> 9 € \n 3.- Lomo  -> 7.50 €\n\n
                                  Extra - opcional\n\n 1.- Naranja -> 1.5 €\n 2.- Patatas  -> 2 €\n 3.- Cafe -> 2 €`;
      break;
    case "Dinner":
      menu = `Menu de Cena:\n\n
                                  Principal a elegir\n\n 1.- Ensalada -> 8 € \n 2.- Paella-> 8.5 € \n 3.- Pasta -> 7 €\n\n
                                  Acompañamiento a elegir\n\n 1.- Pollo -> 8 € \n 2.- Dorada -> 10 € \n 3.- Lomo -> 8 €\n\n
                                  Extra - opcional\n\n 1.- Naranja -> 2 €\n 2.- Patatas -> 2.5 €\n 3.- Cafe -> 2.5 €`;
      break;
    default:
      alert("Error: Tipo de comida no reconocido.");
      return;
  }

  alert(menu);

  elegirPlatoPrincipal(tipoComida, opcionesElegidas);
}

function elegirPlatoPrincipal(tipoComida, opcionesElegidas) {
  let menuPrincipal =
    "Elige entre los platos principales disponibles:\n\n";
  let i = 1;
  for (const plato in precios[tipoComida].principal) {
    menuPrincipal += `${i}.- ${plato} -> ${precios[tipoComida].principal[plato]} €\n`;
    i++;
  }

  let opcionElegida;
  while (true) {
    opcionElegida = prompt(`${menuPrincipal}`);

    if (opcionElegida === null) {
      alert("Debes elegir un plato principal.");
    } else {
      opcionElegida = opcionElegida.trim().toUpperCase();

      if (precios[tipoComida].principal[opcionElegida]) {
        opcionesElegidas.principal = {
          plato: opcionElegida,
          precio: precios[tipoComida].principal[opcionElegida]
        };
        mostrarComentarioAleatorio();
        elegirAcompañamiento(tipoComida, opcionesElegidas);
        break;
      } else if (opcionElegida === "") {
        mostrarMenu(tipoComida);
        break;
      } else {
        alert("Opción no válida para plato principal.");
      }
    }
  }
}

function elegirAcompañamiento(tipoComida, opcionesElegidas) {
  let menuAcompañamiento =
    "Elige entre los acompañamientos disponibles:\n\n";
  let i = 1;
  for (const acompañamiento in precios[tipoComida].acompañamiento) {
    menuAcompañamiento += `${i}.- ${acompañamiento} -> ${precios[tipoComida].acompañamiento[acompañamiento]} €\n`;
    i++;
  }

  let opcionAcompañamiento = prompt(`${menuAcompañamiento}`);

  if (opcionAcompañamiento === null) {
    alert("Debes elegir un acompañamiento.");
    elegirAcompañamiento(tipoComida, opcionesElegidas);
    return;
  }

  opcionAcompañamiento = opcionAcompañamiento.trim().toUpperCase();

  if (precios[tipoComida].acompañamiento[opcionAcompañamiento]) {
    opcionesElegidas.acompañamiento = {
      plato: opcionAcompañamiento,
      precio: precios[tipoComida].acompañamiento[opcionAcompañamiento]
    };
    mostrarComentarioAleatorio();

    elegirExtra(tipoComida, opcionesElegidas);
  } else if (opcionAcompañamiento.trim() === "") {
    elegirPlatoPrincipal(tipoComida, opcionesElegidas);
  } else {
    alert("Opción no válida para acompañamiento.");
    elegirAcompañamiento(tipoComida, opcionesElegidas);
  }
}
function elegirExtra(tipoComida, opcionesElegidas) {
  let menuExtras = "Elige entre los extras disponibles (opcional):\n\n";
  let i = 1;
  for (const extra in precios[tipoComida].extra) {
    menuExtras += `${i}.- ${extra} -> ${precios[tipoComida].extra[extra]} €\n`;
    i++;
  }

  let opcionExtra = prompt(`${menuExtras}`);

  if (opcionExtra === null || opcionExtra.trim() === "") {
    mostrarResumenPedido(opcionesElegidas);
    return;
  }

  opcionExtra = opcionExtra.trim().toUpperCase();

  if (precios[tipoComida].extra[opcionExtra]) {
    opcionesElegidas.extra = {
      plato: opcionExtra,
      precio: precios[tipoComida].extra[opcionExtra]
    };
    mostrarComentarioAleatorio();
    mostrarResumenPedido(opcionesElegidas);
  } else {
    alert("Opción no válida para extra.");
    elegirExtra(tipoComida, opcionesElegidas);
  }
}

function mostrarResumenPedido(opcionesElegidas) {
  let total =
    opcionesElegidas.principal.precio +
    opcionesElegidas.acompañamiento.precio;
  if (opcionesElegidas.extra) {
    total += opcionesElegidas.extra.precio;
  }

  let mensaje = `RESUMEN PEDIDO:\n\nPlato Principal:\n ${opcionesElegidas.principal.plato} - Precio: ${opcionesElegidas.principal.precio} €\n\n`;
  mensaje += `Acompañamiento:\n ${opcionesElegidas.acompañamiento.plato} - Precio: ${opcionesElegidas.acompañamiento.precio} €\n\n`;
  if (opcionesElegidas.extra) {
    mensaje += `Extra:\n ${opcionesElegidas.extra.plato} - Precio: ${opcionesElegidas.extra.precio} €\n\n`;
  }
  mensaje += `Total factura: ${total} €`;

  alert(mensaje);
}

main();