import axios from 'axios'

export default function({ store }) {
  return axios
    .post('https://integration.managerfashion.net/api/signin', {
      api_key: '1415us4zethy6lfxkp51mve4zmyfjb',
      salt:
        'c7577e5ed53d30a27e82af09fc03e7e712c6ad33ac9dec4e13188b81404596d2fa17bc105cebd7c4dd3b92db8042c47ac382ce8b43177d42072600eb9bb7eb37'
    })
    .then(response => {
      store.dispatch('updateAuthToken', response.data.access_token)
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log('Auth error: ', error)
    })
}
