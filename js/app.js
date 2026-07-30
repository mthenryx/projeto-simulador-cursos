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

    const span = document.getElementById("sair")
    span.textContent = "Voltar"

    const encaminhar = document.getElementById("encaminhar")
    encaminhar.href = "index.html"

    const barraStatus = document.createElement("div")
    barraStatus.id = "barraStatus"
    barraStatus.className = "barra-status"

    const buttonStatus = document.createElement("button")
    buttonStatus.className = "button-status"
    buttonStatus.textContent = "Status"
    buttonStatus.addEventListener("click", async () => {
        criarFiltro(curso)
    })

    const legenda = document.createElement("div")
    legenda.className = "legenda"

    const legendaTitulo = document.createElement("button")
    legendaTitulo.classList.add("legenda-button")
    legendaTitulo.textContent = "LEGENDA"

    const quadradoAzul = document.createElement("div")
    quadradoAzul.classList.add("quadrado-azul", "apagar")

    const cursando = document.createElement("span")
    cursando.classList.add("legenda-text", "apagar")
    cursando.textContent = "Cursando"

    const quadradoAmarelo = document.createElement("div")
    quadradoAmarelo.classList.add("quadrado-amarelo", "apagar")

    const finalizado = document.createElement("span")
    finalizado.classList.add("legenda-text", "apagar")
    finalizado.textContent = "Finalizado"

    if (window.innerWidth <= 768) {
        legendaTitulo.classList.add("clicavel")

        legendaTitulo.addEventListener("click", async () => {
            criarCardLegenda()
        })
    }

    const tituloCurso = document.createElement("h1")
    tituloCurso.className = "titulo-curso"
    tituloCurso.textContent = curso

    const cardsAlunos = document.createElement("div")
    cardsAlunos.className = "cards-alunos"
    cardsAlunos.id = "cardsAlunos"

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

let abrirFecharMenuLegenda = true
let menuStatusLegenda = null 

function criarCardLegenda(){
    if(abrirFecharMenuLegenda){

        if(!menuStatusLegenda){ 
                menuStatusLegenda = document.createElement("div")
                menuStatusLegenda.className = "card-legenda"
            
                const cursando = document.createElement("span")
                cursando.textContent = "Cursando"
                cursando.className = "legenda-cursando"
            
                const finalizado = document.createElement("span")
                finalizado.textContent = "Finalizado"
                finalizado.className = "legenda-finalizado"
            
                menuStatusLegenda.append(cursando, finalizado)
                container.appendChild(menuStatusLegenda)
        }

        menuStatusLegenda.style.display = "flex"
        abrirFecharMenuLegenda = false

    } else {
        menuStatusLegenda.style.display = "none"
        abrirFecharMenuLegenda = true
    }
}

let abrirFecharMenu = true
let menuStatus = null 

function criarFiltro(curso){
    if(abrirFecharMenu){

        if(!menuStatus){ 
            menuStatus = document.createElement("div")
            menuStatus.className = "menu-status"

            const buttonStatus = document.createElement("button")
            buttonStatus.className = "button-effect"
            buttonStatus.textContent = "Status"
            buttonStatus.id = "buttonStatus"
            buttonStatus.addEventListener("click", () => {
                adicionarIconeOk("buttonStatus")
                filtrarAlunos("todos", curso)
            })

            const buttonFinalizado = document.createElement("button")
            buttonFinalizado.className = "button-effect"
            buttonFinalizado.textContent = "Finalizado"
            buttonFinalizado.id = "buttonFinalizado"
            buttonFinalizado.addEventListener("click", () => {
                adicionarIconeOk("buttonFinalizado")
                filtrarAlunos("finalizado", curso)
            })

            const buttonCursando = document.createElement("button")
            buttonCursando.className = "button-effect"
            buttonCursando.textContent = "Cursando"
            buttonCursando.id = "buttonCursando"
            buttonCursando.addEventListener("click", () => {
                adicionarIconeOk("buttonCursando")
                filtrarAlunos("cursando", curso)
            })

            menuStatus.append(buttonStatus, buttonFinalizado, buttonCursando)
            container.appendChild(menuStatus)
        }

        menuStatus.style.display = "block"
        abrirFecharMenu = false

    } else {
        menuStatus.style.display = "none"
        abrirFecharMenu = true
    }
}

function adicionarIconeOk(idBotao){
    const botao = document.getElementById(idBotao)

    const botaoStatus = document.getElementById("buttonStatus")
    const botaoFinalizado = document.getElementById("buttonFinalizado")
    const botaoCursando = document.getElementById("buttonCursando")

    const img1 = botaoStatus.querySelector("img")
    const img2 = botaoFinalizado.querySelector("img")
    const img3 = botaoCursando.querySelector("img")

    if(botaoStatus.querySelector("img") !== null){
        img1.remove()
    }
    
    if(botaoFinalizado.querySelector("img") !== null){
        img2.remove()
    }
    
    if(botaoCursando.querySelector("img") !== null){
        img3.remove()
    }
    
    const imgOk = document.createElement("img")
    imgOk.src = "./img/ok.png"
    imgOk.alt = "Simbolo de ok"

    botao.appendChild(imgOk)
}

async function filtrarAlunos(caracteristica, curso){
    const cardsAlunos = document.getElementById("cardsAlunos")
    cardsAlunos.innerHTML = ""

    const idCurso = curso == "Desenvolvimento de Sistemas" ? 1 : 2

    const alunos = await getAlunosNoCurso(idCurso)

    let alunosFiltrados

    if(caracteristica === "todos"){
        alunosFiltrados = alunos
    } else {
        alunosFiltrados = alunos.filter(aluno => aluno.status === caracteristica)
    }

    for(let aluno of alunosFiltrados){
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
        } else if(aluno.status == "finalizado"){
            cardAluno.classList.add("finalizado")
        }
    }
}

async function exibirDadosDoAluno(aluno){
    const barraStatus = document.getElementById("barraStatus")
    barraStatus.style.display = "none"
    container.innerHTML = ""
    header.style.height = "auto"

    console.log(aluno)
    
    const perfil = document.createElement("div")
    perfil.className = "perfil"

    const caracteristica = document.createElement("div")
    caracteristica.className = "caracteristica"

    const fotoPerfil = document.createElement("img")
    fotoPerfil.src = aluno.foto

    const nome = document.createElement("h3")
    nome.textContent = aluno.nome

    const dadosPessoais = document.createElement("div")
    dadosPessoais.className = "dados-pessoais"

    for(let desempenho of aluno.desempenho){

        const materia = document.createElement("label")
        materia.textContent = desempenho.valor
        materia.className = "materia"

        const porcentagem = document.createElement("progress")
        porcentagem.className = "porcentagem"
        porcentagem.value = desempenho.valor
        porcentagem.max = "100"

        if(desempenho.valor <= 50 && desempenho.valor > 30){
            materia.style.color = "#f1c232"
            porcentagem.classList.add("amarelo")
        }else if(desempenho.valor <= 30){
            materia.style.color = "e74c3c"
            porcentagem.classList.add("vermelho")
        }

        const categoria = document.createElement("span")
        categoria.textContent = desempenho.categoria

        materia.append(porcentagem, categoria)
        dadosPessoais.append(materia)
    }

    caracteristica.append(fotoPerfil, nome)
    perfil.append(caracteristica, dadosPessoais)
    container.appendChild(perfil)
}

exibirCursos()