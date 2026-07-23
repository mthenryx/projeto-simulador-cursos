'use strict'

const url = "https://lion-school-phbo.onrender.com"

export async function getCursos(){
    const response = await fetch(`${url}/cursos`)
    if(!response.ok) throw new Error("Erro ao listar os cursos disponiveis!")
    return response.json()
}

export async function getAlunos(){
    const response = await fetch(`${url}/alunos`)
    if(!response.ok) throw new Error("Erro ao listar os alunos!")
    return response.json()
}

export async function getAlunosNoCurso(id){
    const response = await fetch(`${url}/alunos?curso_id=${id}`)
    if(!response.ok) throw new Error("Erro ao filtrar os alunos pelo curso!")
    return response.json()
}

export async function getStatusAlunos(status){
    const response = await fetch(`${url}/alunos?status=${status}`)
    if(!response.ok) throw new Error("Erro ao filtrar os alunos pelo status!")
    return response.json()
}

export async function getDetalhesAluno(id){
    const response = await fetch(`${url}/alunos/${id}`)
    if(!response.ok) throw new Error("Erro ao conseguir os detalhes de um aluno específico!")
    return response.json()
}
