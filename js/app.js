'use strict'

import {getAlunos, getAlunosNoCurso, getCursos, getDetalhesAluno, getStatusAlunos} from "./rotas.js"

const container = document.getElementById("container")

async function exibirCursos(){
    try {
        const cursosDisponiveis = await getCursos()

        const exibirCursos = document.getElementById("cursos")

        for(let curso of cursosDisponiveis){

            const buttonCurso = document.createElement("button")
            
            const img = document.createElement("img")

            if(curso.nome == "Desenvolvimento de Sistemas"){
                img.src = "./img/codigo.png"
                img.alt = "Imagem de codificação"
            }else if(curso.nome == "Redes"){
                img.src = "./img/mapa.png"
                img.alt = "Imagem de uma rede"
            }

            const span = document.createElement("span")
            span.textContent = curso.sigla

            buttonCurso.append(img, span)

            exibirCursos.append(buttonCurso)
            
            if(curso.nome == "Desenvolvimento de Sistemas"){
                buttonCurso.addEventListener("click", exibirTurmaDS)
            }else if(curso.nome == "Redes"){
                buttonCurso.addEventListener("click", exibirTurmaRedes)
            }

        }

    } catch (error) {
        console.log(error)
    }
}

async function exibirTurmaDS(){

}

async function exibirTurmaRedes(){

}

exibirCursos()