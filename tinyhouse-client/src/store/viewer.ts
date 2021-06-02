import {reactive} from 'vue'
import {Viewer} from '@/lib/types'

const viewer = reactive<Viewer>({
  id: null,
  avatar: null,
  token: null,
  hasWallet: null,
  didRequest: false
})

function setViewer(payload: {}): void {
  Object.assign(viewer, payload)
}

export {viewer, setViewer}
