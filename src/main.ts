import '@fontsource-variable/chivo-mono/wght.css';
import '@fontsource/sniglet';
import '@fontsource-variable/martian-mono';

import './styles/index.css'

import {
    compressToEncodedURIComponent,
    decompressFromEncodedURIComponent,
} from 'lz-string'

const textarea = document.querySelector('#text') as HTMLTextAreaElement

document.querySelector('#copy')?.addEventListener('click', () => {
    const compressed = compressToEncodedURIComponent(textarea.value)
    history.pushState(null, "", `#${compressed}`)
    
    navigator.clipboard.writeText(`${window.location.href.split('#')[0]}#${compressed}`)
})

const hash = window.location.hash.slice(1)
if (hash) {
    const content = decompressFromEncodedURIComponent(hash)
    textarea.value = content
}