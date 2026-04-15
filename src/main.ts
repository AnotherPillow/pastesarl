import '@fontsource-variable/chivo-mono/wght.css';
import '@fontsource/sniglet';
import '@fontsource-variable/martian-mono';

import './styles/index.css'
import './icons'

import {
    compressToEncodedURIComponent,
    decompressFromEncodedURIComponent,
} from 'lz-string'

const textarea = document.querySelector('#text') as HTMLTextAreaElement

document.querySelector('#copy')?.addEventListener('click', () => {
    const compressed = compressToEncodedURIComponent(textarea.value)
    history.pushState(null, "", `#${compressed}`)
    
    navigator.clipboard.writeText(`${location.href.split('#')[0]}#${compressed}`)
})

document.querySelector('#hide-top')?.addEventListener('click', () => {
    const classes = document.querySelector('header')?.classList!
    classes.toggle('heightless')

    history.pushState(null, "", `?h=${classes.contains('heightless')}#${location.hash}`)
    // navigator.clipboard.writeText(`${location.href.split('#')[0]}`)
})

const hash = location.hash.slice(1)
if (hash) {
    const content = decompressFromEncodedURIComponent(hash)
    textarea.value = content
}

const params = new URLSearchParams(location.search)
const headerHidden = params.get('h')
const footerHidden = params.get('f') // don't bother with a button for it
if (headerHidden == 'true') 
    document.querySelector('header')?.classList.add('heightless')
if (footerHidden == 'true') 
    document.querySelector('footer')?.classList.add('heightless')
