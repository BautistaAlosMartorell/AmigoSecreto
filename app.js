let amigos =[];

function agregarAmigo(){
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();
    if(nombre){
        if(!amigos.includes(nombre)){
            amigos.push(nombre);
            input.value = '';
            actualizarListaAmigos();
        }else{
            alert('Este amigo ya está en la lista!')
        }
    }
}

function actualizarListaAmigos(){
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    amigos.forEach((amigo, index) =>{
        const li = document.createElement('li');
        li.className = "list-item";
        li.innerHTML=
        `${amigo}
         <button onclick="eliminarAmigo(${index})" class="button-delete">
                ✕
            </button>
        `;
        lista.appendChild(li);

    });
}

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarListaAmigos();
}

function mezclarArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function sortearAmigo(){
    if(amigos.length < 2){
        alert('Necesitas al menos 2 personas!')
        return;
    }

    const mezcla =[...amigos];
    let asignaciones;
    do {
        const arrayMezclado = mezclarArray([...mezcla]); // Nueva mezcla cada vez
        asignaciones = arrayMezclado.map((nombre, index) => ({
            persona: nombre,
            asignado: arrayMezclado[(index + 1) % arrayMezclado.length]
        }));
    } while (!asignacionesValidas(asignaciones));

    mostrarResultados(asignaciones);
}

    
function asignacionesValidas(asignaciones) {
    return asignaciones.every(par => par.persona !== par.asignado);
}

function mostrarResultados(asignaciones) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    
    asignaciones.forEach(par => {
        const li = document.createElement('li');
        li.className = 'result-item';
        li.innerHTML = `
            <span class="nombre">${par.persona}</span>
            <span class="asignacion"> le tiene que regalar a ${par.asignado}</span>
        `;
        resultado.appendChild(li);
    });


    resultado.addEventListener('click', (e) => {
        if (e.target.classList.contains('nombre')) {
            e.target.nextElementSibling.style.display = 'inline';
        }
    });
}