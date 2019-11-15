import jsonp from '@/common/js/jsonp'
import {commonParams, options} from './config'

export function sendInfo(name,nick,words,file) {
  const url = 'http://192.168.0.145:8681/uploadhallimg'

  const data = Object.assign({}, commonParams, {
    name: name,
    nick: nick,
    words: words,
    file:file
  })

  return jsonp(url, data, options)
}