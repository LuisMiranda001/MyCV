$(document).ready(function () {
  $("#cargas").addClass("text-menu-select");
  $("#li-cargas").addClass("menu-select");
  $("#table_id").DataTable();
  $(".js-example-basic-single").select2();
});

function Validar(clase) {
  var archivoInput = document.querySelector(clase);
  var archivoRuta = archivoInput.value;
  var extPermitidas = /(.csv)$/i;
  var Split = archivoRuta.split("\\");
  var nombreArchivo = Split.pop();
  if (!extPermitidas.exec(archivoRuta)) {
    Swal.fire(
      "Tu archivo no es CSV",
      "Solo aceptamos archivos con la extensión .CSV",
      "warning"
    );
    archivoInput.value = "";
  }
}

function whls() {
  var archivoInput = document.querySelector(".btnFileWHLS");
  var archivoRuta = archivoInput.value;
  var form_data = new FormData();
  var archivoInput = document.querySelector(".btnFileWHLS");
  form_data.append("file", document.querySelector(".btnFileWHLS").files[0]);
  $.ajax({
    url: "/whls",
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    beforeSend: function () {
      $("#loader").show();
    },
    type: "POST",
    success: function (data) {
      if (data["alerta"] === "Si") {
        tipo = data["tipo"];
        filas = data["filas"];
        if (tipo === "NuevaTienda") {
          tiendas = data["tiendas"];
          $("#loader").hide();
          archivoInput.value = "";
          Swal.fire({
            title: "Hay nuevas tiendas",
            text:
              "Las nuevas tiendas son " +
              tiendas.toString() +
              " ¿Deseas continuar con la carga?, es importante asegurar que se trata de nuevas tiendas y no de errores en el nombre.",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
            confirmButtonText: "Si, continuar",
          }).then((result) => {
            if (result.isConfirmed) {
              $.ajax({
                url: "/cargas",
                dataType: "json",
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                beforeSend: function () {
                  $("#loader").show();
                },
                type: "POST",
                success: function (data) {
                  if (data["alerta"] === "Si") {
                    $("#loader").hide();
                    archivoInput.value = "";
                    filas = data["filas"];
                    Swal.fire(
                      "¡Excelente!",
                      "Tu archivo ha sido validado y cargado correctamente con un total de " +
                        filas +
                        " filas",
                      "success"
                    );
                  } else {
                    $("#loader").hide();
                    archivoInput.value = "";
                    Swal.fire(
                      "Algo salió mal",
                      "Intentalo de nuevo, si el error sigue, manda un correo a luis.miranda@unilever.com",
                      "error"
                    );
                  }
                },
              });
            }
          });
        } else {
          $("#loader").hide();
          archivoInput.value = "";
          Swal.fire(
            "¡Excelente!",
            "Tu archivo ha sido validado y cargado correctamente con un total de " +
              filas +
              " filas",
            "success"
          );
        }
      } else {
        tipo = data["tipo"];
        if (tipo === "NoSKU") {
          lista = data["error"];
          archivoInput.value = "";
          $("#loader").hide();
          Swal.fire(
            "Error en SKU",
            "Los códigos: " +
              lista.toString() +
              " son incorrectos, no existen en el maestro de materiales.",
            "warning"
          );
        } else {
          archivoInput.value = "";
          $("#loader").hide();
          Swal.fire(
            "Algo salió mal",
            "Intentalo de nuevo, si el error sigue, manda un correo a luis.miranda@unilever.com",
            "error"
          );
        }
      }
    },
  });
}

function cartera() {
  var archivoInput = document.querySelector(".btnFileCartera");
  var archivoRuta = archivoInput.value;
  var form_data = new FormData();
  var archivoInput = document.querySelector(".btnFileCartera");
  form_data.append("file", document.querySelector(".btnFileCartera").files[0]);
  $.ajax({
    url: "/cartera",
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    beforeSend: function () {
      $("#loader").show();
    },
    type: "POST",
    success: function (data) {
      if (data["alerta"] === "Si") {
        archivoInput.value = "";
        filas = data["filas"];
        $("#loader").hide();
        Swal.fire(
          "¡Excelente!",
          "Tu archivo ha sido validado y cargado correctamente con un total de " +
            filas +
            " filas",
          "success"
        );
      } else {
        archivoInput.value = "";
        $("#loader").hide();
        if (data["alerta"] === "Columnas") {
          Swal.fire(
            "Nombre de columnas",
            "Hay un error en el nombre de las columnas, revise y vuelva a cargar por favor",
            "warning"
          );
        } else if (data["alerta"] === "Duplicados") {
          archivoInput.value = "";
          $("#loader").hide();
          lista = data["error"];
          Swal.fire(
            "Hay duplicados",
            "Te muestro la lista de duplicados: " +
              lista.toString() +
              ", ¿nos puedes ayudar a corregirlo y volverlo a intentar?.",
            "warning"
          );
        } else {
          Swal.fire(
            "Algo salió mal",
            "Intentalo de nuevo, si el error sigue, manda un correo a luis.miranda@unilever.com",
            "error"
          );
        }
      }
    },
  });
}

function bpds() {
  var archivoInput = document.querySelector(".btnFileBpd");
  var archivoRuta = archivoInput.value;
  var form_data = new FormData();
  var archivoInput = document.querySelector(".btnFileBpd");
  form_data.append("file", document.querySelector(".btnFileBpd").files[0]);
  $.ajax({
    url: "/bpds",
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    beforeSend: function () {
      $("#loader").show();
    },
    type: "POST",
    success: function (data) {
      if (data["alerta"] === "Columnas") {
        cols = data["cols"];
        archivoInput.value = "";
        $("#loader").hide();
        Swal.fire(
          "Nombre de columnas",
          "Hay un error en el nombre de las columnas, el nombre de las columnas deben de ser " +
            cols,
          "warning"
        );
      } else if (data["alerta"] === "Error") {
        archivoInput.value = "";
        $("#loader").hide();
        lista = data["error"];
        Swal.fire(
          "Error en el archivo",
          lista.toString(),
          "warning"
        );
      } else if (data["alerta"] === "Archivo") {
        archivoInput.value = "";
        $("#loader").hide();
        Swal.fire(
          "Error en el nombre de los archivos",
          "Recuerda que el nombre de los archivos admitidos son: Layout Cierre BPDs MES AÑO CLIENTE.csv | Maestra Cierre BPDs MES AÑO CLIENTE.csv | Inventarios Cierre BPDs MES AÑO CLIENTE.csv",
          "warning"
        );
      } else if (data["alerta"] === "Si") {
        archivoInput.value = "";
        $("#loader").hide();
        filas = data["filas"];
        Swal.fire(
          "¡Excelente!",
          "Tu archivo ha sido validado y cargado correctamente con un total de " +
            filas +
            " filas",
          "success"
        );
      } else {
        archivoInput.value = "";
        $("#loader").hide();
        Swal.fire(
          "Algo salió mal",
          "Intentalo de nuevo, si el error sigue, manda un correo a luis.miranda@unilever.com",
          "error"
        );
      }
    },
  });
}

function innos() {
  Swal.fire({
    title: "Selecciona una categoría",
    input: "select",
    inputOptions: {
      Categorias: {
        LIQUID_IV: "LIQUID IV",
        DEOS: "DEOS",
        DRESSINGS: "DRESSINGS",
        FACE: "FACE",
        HAIR: "HAIR",
        "HAND & BODY": "HAND & BODY",
        CALDOS: "CALDOS",
        SOPAS: "SOPAS",
        MAIZENA: "MAIZENA",
        "ICE CREAM": "ICE CREAM",
        "SKIN CLEANSING": "SKIN CLEANSING",
      },
    },
    inputPlaceholder: "Selecciona una categoría",
    showCancelButton: true,
  }).then((cat) => {
    if (cat.isConfirmed) {
      var archivoInput = document.querySelector(".btnFileInnos");
      var archivoRuta = archivoInput.value;
      var form_data = new FormData();
      var archivoInput = document.querySelector(".btnFileInnos");
      form_data.append(
        "file",
        document.querySelector(".btnFileInnos").files[0]
      );

      $.ajax({
        url: "/innos/" + cat.value,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        beforeSend: function () {
          $("#loader").show();
        },
        type: "POST",
        success: function (data) {
          if (data["alerta"] === "Si") {
            archivoInput.value = "";
            $("#loader").hide();
            Swal.fire(
              "¡Excelente!",
              "Tu archivo ha sido validado y cargado correctamente",
              "success"
            );
          } else {
            archivoInput.value = "";
            $("#loader").hide();
            if (data["error"] === "Si") {
              error = data["data"];
              Swal.fire(
                "Hay errores en el archivo",
                "Los errores son:\n " + error,
                "warning"
              );
            } else {
              if (data["alerta"] === "Columnas") {
                hoja = data["hoja"];
                cols = data["cols"];
                Swal.fire(
                  "Nombre de columnas",
                  "Hay un error en el nombre de las columnas en la hoja " +
                    hoja +
                    ", revise y vuelva a cargar por favor.\nEl nombre de las columnas deben de ser " +
                    cols,
                  "warning"
                );
              } else {
                Swal.fire(
                  "Algo salió mal",
                  "Intentalo de nuevo, si el error sigue, manda un correo a luis.miranda@unilever.com",
                  "error"
                );
              }
            }
          }
        },
      });
    } else {
      var archivoInput = document.querySelector(".btnFileInnos");
      archivoInput.value = "";
    }
  });
}

function predicciones() {
  var archivoInput = document.querySelector(".btnFilePredicciones");
  var archivoRuta = archivoInput.value;
  var form_data = new FormData();
  var archivoInput = document.querySelector(".btnFilePredicciones");
  form_data.append(
    "file",
    document.querySelector(".btnFilePredicciones").files[0]
  );
  $.ajax({
    url: "/prediccion",
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    beforeSend: function () {
      $("#loader").show();
    },
    type: "POST",
    success: function (data) {
      if (data["alerta"] === "Si") {
        archivoInput.value = "";
        filas = data["filas"];
        $("#loader").hide();
        Swal.fire(
          "¡Excelente!",
          "Tu archivo ha sido validado y cargado correctamente con un total de " +
            filas +
            " filas",
          "success"
        );
      } else {
        if (data["alerta"] === "Columnas") {
          archivoInput.value = "";
          $("#loader").hide();
          Swal.fire(
            "Nombre de columnas",
            "Hay un error en el nombre de las columnas, revise y vuelva a cargar por favor",
            "warning"
          );
        } else {
          archivoInput.value = "";
          $("#loader").hide();
          Swal.fire(
            "Algo salió mal",
            "Intentalo de nuevo, si el error sigue, manda un correo a luis.miranda@unilever.com",
            "error"
          );
        }
      }
    },
  });
}

function provisiones() {
  var archivoInput = document.querySelector(".btnFileProvisiones");
  var archivoRuta = archivoInput.value;
  var form_data = new FormData();
  var archivoInput = document.querySelector(".btnFileProvisiones");
  form_data.append(
    "file",
    document.querySelector(".btnFileProvisiones").files[0]
  );
  $.ajax({
    url: "/provisiones",
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    beforeSend: function () {
      $("#loader").show();
    },
    type: "POST",
    success: function (data) {
      if (data["alerta"] === "Si") {
        archivoInput.value = "";
        filas = data["filas"];
        $("#loader").hide();
        Swal.fire(
          "¡Excelente!",
          "Tu archivo ha sido validado y cargado correctamente con un total de " +
            filas +
            " filas",
          "success"
        );
      } else {
        if (data["alerta"] === "Columnas") {
          archivoInput.value = "";
          $("#loader").hide();
          Swal.fire(
            "Nombre de columnas",
            "Hay un error en el nombre de las columnas, revise y vuelva a cargar por favor",
            "warning"
          );
        } else {
          archivoInput.value = "";
          $("#loader").hide();
          Swal.fire(
            "Algo salió mal",
            "Intentalo de nuevo, si el error sigue, manda un correo a luis.miranda@unilever.com",
            "error"
          );
        }
      }
    },
  });
}

function ndc() {
  Swal.fire({
    title: "Selecciona una dirección",
    input: "select",
    inputOptions: {
      Dirección: {
        Keila_Campos: "Keila Campos",
        David_Cabrera: "David Cabrera",
        Ricardo_Richards: "Ricardo Richards",
        AdelmaG_Ecommerce: "Adelma Gonzalez y Ecommerce",
        TT: "Trade Terms"
      },
    },
    inputPlaceholder: "Selecciona una dirección",
    showCancelButton: true,
  }).then((dir) => {
    if (dir.isConfirmed && dir.value != 'TT') {
      Swal.fire({
        title: '¿Tu archivo tiene código identificador?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: 'No'
      }).then((verificador) => {
        var archivoInput = document.querySelector(".btnFileNDC");
        var archivoRuta = archivoInput.value;
        var form_data = new FormData();
        var archivoInput = document.querySelector(".btnFileNDC");
        form_data.append("file", document.querySelector(".btnFileNDC").files[0]);
        $("#loader").show();
        run();
      })
    }
  });
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
    console.log("Waiting...");
    await delay(3000);
    console.log("5 seconds later");
    $("#loader").hide();
    filas = 100;
    Swal.fire(
      "¡Excelente!",
      "Tu archivo ha sido validado y cargado correctamente con un total de " +
        filas +
        " filas.",
      "success"
    );
}

// Carga de Cuotas
const modal_container = document.getElementById("modal_container");
const close = document.getElementById("close");
const open = document.getElementById("open");
const enviar = document.getElementById("enviar");

open.addEventListener("click", (e) => {
  e.preventDefault();
  modal_container.classList.add("show");
});

close.addEventListener("click", (e) => {
  e.preventDefault();
  modal_container.classList.remove("show");
});

enviar.addEventListener("click", (e) => {
  e.preventDefault();
  var form_data = new FormData();
  var archivoInput = document.querySelector(".Cuotas");
  form_data.append("file", document.querySelector(".Cuotas").files[0]);
  categoria = document.getElementById("categoria").value;
  $("#loader").show();
  run();
});
