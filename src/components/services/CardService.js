import { http } from './config.js'

export default {
    listaById: (card) => {
        return http.get(`cards/${card.id}`)
    },
    cadastrar: (card) => {
        return http.post('cards', card);
    },
    deletar: (id) => {
        return http.delete(`cards/${id}`)
    },
    editar: (card, id) => {
        return http.put(`cards/${id}`, card)
    }
}