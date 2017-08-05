import axios from 'axios'
import qs from 'qs'
const url = ''
export default (_url, obj) => axios.post(url + _url, qs.stringify(obj)).then(d => d.data)

