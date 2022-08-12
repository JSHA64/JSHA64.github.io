(function() {
    const textarea = document.querySelector('.input')
    const aparecer = document.querySelector('.boton-copiar')
    const des = document.querySelector('.img-muneco')
    const destwo = document.querySelector('.anuncio-mun-1')
    const destree = document.querySelector('.anuncio-muneco')

    var salida
    function crearSalida() {
      const sali = document.querySelector('.texto-encriptado')
      const child = document.createTextNode('')
  
      sali.innerHTML = '' 
      sali.appendChild(child) 
      salida = child
    }
    crearSalida()

    function limpiarTexto() {
      textarea.value = "";
  }
  limpiarTexto()

    
    window.uiEncript = uiEncript
    window.uiDecript = uiDecript
    window.uiCopy = uiCopy
    window.oninput = uiSoloLetras

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
      aparecer.style.visibility = 'visible'
      des.style.visibility = 'hidden'
      destwo.style.visibility = 'hidden'
      destree.style.visibility = 'hidden'
    }
    function ocultarRdivs2() {
      aparecer.style.visibility = 'hidden'
      des.style.visibility = 'visible'
      destwo.style.visibility = 'visible'
      destree.style.visibility = 'visible'
    }
    
    const kUnAllowed = /[^a-z ]/g
    function uiSoloLetras(ev) {
      const { inputType, target, data } = ev
      // caso más frecuente
      if (inputType === 'insertText') {
        kUnAllowed.lastIndex = 0
        if (kUnAllowed.test(data)) {
          let value = target.value
          target.value = value.substring(0, value.length - 1)
          alert('solo letras minúsculas y sin acentos')
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

    const kClipboard = navigator.clipboard
    function uiCopy() {
      if (kClipboard) {
        kClipboard.writeText(salida.nodeValue).then(function() {
          alert('copiado')
        })  
      }
      
    }
    }())