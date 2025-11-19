import http from '@/http-service'

class CertificateService {
  getAll() {
    return http.get('/certificates')
  }

  create(data) {
    return http.post('/certificates', data)
  }

  update(id, data) {
    return http.put(`/certificates/${id}`, data)
  }

  remove(id) {
    return http.delete(`/certificates/${id}`)
  }
}

export default new CertificateService()
