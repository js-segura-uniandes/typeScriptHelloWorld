import {Aprendiz, NivelEducativo} from './aprendiz.js';
import {Curso} from './curso.js';

let cursos = [
    new Curso("Practicas esenciales para el agislimo",15,99,true,2021),
    new Curso("Pruebas automatizadas",15,99,true,2021),
    new Curso("Ingenieria de software para la web",15,45,false,2021),
    new Curso("Principios de arquitectura y diseño",15,99,false,2021)
]

export const ap = new Aprendiz("Jhonatan", "Segura", "avatar.png",31,  NivelEducativo.POSGRADO, cursos) ;
console.log(ap.cursos)

let aprendizTable: HTMLElement= document.getElementById("aprendiz")!;
let estadisticasTable: HTMLElement = document.getElementById("estadisticas")!; 
let cursosTable: HTMLElement = document.getElementById("cursos")!; 
let btnFiltro: HTMLElement = document.getElementById("boton-filtro")!; 
let textobusqueda: HTMLInputElement = <HTMLInputElement> document.getElementById("texto-busqueda")!;

btnFiltro.onclick= () => {
    let text:string = textobusqueda.value;
    text = (text == null ) ? "":text;
    cursosTable.getElementsByTagName("tbody")[0].remove();
    let cursosFiltrados: Curso[] = ap.cursos.filter(c => {return c.nombre.match(text);})
    mostrarCursosAprendiz(cursosFiltrados);
};



mostrarDatosAprendiz(ap);
mostrarEstadisticas(ap);
mostrarCursosAprendiz(ap.cursos);




function mostrarCursosAprendiz (cursos: Curso[]): void {
    let estado: string[] = cursos.map(c => c.calificacion > 60?"green": "red"); 
    let cursosTBody: HTMLElement = document.createElement("tbody");
    let index: number = 0; 
    for(let curso of cursos) {
        let trElement:HTMLElement = document.createElement("tr"); 
        trElement.innerHTML= `<td>${curso.nombre}</td>
        <td>${curso.horas}</td>
        <td style= "color: ${estado[index]}">${curso.calificacion}</td>
        <td>${curso.certificado}</td>
        <td>${curso.anio}</td>`;
        cursosTBody.appendChild(trElement); 
        index ++; 
    }
    cursosTable.appendChild(cursosTBody);
}


function mostrarDatosAprendiz(aprendiz: Aprendiz) :void {
    let tbodyAprendiz= document.createElement("tbody");
    tbodyAprendiz.innerHTML=`<tr><td conlspan=2><img src ="./${aprendiz.avatar}" height="100"></td></tr>
                            <tr><td>Nombres:</td><td>${aprendiz.nombres}</td></tr>
                             <tr><td>Apellidos:</td><td>${aprendiz.apellidos}</td></tr>
                             <tr><td>Nivel educativo:</td><td>${aprendiz.nivelEducativo}</td></tr>
                             <tr><td>edad:</td><td>${aprendiz.edad}</td></tr>`
    aprendizTable.appendChild(tbodyAprendiz);
    
}

function mostrarEstadisticas(aprendiz: Aprendiz): void {
    let numeroCertificados: number = aprendiz.darCursosCertificados();
    let trElement: HTMLElement = document.createElement("tr") ; 
    trElement.innerHTML = `<td><b> Cursos certificados </b></td>${numeroCertificados}</td>`;
    estadisticasTable.appendChild(trElement); 
}


