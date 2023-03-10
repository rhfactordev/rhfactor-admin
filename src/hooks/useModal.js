import bus from '../utils/bus'

const EVENT_NAME = 'modal:toggle'

export default function useModal () {
  function open (payload = {}) {
    console.log('open', payload)
    bus.emit(EVENT_NAME, { status: true, ...payload })
  }

  function close (payload = {}) {
    console.log('close', payload)
    bus.emit(EVENT_NAME, { status: false, ...payload })
  }

  function listen (fn) {
    console.log('listen', fn)
    bus.on(EVENT_NAME, fn)
  }

  function off (fn) {
    console.log('off', fn)
    bus.off(EVENT_NAME, fn)
  }

  return { open, close, listen, off }
}
