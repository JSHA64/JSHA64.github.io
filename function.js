    window.uiEncript = uiEncript
    window.uiDecript = uiDecript
    window.uiCopy = uiCopy
    window.oninput = uiSoloLetras

    const textarea = document.querySelector('.input')
    const tdimg = document.getElementsByClassName('img-td')
    const salidaencriptada = document.querySelector('.texto-encriptado')
    const btncopy = document.querySelector('.btn-copy')
    
    function selecyEvent(etiqueta, funcion) {
      const seleccionarelementos = document.querySelector(etiqueta)
      seleccionarelementos.addEventListener('click', funcion)
    }
    
    function crearSalida() {
      const child = document.createTextNode('')
      salidaencriptada.appendChild(child)
      salida = child
    }
    crearSalida()
    
    function KeyEncryption(x) {
      switch(x) {
      case 'e': return 'enter'
      case 'i': return 'imes'
      case 'a': return 'ai'
      case 'o': return 'ober'
      case 'u': return 'ufat'
      default : return x
      }
    }
    
    function encript(s) {
      var r = ''
      for (const c of s) {
          r += KeyEncryption(c)
      }
      return r
    }
    
    function error() {
      throw new SyntaxError('encriptación inválida')
    }
    
    function decript(s) {
      var r = ''
      for (var j = 0; j < s.length;) {
        switch(s[j]) {
          case 'e':
            if (s[j + 4] === 'r') { r += s[j]; j += 5 }
            else { error() }
            break
          case 'i':
            if (s[j + 3] === 's') { r += s[j]; j += 4 }
            else { error() }
            break
          case 'a':
            if (s[j + 1] === 'i') { r += s[j]; j += 2 }
            else { error()}
            break
          case 'o':
            if (s[j + 3] === 'r') { r += s[j]; j += 4 }
            else { error() }
            break
          case 'u':
            if (s[j + 3] === 't') { r += s[j]; j += 4 }
            else { error() }
            break
          default:
            r += s[j++]
        }
      }
      return r
    }
    
    function mostrarRdivs() {
      btncopy.style.visibility = 'visible'
      tdimg[0].style.visibility = 'hidden'
      tdimg[1].style.visibility = 'hidden'
      tdimg[2].style.visibility = 'hidden'
    }
    function ocultarRdivs2() {
      btncopy.style.visibility = 'hidden'
      tdimg[0].style.visibility = 'visible'
      tdimg[1].style.visibility = 'visible'
      tdimg[2].style.visibility = 'visible'
    }
    
    const kUnAllowed = /[^a-z]/g
    function uiSoloLetras(ev) {
      const { inputType, target, data } = ev
      // caso más frecuente
      if (inputType === 'insertText') {
        kUnAllowed.lastIndex = 0
        if (kUnAllowed.test(data)) {
          let value = target.value
          target.value = value.substring(0, value.length - 1);
          alert('Solo letras minúsculas y sin acentos')
        }
      } else if(inputType === 'insertFromPaste') {
        let value = data || target.value || ''
        value = value.toLowerCase()
        target.value = value.replace(kUnAllowed, '')
        if (target.value !== value) {
          alert('se ha modificado el texto para coincidir con los carácteres permitidos')
        }
      }
    }

    selecyEvent('.boton-b', uiDecript)

    function uiDecript() {
      var txt = textarea.value
      textarea.value = ''
      if (txt.length === 0) {
        salida.nodeValue = ''
        ocultarRdivs2()
      } else {
        try {
          salida.nodeValue = decript(txt)
        } catch(error) {
          salida.nodeValue = 'Error: no se pudo decodificar la cadena, porque no es una codificación válida'
        }
        mostrarRdivs()
      }
    
    }

    selecyEvent('.boton-a', uiEncript)
    
    function uiEncript() {
      var txt = textarea.value
      textarea.value = ''
      if (txt.length === 0) {
        salida.nodeValue = ''
        ocultarRdivs2()
        
      } else {
        salida.nodeValue = encript(txt)
        mostrarRdivs()
      }
      
    }

    selecyEvent('.boton-copiar', uiCopy)

    const kClipboard = navigator.clipboard
    function uiCopy() {
      if (kClipboard) {
        kClipboard.writeText(salida.nodeValue).then(() => {
          alert('copiado')
        })  
      }
      
    }