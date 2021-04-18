import { Aprendiz, NivelEducativo } from './aprendiz.js';
import { Curso } from './curso.js';
var cursos = [
    new Curso("Practicas esenciales para el agislimo", 15, 99, true, 2021),
    new Curso("Pruebas automatizadas", 15, 99, true, 2021),
    new Curso("Ingenieria de software para la web", 15, 45, false, 2021),
    new Curso("Principios de arquitectura y diseño", 15, 99, false, 2021)
];
export var ap = new Aprendiz("Jhonatan", "Segura", "avatar.png", 31, NivelEducativo.POSGRADO, cursos);
console.log(ap.cursos);
var aprendizTable = document.getElementById("aprendiz");
var estadisticasTable = document.getElementById("estadisticas");
var cursosTable = document.getElementById("cursos");
var btnFiltro = document.getElementById("boton-filtro");
var textobusqueda = document.getElementById("texto-busqueda");
btnFiltro.onclick = function () {
    var text = textobusqueda.value;
    text = (text == null) ? "" : text;
    cursosTable.getElementsByTagName("tbody")[0].remove();
    var cursosFiltrados = ap.cursos.filter(function (c) { return c.nombre.match(text); });
    mostrarCursosAprendiz(cursosFiltrados);
};
mostrarDatosAprendiz(ap);
mostrarEstadisticas(ap);
mostrarCursosAprendiz(ap.cursos);
function mostrarCursosAprendiz(cursos) {
    var estado = cursos.map(function (c) { return c.calificacion > 60 ? "green" : "red"; });
    var cursosTBody = document.createElement("tbody");
    var index = 0;
    for (var _i = 0, cursos_1 = cursos; _i < cursos_1.length; _i++) {
        var curso = cursos_1[_i];
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + curso.nombre + "</td>\n        <td>" + curso.horas + "</td>\n        <td style= \"color: " + estado[index] + "\">" + curso.calificacion + "</td>\n        <td>" + curso.certificado + "</td>\n        <td>" + curso.anio + "</td>";
        cursosTBody.appendChild(trElement);
        index++;
    }
    cursosTable.appendChild(cursosTBody);
}
function mostrarDatosAprendiz(aprendiz) {
    var tbodyAprendiz = document.createElement("tbody");
    tbodyAprendiz.innerHTML = "<tr><td conlspan=2><img src =\"./" + aprendiz.avatar + "\" height=\"100\"></td></tr>\n                            <tr><td>Nombres:</td><td>" + aprendiz.nombres + "</td></tr>\n                             <tr><td>Apellidos:</td><td>" + aprendiz.apellidos + "</td></tr>\n                             <tr><td>Nivel educativo:</td><td>" + aprendiz.nivelEducativo + "</td></tr>\n                             <tr><td>edad:</td><td>" + aprendiz.edad + "</td></tr>";
    aprendizTable.appendChild(tbodyAprendiz);
}
function mostrarEstadisticas(aprendiz) {
    var numeroCertificados = aprendiz.darCursosCertificados();
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td><b> Cursos certificados </b></td>" + numeroCertificados + "</td>";
    estadisticasTable.appendChild(trElement);
}
