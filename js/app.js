'use strict'

import {getAlunos, getAlunosNoCurso, getCursos, getDetalhesAluno, getStatusAlunos} from "./rotas.js"

const container = document.getElementById("container")
const header = document.getElementById("header")

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
            
            buttonCurso.addEventListener("click", () => exibirTurma(curso.nome))
        }

    } catch (error) {
        console.log(error)
    }
}

async function exibirTurma(curso){

    container.innerHTML = ""
    container.style.flexDirection = "column"
    header.style.height = "120px"

    const barraStatus = document.createElement("div")
    barraStatus.className = "barra-status"

    const buttonStatus = document.createElement("button")
    buttonStatus.className = "button-status"
    buttonStatus.textContent = "Status"
    buttonStatus.addEventListener("click", async () => {
        const menuStatus = document.createElement("div")
        menuStatus.className = "menu-status"

        

        container.appendChild(menuStatus)
    })

    const legenda = document.createElement("div")
    legenda.className = "legenda"

    const legendaTitulo = document.createElement("span")
    legendaTitulo.classList.add("legenda-text")
    legendaTitulo.textContent = "LEGENDA"

    const quadradoAzul = document.createElement("div")
    quadradoAzul.classList.add("quadrado-azul")

    const cursando = document.createElement("span")
    cursando.classList.add("legenda-text")
    cursando.textContent = "Cursando"

    const quadradoAmarelo = document.createElement("div")
    quadradoAmarelo.classList.add("quadrado-amarelo")

    const finalizado = document.createElement("span")
    finalizado.classList.add("legenda-text")
    finalizado.textContent = "Finalizado"

    const tituloCurso = document.createElement("h1")
    tituloCurso.className = "titulo-curso"
    tituloCurso.textContent = curso

    const cardsAlunos = document.createElement("div")
    cardsAlunos.className = "cards-alunos"

    if(curso == "Desenvolvimento de Sistemas"){
        const alunos = await getAlunosNoCurso(1)

        for(let aluno of alunos){
            const cardAluno = document.createElement("div")
            cardAluno.className = "card-aluno"
            cardAluno.addEventListener("click", () => {
                exibirDadosDoAluno(aluno)
            })

            const imgAluno = document.createElement("img")
            imgAluno.src = aluno.foto
            imgAluno.alt = "Imagem de um usuário"

            const nomeAluno = document.createElement("h3")
            nomeAluno.textContent = aluno.nome

            cardAluno.append(imgAluno, nomeAluno)
            cardsAlunos.append(cardAluno)

            if(aluno.status == "cursando"){
                cardAluno.classList.add("cursando")
            }else if(aluno.status == "finalizado"){
                cardAluno.classList.add("finalizado")
            }
        }
    }else{
        const alunos = await getAlunosNoCurso(2)

        for(let aluno of alunos){
            const cardAluno = document.createElement("div")
            cardAluno.className = "card-aluno"
            cardAluno.style.cursor = "pointer"
            cardAluno.addEventListener("click", () => {
                exibirDadosDoAluno(aluno)
            })

            const imgAluno = document.createElement("img")
            imgAluno.src = aluno.foto
            imgAluno.alt = "Imagem de um usuário"

            const nomeAluno = document.createElement("h3")
            nomeAluno.textContent = aluno.nome

            cardAluno.append(imgAluno, nomeAluno)
            cardsAlunos.append(cardAluno)

            if(aluno.status == "cursando"){
                cardAluno.classList.add("cursando")
            }else if(aluno.status == "finalizado"){
                cardAluno.classList.add("finalizado")
            }
        }
    }
    
    legenda.append(legendaTitulo, quadradoAzul, cursando, quadradoAmarelo, finalizado)
    barraStatus.append(buttonStatus, legenda)
    header.append(barraStatus)
    container.append(tituloCurso, cardsAlunos)
}

function exibirDadosDoAluno(aluno){

}

exibirCursos()