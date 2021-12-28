import { http } from './config.js'

export default {
    listar: () => {
        return http.get('lanes');
    },
    cadastrar: (lane) => {
        return http.post('lanes', lane);
    },
    deletar: (id) => {
        return http.delete(`lanes/${id}`)
    },
    editar: (lane) => {
        return http.put(`lanes/${lane.id}`)
    }
}